<template>
  <div>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <!-- 学院 -->
        <el-form-item label="学院">
          <el-select
            v-model="data.select.department"
            placeholder="请选择"
            @change="dataFilter()"
          >
            <el-option
              v-for="item in data.option"
              :key="item.dept.deptName"
              :label="item.label"
              :value="item.dept.deptName"
            />
          </el-select>
        </el-form-item>
        <!-- 学期 -->
        <el-form-item label="学期">
          <el-select
            v-model="data.select.semester"
            placeholder="请选择"
            @change="dataFilter()"
          >
            <el-option
              v-for="item in data.option"
              :key="item.grade"
              :label="item.label"
              :value="item.grade"
            />
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button
            type="success"
            class="btn"
            @click="data.dialogFormVisible = true"
            >新建公告</el-button
          >
        </el-form-item>
        <!-- 一键导入 -->
        <el-form-item class="Upload">
          <FileUpload></FileUpload>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新建公告弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" title="新建公告" width="400px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="姓名">
          <el-input
            v-model="data.form.name"
            class="w-50 m-2"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="学期">
          <el-input
            v-model="data.form.semester"
            class="w-50 m-2"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="创建者">
          <el-input
            v-model="data.form.founder"
            class="w-50 m-2"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-input
            v-model="data.form.type"
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

    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData.laborNoticeList">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="id" label="ID">
          <template #default="scope">
            <el-input
              v-model="scope.row.id"
              v-show="scope.row.isEdit"
              placeholder="scope.row.id"
              class="w-50"
              autofocus
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="noticeTitle" label="通知标题">
          <template #default="scope">
            <el-input
              v-model="scope.row.noticeTitle"
              v-show="scope.row.isEdit"
              placeholder="scope.row.noticeTitle"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.noticeTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间">
          <template #default="scope">
            <el-input
              v-model="scope.row.updateTime"
              v-show="scope.row.isEdit"
              placeholder="scope.row.updateTime"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="dept.type" label="类型">
          <template #default="scope">
            <el-input
              v-model="scope.row.dept.type"
              v-show="scope.row.isEdit"
              placeholder="scope.row.dept.type"
              class="w-50"
            />
            <span v-show="!scope.row.isEdit">{{ scope.row.dept.type }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template #default="scope">
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
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div>
        <Pagination
          :total="data.total"
          v-model:page="data.queryParams.current"
          v-model:limit="data.queryParams.size"
          @pagination="getList"
        >
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script setup name = "Notice" >
import { reactive } from "vue"
import FileUpload from "@/components/FileUpload"
import { getNotice } from "@/api/list/notice"
import { ElMessage } from 'element-plus'
//最开始就调用的方法
const data = reactive({
  //源数据  
  NoticeList: '',
  //添加管理员弹窗
  dialogFormVisible: false,
  //表格数据
  tableData: '',
  //下拉框选项
  option: '',
  //下拉框选择数据
  select:{
      department: '',
      semester: ''
    },
  //新增管理员数据
  form: [
    {
      name: '',
      semester: '',
      founder: '',
      type: ''
    }
  ],
  //请求参数
  queryParams: {
    // id: 1,
    // deptId: 1,
    // guideTeacherName: "",
    //pageNum: 1, //当前页码
    //pageSize: 10, //页码显示数
    // currentPage: "",
    // noticeContent: "",
    // noticeTheme: "",
    // noticeType: 0,
    // termId: 1,
    size: 10,
    current: 1
  },
  total: 1000
})
//提交新增公告
function submit () {
  console.log(data.form)
  // ElMessage({
  //   message: '添加成功',
  //   type: 'success',
  // })
  data.dialogFormVisible = false
}
//获取公告数据
const getList = () => {
  getNotice(data.queryParams).then(res => {
    data.tableData = res.data
    data.total = res.data.total
  })
}
getList()
//修改数据,当用户点击修改时，变成输入框  
function handleEdit (row) {
  if (row.hasOwnProperty('isEdit')) {
    row.isEdit = true
  } else {
    row['isEdit'] = true
  }
  console.log(row)
}
//当点击完成时执行数据的修改  
function EditComplete (row) {
  row.isEdit = false
  ElMessage({
    message: '修改成功',
    type: 'success',
  })
  console.log(row)
}
//筛选数据
function dataFilter () {
  let result
  if (data.select.department && data.select.semester) {
    console.log(111)
    result = data.NoticeList.filter(ele => (ele.dept.deptName == data.select.department && ele.grade == data.select.semester))
  }
  else if (data.select.department) {
    result = data.NoticeList.filter(ele => ele.dept.deptName == data.select.department)
  }
  else if (data.select.semester) {
    result = data.NoticeList.filter(ele => ele.grade == data.select.semester)
  }
  console.log(result)
  this.data.tableData = result
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
.Upload {
  position: relative;
  top: 2px;
}
</style>
