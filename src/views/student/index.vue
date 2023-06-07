<template>
  <div>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <el-form-item label="学院">
          <el-select
            v-model="data.select.department"
            placeholder="请选择"
            @change="dataFilter"
          >
            <el-option
              v-for="item in data.option"
              :key="item.deptId"
              :label="item.label"
              :value="item.deptName"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="年级">
          <el-select
            v-model="data.select.grade"
            placeholder="请选择"
            @change="dataFilter"
          >
            <el-option
              v-for="item in data.select"
              :key="item.grade"
              :label="item.label"
              :value="item.grade"
            />
          </el-select>
        </el-form-item> -->

        <el-form-item>
          <el-button
            type="success"
            class="btn"
            @click="data.dialogFormVisible = true"
            >添加学员</el-button
          >
        </el-form-item>
      </el-form>

      <el-dialog
        v-model="data.dialogFormVisible"
        title="添加学员"
        width="400px"
      >
        <el-form :model="form" label-width="90px">
          <el-form-item label="姓名">
            <el-input
              v-model="data.form.name"
              class="w-50 m-2"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="年级">
            <el-input
              v-model="data.form.grade"
              class="w-50 m-2"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input
              v-model="data.form.telephone"
              class="w-50 m-2"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="院系">
            <el-input
              v-model="data.form.department"
              class="w-50 m-2"
              placeholder="请输入"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData" stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="nickName" label="姓名">
          <template #default="scope">
            <el-input
              v-model="scope.row.nickName"
              v-show="scope.row.isEdit"
              placeholder="scope.row.nickName"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级">
          <template #default="scope">
            <el-input
              v-model="scope.row.grade"
              v-show="scope.row.isEdit"
              placeholder="scope.row.grade"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="className" label="班级">
          <template #default="scope">
            <el-input
              v-model="scope.row.className"
              v-show="scope.row.isEdit"
              placeholder="scope.row.className"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="联系方式">
          <template #default="scope">
            <el-input
              v-model="scope.row.userName"
              v-show="scope.row.isEdit"
              placeholder="scope.row.userName"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="collegeName" label="院系">
          <template #default="scope">
            <el-input
              v-model="scope.row.collegeName"
              v-show="scope.row.isEdit"
              placeholder="scope.row.collegeName"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.collegeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div>
              <el-button
                type="warning"
                @click="handleEdit(scope.row)"
                v-show="!scope.row.isEdit"
              >
                修改
              </el-button>
              <el-button
                type="warning"
                @click="EditComplete(scope.row)"
                v-show="scope.row.isEdit"
              >
                完成
              </el-button>
              <el-button type="danger">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div>
        <Pagination
          :total="data.total"
          v-model:page="data.queryParams.pageNum"
          v-model:limit="data.queryParams.pageSize"
          @pagination="getList"
        >
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script setup name = "Student">
import { reactive } from "vue"
import { getStudent } from "@/api/list/student"
import { getDeptSelect } from "@/api/list/select.js"
import Pagination from "@/components/Pagination"
import { ElMessage } from 'element-plus'

const data = reactive({
  //源数据  
  StudentList: '',
  //添加学生弹窗
  dialogFormVisible: false,
  //表格数据
  tableData: [
    {
      nickName: '',
      grade: '',
      userName: '',
      collegeName: ''
    }
  ],
  //下拉框选项
  option: '',
  //下拉框选择数据
  select: {
    department: '',
    grade: ''
  },
  //添加学生选框数据
  form: [
    {
      name: '',
      grade: '',
      telephone: '',
      department: ''
    }
  ],
  //分页参数
  queryParams: {
    collegeName: "",
    collegeId: "",
    isConfirm: "",
    subject: "",
    grade: "",
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
  },
  total: 1000
})

//提交新增学生    
function submit () {
  console.log(data.form)
  // ElMessage({
  //   message: '添加成功',
  //   type: 'success',
  // })
  data.dialogFormVisible = false
}
//获取学生数据
const getList = () => {
  getStudent(data.queryParams).then(res => {
    console.log(res)
    data.StudentList = res.rows
    data.tableData = res.rows
    data.total = res.total
  })
}
getList()
//获取下拉框学院数据
const getDeptSelectList = () => {
  getDeptSelect().then(res => {
    data.option = res.data
  })
}
getDeptSelectList()

//修改数据,当用户点击修改时，变成输入框
function handleEdit (row) {
  if (row.hasOwnProperty('isEdit')) {
    row.isEdit = true
  } else {
    row['isEdit'] = true
  }
}
//当点击完成时执行数据的修改  
function EditComplete (row) {
  row.isEdit = false
  ElMessage({
    message: '修改成功',
    type: 'success',
  })
}
//筛选数据
const dataFilter = (val) => {
  data.queryParams.collegeName = val
  console.log(typeof (val))
  console.log(data.queryParams)
  getList()

}
</script>

<style lang="scss" scoped>
.btn {
  color: rgba(255, 255, 255, 1);
  margin-left: 58px;
}
.select {
  position: relative;
  left: 28px;
  top: 18px;
  margin-right: 42px;
}
.list {
  padding: 20px;
}
</style>