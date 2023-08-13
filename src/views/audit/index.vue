<template>
  <div class="app-container">
    <div class="flex">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules">
        <el-form-item label="院系">
          <el-select v-model="formInline.college" placeholder="请选择院系" clearable>
            <el-option label="Zone one" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择状态" clearable>
            <el-option v-for="item in stateList" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="formInline.grade" placeholder="请选择年级" clearable>
            <el-option label="Zone one" value="shanghai" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary">一键导出</el-button>
      <el-button type="success">一键评分</el-button>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
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
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const collegeList = reactive([]);
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
const gradeList = reactive([]);
const formInline = reactive({
  college: '',
  state: '',
  grade: '',
})
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
const currentPage = ref(1);
const pageSizes = reactive([10, 20, 30, 50])
onMounted(() => {

})
</script>

<style scoped></style>