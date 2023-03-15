<template>
  <div class="app-container">
    <!-- 顶部查询导出评分表单 -->
    <el-form inline>
      <!-- 院系 -->
      <el-form-item label="院系">
        <el-select
          v-model="queryParams.department"
          class=""
          placeholder="请选择"
          size="default"
        >
          <el-option
            v-for="item in options.department"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态">
        <el-select
          v-model="queryParams.status"
          class="audit-select"
          placeholder="请选择"
          size="default"
        >
          <el-option
            v-for="item in options.status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 专业选择 -->
      <el-form-item label="专业选择">
        <el-select
          v-model="queryParams.subject"
          class="audit-select"
          placeholder="请选择"
          size="default"
        >
          <el-option
            v-for="item in options.subject"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 年级选择 -->
      <el-form-item label="年级选择">
        <el-select
          v-model="queryParams.grade"
          class="audit-select"
          placeholder="请选择"
          size="default"
        >
          <el-option
            v-for="item in options.grade"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 一键导出 -->
      <el-form-item label="">
        <el-button type="primary" @click="handleExportDialog"
          >一键导出</el-button
        >
      </el-form-item>

      <!-- 一键导出对话框 -->
      <el-dialog
        v-model="data.exportDialogVisible"
        title="一键导出"
        width="30%"
        :before-close="handleCloseDxportDialog"
        draggable
        class="export-dialog"
        :width="690"
      >
        <el-form label-position="left">
          <el-form-item label="院系" label-width="70">
            <el-select
              v-model="exportParams.department"
              class=""
              placeholder="请选择"
              size="default"
            >
              <el-option
                v-for="item in options.department"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="专业选择">
            <el-select
              v-model="exportParams.subject"
              class=""
              placeholder="请选择"
              size="default"
            >
              <el-option
                v-for="item in options.subject"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年级选择">
            <el-select
              v-model="exportParams.grade"
              class=""
              placeholder="请选择"
              size="default"
            >
              <el-option
                v-for="item in options.grade"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
    <el-table :data="auditList">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="专业" prop="subject"></el-table-column>
      <el-table-column label="年级" prop="grade"></el-table-column>
      <el-table-column label="班级" prop="class"></el-table-column>
      <el-table-column label="审核状态" prop="auditStatus">
        <template #default="scope">
          <div
            v-if="scope.row.auditStatus === '已审核'"
            class="audit-status"
            style="background-color: #67c23a"
          >
            已审核
          </div>
          <div v-else class="audit-status" style="background-color: red">
            待审核
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template #default="scope">
          <el-button text type="primary">审核</el-button>
          <el-button text type="warning">修改</el-button>
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审核弹出框 -->
    <el-dialog v-model="auditDialogVisible" title="Tips" width="30%" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="">评分</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="waitAudit">
import { toReactive } from "@vueuse/core";
import { reactive } from "vue";

const data = reactive({
  //一键导出对话框状态
  exportDialogVisible: false,
  //审核对话款状态
  auditDialogVisible: false,
  //查询参数
  queryParams: {
    department: "",
    status: "",
    subject: "",
    grade: "",
  },
  //选择框选项
  options: {
    department: [{ label: "计算机科学与工程学院", value: "" }],
    status: [{ label: "正常", value: "" }],
    subject: [{ label: "软件工程", value: "" }],
    grade: [{ label: "21级", value: "" }],
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
  ],
  //导出参数
  exportParams: {
    department: "",
    subject: "",
    grade: "",
  },
});

const { queryParams, options, auditList, exportParams } = toReactive(data);

//一键导出
const handleExport = () => {};

//打开一键导出对话款
const handleExportDialog = () => {
  data.exportDialogVisible = true;
};

//关闭一键导出
const handleCloseDxportDialog = () => {
  data.exportDialogVisible = false;
};



//一键评分
const handleMakeGrade = () => {};
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
.export-dialog {
}
</style>