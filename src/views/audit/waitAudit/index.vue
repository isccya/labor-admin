<template>
  <div class="app-container">
    <!-- 顶部查询导出评分表单 -->
    <el-form inline>
      <!-- 院系 -->
      <el-form-item label="院系">
        <el-select v-model="queryParams.collegeId" class="" placeholder="请选择" size="default"
                   @change="getList(queryParams)">
          <el-option v-for="item in options.department" :key="item.deptId" :label="item.deptName" :value="item.deptId"/>
        </el-select>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态">
        <el-select v-model="queryParams.isConfirm" class="audit-select" placeholder="请选择" size="default"
                   @change="getList(queryParams)">
          <el-option v-for="item in options.isConfirm" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>

      <!-- 专业选择 -->
      <el-form-item label="专业选择">
        <el-select v-model="queryParams.subject" class="audit-select" placeholder="请选择" size="default">
          <el-option v-for="item in options.subject" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>

      <!-- 年级选择 -->
      <el-form-item label="年级选择">
        <el-select v-model="queryParams.grade" class="audit-select" placeholder="请选择" size="default">
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
          <el-form-item label="院系" label-width="70">
            <el-select v-model="exportParams.department" class="" placeholder="请选择" size="default">
              <el-option v-for="item in options.department" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="专业选择">
            <el-select v-model="exportParams.subject" class="" placeholder="请选择" size="default">
              <el-option v-for="item in options.subject" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="年级选择">
            <el-select v-model="exportParams.grade" class="" placeholder="请选择" size="default">
              <el-option v-for="item in options.grade" :key="item.value" :label="item.label" :value="item.value"/>
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
        <el-button type="success">一键评分</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据展示 -->
    <el-table :data="auditList" stripe>
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
          <el-button type="warning">修改</el-button>
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
import {reactive, toRefs} from "vue";
import Pagination from "@/components/Pagination";
import {useRouter} from "vue-router";
import {getAuditList} from "@/api/audit";
import {getDeptOption} from "@/api/selectOption";

const router = useRouter();

const data = reactive({
  //总条数
  total: 10000,
  //一键导出对话框状态
  exportDialogVisible: false,
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
    department: [{deptName: "计算机科学与工程学院", deptId: "105"}],
    isConfirm: [{label: "待审核", value: 0}, {label: "已审核", value: 1}],
    subject: [{label: "软件工程", value: "软件工程"}],
    grade: [{label: "21级", value: "21级"}],
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
    department: "",
    subject: "",
    grade: "",
  },
});

const {queryParams, personalQueryParams, options, auditList, exportParams, auditItemInfo, itemModal} =
    toRefs(data);

// 获取下拉框
getDeptOption().then(res => {
      console.log(res)
      data.options.department = res
    },
)
//获取列表数据
const getList = () => {
  getAuditList(data.queryParams).then(res => {
    console.log(res)
    data.total = res.total;
    data.auditList = res.rows;
  })
};
getList();

// 下拉框查询


//一键导出
const handleExport = () => {
  console.log(exportParams.value);
};

//打开一键导出对话款
const handleExportDialog = () => {
  data.exportDialogVisible = true;
};

//关闭一键导出
const handleCloseExportDialog = () => {
  data.exportDialogVisible = false;
};

//一键评分
const handleMakeGrade = () => {
};

//打开审核界面
const handleAuditDialog = (item) => {
  // console.log(item);
  // data.auditDialogVisible = true;
  router.push({path: '/audit/detail', query: {id: item.userId}});
};

//关闭审核页面
const handleCloseAuditDialog = () => {
  data.auditDialogVisible = false;
};


</script>

<style scoped lang="scss">
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
