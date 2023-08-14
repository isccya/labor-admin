<template>
  <div class="app-container">

    <div class="flex">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules">
        <el-form-item label="院系">
          <el-select v-model="formInline.college" placeholder="请选择院系" clearable>
            <el-option v-for="items in collegeList" :label="items.label" :value="items.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="formInline.grade" placeholder="请选择年级" clearable>
            <el-option v-for="items in gradeList" :label="items.label" :value="items.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择状态" clearable>
            <el-option v-for="item in stateList" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pb-3">
      <el-button type="primary" @click="oneExport">一键导出</el-button>
      <el-button type="success">一键评分</el-button>
    </div>

    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="序号" width="50" type="index" align="center"/>
        <el-table-column prop="date" label="姓名" align="center" />
        <el-table-column prop="address" label="学院" align="center" />
        <el-table-column prop="name" label="年级" align="center" />
        <el-table-column prop="address" label="班级" align="center" />
        <el-table-column label="审核状态" prop="isConfirm" align="center">
          <template #default="scope">
            <div v-if="scope.row.isConfirm === 1">
              <el-button type="primary" plain>已审核</el-button>
            </div>
            <div v-else>
              <el-button type="danger" plain>待审核</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button v-if="scope.row.isConfirm === 1" type="primary">修改</el-button>
            <el-button v-else type="primary" @click="">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end p-5">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" v-model:page-sizes="pageSizes"
          background layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>

    <div>
      <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <span>This is a message</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              一键导出
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElLoading, ElMessage } from "element-plus";

//学院列表
const collegeList = reactive([
    {
        label: '计算机科学与工程学院',
        value: '1'
    }
]);
//年级列表
const gradeList = reactive([
    {
        label: '2020级',
        value: '1'
    }
]);
//状态列表
const stateList = reactive([
  {
    label: '全部',
    value: '0',
  }, {
    label: '已审核',
    value: '1',
  }, {
    label: '待审核',
    value: '2',
  },
]);

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }, {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const currentPage = ref(1);//当前所在页面数
const pageSize = ref(10)//每页内容数
const pageSizes = reactive([10, 20, 30, 50])//可选择每页展示的内容数
const formInline = reactive({
  college: '',
  grade: '',

  state: '',
  pageNum: currentPage, //当前页码
  pageSize, //页码显示数
})
// 搜索表单
function handleQuery(){
  
}
// 重置表单
function resetQuery(){
  formInline.college = ''
  formInline.state = ''
  formInline.grade = ''

}
const dialogVisible = ref(false)//是否展示一键导出对话框
function oneExport() {
  if (formInline.college === "") {
    ElMessage.error("请选择院系后再导出！！！");
    return;
  }
  if (formInline.grade === "") {
    ElMessage.error("请选择年级后再导出！！！");
    return;
  }
  dialogVisible.value = true;
}
onMounted(() => {

})
</script>

<style scoped></style>