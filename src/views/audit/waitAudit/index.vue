<template>
  <div class="app-container">
    <!-- 顶部查询导出评分表单 -->
    <el-form inline>
      <!-- 院系 -->
      <el-form-item label="院系">
        <el-select clearable v-model="queryParams.collegeId" class="" placeholder="请选择" size="default"
                   @change="getList()">
          <el-option v-for="item in options.department" :key="item.deptId" :label="item.deptName"
                     :value="item.deptId"/>
        </el-select>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态">
        <el-select clearable v-model="queryParams.isConfirm" class="audit-select" placeholder="请选择" size="default"
                   @change="getList()">
          <el-option v-for="item in options.isConfirm" :key="item.value" :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>

      <!-- 专业选择 -->
      <!--      <el-form-item label="专业选择">-->
      <!--        <el-select v-model="queryParams.subject" class="audit-select" placeholder="请选择" size="default">-->
      <!--          <el-option v-for="item in options.subject" :key="item.value" :label="item.label" :value="item.value"/>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->

      <!-- 年级选择 -->
      <el-form-item label="年级选择">
        <el-select clearable v-model="queryParams.grade" class="audit-select" placeholder="请选择" size="default"
                   @change="getList()">
          <el-option v-for="item in options.grade" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>

      <!-- 一键导出 -->
      <el-form-item label="">
        <el-button type="primary" @click="handleExportDialog">一键导出
        </el-button>
      </el-form-item>

      <!-- 一键导出对话框 -->
      <el-dialog v-model="data.exportDialogVisible" title="一键导出" width="30%" :before-close="handleCloseExportDialog"
                 draggable class="export-dialog" :width="690">
        <el-form label-position="left">
          <span style="color: #1c84c6">(点击任意空白处或按ESC关闭)</span>
          <el-form-item label="班级选择">
            <el-select v-model="exportParams.classId" class="" placeholder="请选择" size="default">
              <el-option v-for="item in options.class" :key="item.deptId" :label="item.deptName" :value="item.deptId"/>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="handleExport">
                            一键导出
                        </el-button>
                    </span>
        </template>
      </el-dialog>

      <!-- 一键评分 -->
      <el-form-item label="">
        <el-button type="success" @click="openMakeOneKeyGrade">一键评分</el-button>
      </el-form-item>

      <!--一键评分对话框-->
      <el-dialog v-model="data.makeGradeOneDialogVisible" title="一键评分" width="30%"
                 :before-close="closeMakeOneKeyGrade" draggable class="export-dialog" :width="690">
        评分前请勾选要评分的学生 <span style="color: #1c84c6">(点击任意空白处或按ESC关闭)</span>
        <el-form label-position="left">
          <el-form-item label="分数">
            <el-select v-model="data.makeOneKeyGradeParams.score" class="audit-select" placeholder="请选择等级"
                       size="default">
              <el-option v-for="item in options.score" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="handleMakeOneKeyGrade">
                            一键评分
                        </el-button>
                    </span>
        </template>
      </el-dialog>
    </el-form>

    <!-- 数据展示 -->
    <el-table ref="elTableRef" :data="auditList" stripe style="overflow: scroll" height="550">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="姓名" prop="nickName"></el-table-column>
      <el-table-column label="年级" prop="grade"></el-table-column>
      <el-table-column label="班级" prop="className"></el-table-column>
      <el-table-column label="审核状态" prop="isConfirm">
        <template #default="scope">
          <div v-if="scope.row.isConfirm === 1">
            <el-button type="primary" plain>已审核</el-button>
          </div>
          <div v-else>
            <el-button type="danger" plain>待审核</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template #default="scope">
          <el-button type="primary" @click="handleAuditDialog(scope.row)">审核</el-button>
          <!--          <el-button type="warning">修改</el-button>-->
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- page 当前页 使用 .sync 可以使得子组件向父组件传参数 从而更新表单
     @paginaton 自定义方法 由子组件改变 页码 或 单页显示数时调用
     注意这个v-model非常重要因为我们子组件传到外面的值我们要进行同步保存子组件改了输入的值
     我们保存的值要改变
-->
    <Pagination :total="data.total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
                @pagination="getList"></Pagination>

  </div>
</template>

<script setup name="waitAudit">
//#region import
import {reactive, ref, toRefs} from "vue";
import Pagination from "@/components/Pagination";
import {useRouter} from "vue-router";
import {getAuditList, getExportAuditList, makeOneKeyGrade} from "@/api/audit";
import {getClassOption, getDeptOption} from "@/api/selectOption";
import {ElLoading, ElMessage} from "element-plus";
import service, {download} from "@/utils/request";
import {blobValidate, tansParams} from "@/utils/ruoyi";
import errorCode from "@/utils/errorCode";
//#endregion
const router = useRouter();
//TODO:删除按钮没有功能
//TODO:导出是否需要导出整个院系或年级 还是 导出当前页
//#region data
const elTableRef = ref(null);
const data = reactive({
  //总条数
  total: 10000,
  //一键导出对话框状态
  exportDialogVisible: false,
  //一键评分
  makeGradeOneDialogVisible: false,
  //查询参数
  queryParams: {
    collegeId: "",
    isConfirm: "",
    subject: "",
    grade: "",
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
  },

  //选择框选项
  options: {
    department: [{deptId: 100, parentId: 0, deptName: '湖南科技大学'}],
    class: [{"deptId": 5955, "parentId": 105, "deptName": "20信息安全1班"}],
    isConfirm: [{label: "待审核", value: 0}, {label: "已审核", value: 1}],
    subject: [{label: "软件工程", value: "软件工程"}],
    grade: [
      {label: "2020级", value: "2020"},
      {label: "2021级", value: "2021"},
      {label: "2022级", value: "2022"},
      {label: "2023级", value: "2023"},
      {label: "2024级", value: "2024"},
      {label: "2025级", value: "2025"},
    ],
    score: [
      {label: "优秀", value: 90},
      {label: "良好", value: 80},
      {label: "中等", value: 70},
      {label: "及格", value: 60},
      {label: "不及格", value: 30},
    ],
  },
  //审核列表
  auditList: [
    {
      classId: 57,
      className: "南转且头化向",
      collegeId: 97,
      collegeName: "委往地面",
      confirmUserId: 23,
      confirmUserName: "吕丽",
      deptId: 90,
      grade: "in",
      isConfirm: 33,
      level: "Excepteur minim ex",
      nickName: "石明",
      reason: null,
      score: 88,
      sex: "女",
      userId: 52,
      userName: "夏娟",
    },
  ],
  //个人审核信息
  auditItemInfo: {},
  //各模块详细
  itemModal: [
    {
      modal: "",
      totalWordNumber: "",
      filledNumber: "",
      filledStatus: "",
    },
  ],
  //导出参数
  exportParams: {
    grade: "",//年级
  },
  //一键评分参数
  makeOneKeyGradeParams: {
    ids: "",
    score: null,
  },
});
//#endregion

const {queryParams, options, auditList, exportParams} =
    toRefs(data);

//#region  页面流程
// 获取下拉框
getDeptOption().then(res => {
  // console.log(res)
  data.options.department = res.data
})

//获取列表数据
const getList = () => {
  getAuditList(data.queryParams).then(res => {
    // console.log(res)
    data.total = res.total;
    data.auditList = res.rows;
  })
};
getList();

//一键导出
const handleExport = () => {

  // console.log(exportParams.value);
  let downloadLoadingInstance = ElLoading.service({text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)"})
  getExportAuditList(
      {...data.exportParams},
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: 'blob',
      },
  ).then(async (data) => {
    // console.log(data);
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data])
      //保存 下载方法
      let collegeName = "";
      options.value.department.forEach(ele => {
        if (ele.deptId == queryParams.value.collegeId) {
          collegeName = ele.deptName;
        }
      })
      let className = options.value.class.find(item => {
        return item.deptId = exportParams.value.classId
      })
      // console.log("sd", options.value)
      saveAs(blob, `${collegeName}${className.deptName}.xlsx`)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      ElMessage.error(errMsg);
    }
    setTimeout(() => {
      downloadLoadingInstance.close();
    }, 4000)
  }).catch((r) => {
    console.error(r)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close();
  })
};

//打开一键导出对话款
const handleExportDialog = () => {
  if (queryParams.value.collegeId === "") {
    ElMessage.error("请选择院系后再导出！！！");
    return;
  }
  if (queryParams.value.grade === "") {
    ElMessage.error("请选择年级后再导出！！！");
    return;
  }
  data.exportDialogVisible = true;
  getClassOption({grade: data.queryParams.grade, collegeId: data.queryParams.collegeId}).then(res => {
    // console.log(res)
    data.options.class = res.data
  })
};

//关闭一键导出
const handleCloseExportDialog = () => {
  data.exportDialogVisible = false;
  data.exportParams.collegeId = null;
  data.exportParams.grade = "";
};

//一键评分
const handleMakeOneKeyGrade = () => {
  const selection = elTableRef.value.getSelectionRows();
  let tempArr = [];
  selection.forEach(item => {
    tempArr.push(item.userId);
  })
  data.makeOneKeyGradeParams.ids = tempArr.join(",");
  // console.log("@@", data.makeOneKeyGradeParams);
  if (data.makeOneKeyGradeParams.ids === "") {
    // console.log(444 )
    ElMessage.error("请勾选学生后再打分!!!")
    return;
  }
  if (data.makeOneKeyGradeParams.score === null) {
    ElMessage.error("请为学生选择分数!!!")
    return;
  }
  makeOneKeyGrade(data.makeOneKeyGradeParams).then(res => {
    // console.log("res", res);
    ElMessage.success("评分成功");
    data.makeOneKeyGradeParams.ids = "";
    data.makeOneKeyGradeParams.score = null;
    data.makeGradeOneDialogVisible = false;
  }).catch(res => {
  });
};

//打开一键评分对话款
const openMakeOneKeyGrade = () => {
  // console.log(1231)
  data.makeGradeOneDialogVisible = true;
}

//关闭一键评分对话框
const closeMakeOneKeyGrade = () => {
  data.makeGradeOneDialogVisible = false;
  data.makeOneKeyGradeParams.score = null;
}

//进入审核界面
const handleAuditDialog = (item) => {
  // data.auditDialogVisible = true;
  router.push({path: '/audit/detail', query: {id: item.id}});
};
//#endregion

</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none;
}

.audit-select {
  width: 120px;
}

.audit-status {
  color: #fff;
  text-align: center;
  height: 30px;
  width: 78px;
  line-height: 30px;
  border-radius: 4px;
}

//导出弹出框
.export-dialog {
}

//审核弹出款
.selfInfo {
  .title-selfInfo {
    margin-bottom: 10px;
  }

  .main-selfInfo {
    .row {
      margin-bottom: 17px;
    }

    .selfInfoItem {
      display: flex;

      .value {
        border-bottom: 2px solid #BBBBBB;
        width: 150px;
        margin-left: 30px;
      }
    }
  }
}

//待审核按钮
.el-button--danger.is-link,
.el-button--danger.is-plain,
.el-button--danger.is-text {
  cursor: text;
  --el-button-text-color: #f56c6c;
  --el-button-bg-color: #fef0f0;
  --el-button-border-color: #fab6b6;

  --el-button-hover-text-color: #f56c6c;
  --el-button-hover-bg-color: #fef0f0;
  --el-button-hover-border-color: #fab6b6;

  --el-button-active-text-color: #f56c6c;
  --el-button-active-bg-color: #fef0f0;
  --el-button-active-border-color: #fab6b6;
}

//已审核按钮
.el-button--primary.is-link,
.el-button--primary.is-plain,
.el-button--primary.is-text {
  cursor: text;
  --el-button-text-color: #409eff;
  --el-button-bg-color: #ebf5ff;
  --el-button-border-color: #9fceff;

  --el-button-hover-text-color: #409eff;
  --el-button-hover-bg-color: #ebf5ff;
  --el-button-hover-border-color: #9fceff;

  --el-button-active-text-color: #409eff;
  --el-button-active-bg-color: #ebf5ff;
  --el-button-active-border-color: #9fceff;
}
</style>
