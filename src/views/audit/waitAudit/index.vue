<template>
  <div class="app-container">
    <!-- 顶部查询导出评分表单 -->
    <el-form inline>
      <!-- 院系 -->
      <el-form-item label="院系">
        <el-select v-model="queryParams.department" class="" placeholder="请选择" size="default">
          <el-option v-for="item in options.department" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态">
        <el-select v-model="queryParams.status" class="audit-select" placeholder="请选择" size="default">
          <el-option v-for="item in options.status" :key="item.value" :label="item.label" :value="item.value"/>
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
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="专业" prop="subject"></el-table-column>
      <el-table-column label="年级" prop="grade"></el-table-column>
      <el-table-column label="班级" prop="class"></el-table-column>
      <el-table-column label="审核状态" prop="auditStatus">
        <template #default="scope">
          <div v-if="scope.row.auditStatus === '已审核'">
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

    <!-- 审核弹出框 -->
    <el-dialog v-model="data.auditDialogVisible" width="90%" draggable :before-close="handleCloseAuditDialog">

      <!-- 个人信息详细 -->
      <div class="selfInfo">
        <div class="title-selfInfo" style="font-size: 20px">
          <span class="svg">我是图标</span>
          <span>个人信息</span>
        </div>

        <div class="main-selfInfo">
          <el-row :gutter="0" class="row">
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">姓名</div>
                <div class="value">张三</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">学院</div>
                <div class="value">计算科学与工程学院</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">填写状态</div>
                <div class="value" @click="lookEachModle">各模块已填写(点击产看各项数据)</div>
              </div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">班级</div>
                <div class="value">软件二班</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">学号</div>
                <div class="value">200220020202</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">年级</div>
                <div class="value">20</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 各模块详细 -->
      <div class="modelDetails">
        <div class="title-modelDetails" style="font-size: 20px">
          <span class="svg">我是图标</span>
          <span>各模块详细</span>
        </div>
        <el-table :data="itemModal">
          <el-table-column label="模块" prop="modal"></el-table-column>
          <el-table-column label="总字数" prop="totalWordNumber"></el-table-column>
          <el-table-column label="填写条数" prop="filledNumber"></el-table-column>
          <el-table-column label="填写情况" prop="filledStatus"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button text type="primary" @click="handleDetailDialog">查看详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <Pagination :total="data.personalTotal" v-model:page="personalQueryParams.pageNum"
                  v-model:limit="personalQueryParams.pageSize" @pagination="getList"
                  :layout="'prev,pager,next,'"></Pagination>

      <!--弹出框脚-->


      <template #footer>
            <span class="dialog-footer">
              <el-button @click="">评分</el-button>
            </span>
      </template>

    </el-dialog>

    <!--    查看详细弹出款-->
    <el-dialog v-model="data.detailDialogVisible" width="90%" :before-close="handleCloseDetail" draggable>

      <!--      个人信息-->
      <div class="selfInfo">
        <div class="main-selfInfo">
          <el-row :gutter="0" class="row">
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">姓名</div>
                <div class="value">张三</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">学院</div>
                <div class="value">计算科学与工程学院</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">填写状态</div>
                <div class="value">各模块已填写(点击产看各项数据)</div>
              </div>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">班级</div>
                <div class="value">软件二班</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">学号</div>
                <div class="value">200220020202</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="selfInfoItem">
                <div class="label">年级</div>
                <div class="value">20</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>


      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="waitAudit">
import {reactive, toRefs} from "vue";
import Pagination from "@/components/Pagination";
import {useRouter} from "vue-router";

const router = useRouter();

const data = reactive({
  //总条数
  total: 10000,
  //一键导出对话框状态
  exportDialogVisible: false,
  //审核对话款状态
  auditDialogVisible: false,
  //查看详细对话框
  detailDialogVisible: false,
  //查询参数
  queryParams: {
    department: "",
    status: "",
    subject: "",
    grade: "",
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
  },
  //个人审核查询参数
  personalTotal: 100,
  personalQueryParams: {
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
  },
  //选择框选项
  options: {
    department: [{label: "计算机科学与工程学院", value: "计算机科学与工程学院"}, {
      label: "计算机科学与工程学院",
      value: "计算机科学与工程学院",
    }],
    status: [{label: "正常", value: "正常"}],
    subject: [{label: "软件工程", value: "软件工程"}],
    grade: [{label: "21级", value: "21级"}],
  },
  //审核列表
  auditList: [
    {
      name: "张三",
      subject: "软件工程",
      grade: "20",
      class: "软件工程二班",
      auditStatus: "待审核",
    },
    {
      name: "张三",
      subject: "软件工程",
      grade: "20",
      class: "软件工程二班",
      auditStatus: "已审核",
    },
    {
      name: "张三",
      subject: "软件工程",
      grade: "20",
      class: "软件工程二班",
      auditStatus: "待审核",
    },
  ],
  //个人审核行信息
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

//获取列表数据
const getList = () => {
};

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
  console.log(item);
  // data.auditDialogVisible = true;
  router.push({path: "/audit/detail"})

};

//关闭审核页面
const handleCloseAuditDialog = () => {
  data.auditDialogVisible = false;
};

//查看详细
const handleDetailDialog = () => {
  data.detailDialogVisible = true;
}

//关闭查看详细
const handleCloseDetail = () => {
  data.detailDialogVisible = false;
}

// 点击查看各项数据
const lookEachModle = () => {

}

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
