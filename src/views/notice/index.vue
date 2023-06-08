<template>
  <div>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <!-- 学院 -->
        <el-form-item label="学院">
          <el-select
            v-model="data.select.department"
            placeholder="请选择"
            @change="dataFilter"
          >
            <el-option
              v-for="item in data.DeptOption"
              :key="item.deptName"
              :label="item.label"
              :value="item.deptName"
            />
          </el-select>
        </el-form-item>
        <!-- 学期 -->
        <el-form-item label="学期">
          <el-select
            v-model="data.select.semester"
            placeholder="请选择"
            @change="dataFilter"
          >
            <el-option
              v-for="item in data.TermOption"
              :key="item.termId"
              :label="item.label"
              :value="item.termName"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="Upload">
          <FileUpload></FileUpload>
        </el-form-item>
      </el-form>
    </div>
    <!-- 公告详情弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" title="公告详情" width="800px">
      <el-form :model="data.detail" label-width="90px">
        <el-form-item label="公告标题" class="notice-item">
          <el-input
            v-model="data.detail.noticeTitle"
            v-show="data.detail.isEdit"
            placeholder="请输入"
            autofocus
            class="w-40"
          />
          <span v-show="!data.detail.isEdit">{{
            data.detail.noticeTitle
          }}</span>
        </el-form-item>
        <el-form-item label="指导老师" class="notice-item">
          <el-input
            v-model="data.detail.guideTeacherName"
            v-show="data.detail.isEdit"
            placeholder="请输入"
            autofocus
            class="w-50"
          />
          <span v-show="!data.detail.isEdit">{{
            data.detail.guideTeacherName
          }}</span>
        </el-form-item>
        <el-form-item label="创建时间" class="notice-item">
          <span>{{ data.detail.createTime }}</span>
        </el-form-item>
        <el-form-item label="类型" class="notice-item">
          <span>{{ data.detail.noticeTypeName }}</span>
        </el-form-item>
        <el-form-item label="面向对象" class="notice-item">
          <el-select
            v-model="data.detail.deptName"
            v-show="data.detail.isEdit"
            placeholder="data.detail.deptName"
            @change="getDeptId"
          >
            <el-option
              v-for="item in data.DeptOption"
              :key="item.deptName"
              :label="item.label"
              :value="item.deptName"
            />
          </el-select>
          <span v-show="!data.detail.isEdit">{{ data.detail.deptName }}</span>
        </el-form-item>
        <el-form-item label="学期" class="notice-item">
          <el-select
            v-model="data.detail.termName"
            v-show="data.detail.isEdit"
            placeholder="data.detail.termName"
            @change="getTermId"
          >
            <el-option
              v-for="item in data.TermOption"
              :key="item.termId"
              :label="item.label"
              :value="item.termName"
            />
          </el-select>
          <span v-show="!data.detail.isEdit">{{ data.detail.termName }}</span>
        </el-form-item>
        <el-form-item label="公告内容" class="notice-item-content">
          <el-input
            type="textarea"
            maxlength="300"
            show-word-limit
            rows="13"
            v-model="data.detail.noticeContent"
            v-show="data.detail.isEdit"
            placeholder="data.detail.noticeContent"
          />
          <span v-show="!data.detail.isEdit">{{
            data.detail.noticeContent
          }}</span>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button
            plain
            type="danger"
            @click="data.dialogDeleteConfirm = true"
          >
            删除
          </el-button>
          <el-button
            type="warning"
            plain
            @click="handleEdit"
            v-show="!data.detail.isEdit"
            >修改</el-button
          >
          <el-button
            type="warning"
            plain
            @click="data.dialogUpdateConfirm = true"
            v-show="data.detail.isEdit"
            >完成</el-button
          >
          <el-button
            type="primary"
            plain
            @click="data.dialogFormVisible = false"
            >关闭</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 确认删除 -->
    <el-dialog
      v-model="data.dialogDeleteConfirm"
      title="确认删除该公告吗"
      width="450px"
    >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogDeleteConfirm = false">取消</el-button>
          <el-button type="primary" @click="deleteData"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 确认修改 -->
    <el-dialog
      v-model="data.dialogUpdateConfirm"
      title="确认提交已修改吗"
      width="450px"
    >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogUpdateConfirm = false">取消</el-button>
          <el-button type="primary" @click="EditComplete"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData.laborNoticeList" stripe>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="noticeTitle" label="通知标题" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button text type="primary" @click="getDetails(scope.row)">
              查看详细
            </el-button>
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
import { getNotice, deleteNotice, detailNotice, updateNotice } from "@/api/list/notice"
import { getDeptSelect, getTermList } from "@/api/list/select.js"
import { ElMessage } from 'element-plus'
//最开始就调用的方法
const data = reactive({
  //源数据  
  NoticeList: '',
  //添加管理员弹窗
  dialogFormVisible: false,
  dialogUpdateConfirm: false,
  dialogDeleteConfirm: false,
  //表格数据
  tableData: '',
  //下拉框选项
  DeptOption: '', // 学院
  TermOption: '', // 学期
  optionsParams: {
    startTime: '', // startTime
    endTime: '', // 结束时间
    termId: '', // 学期id
    termName: '' // 学期
  },
  //下拉框选择数据
  select: {
    department: '',
    semester: ''
  },
  //获取公告详情
  detail: {},
  //请求参数
  queryParams: {
    size: 10,
    current: 1
  },
  total: 1000,
})

//获取公告数据
const getList = () => {
  getNotice(data.queryParams).then(res => {
    data.tableData = res.data
    data.total = res.data.total
  })
}
getList()
// 查询学期
const getTerm = () => {
  getTermList(data.optionsParams).then(res => {
    data.TermOption = res
  })
}
getTerm()
// 查询院系
const getDept = () => {
  getDeptSelect().then(res => {
    data.DeptOption = res.data
  })
}
// 点击查看公告的详细信息
const getDetails = (val) => {
  data.dialogFormVisible = true
  detailNotice(val).then(res => {
    data.detail = res.data
    getDeptId()
    getTermId()
  })
}
getDept()
//修改数据,当用户点击修改时，变成输入框  
const handleEdit = () => {
  if (data.detail.hasOwnProperty('isEdit')) {
    data.detail.isEdit = true
  } else {
    data.detail['isEdit'] = true
  }
}
//提交修改信息前对数据进行处理
const ProcessData = () => {
  data.detail.noticeTheme = data.detail.noticeTitle
  data.detail.updateTime = ''
  data.detail.createTime = ''
  if (data.detail.noticeTypeName === '公告') {
    data.detail.noticeType = 1
  }
  else {
    data.detail.noticeType = 0
  }
}
//当点击完成时执行数据的修改  
const EditComplete = () => {
  data.detail.isEdit = false
  ProcessData()
  updateNotice(data.detail).then(res => {
    if (res.code === 200) {
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
      data.dialogUpdateConfirm = false
      data.dialogFormVisible = false
    }
  })
}
// 删除通知
const deleteData = () => {
  let ids = data.detail.id.toString()
  const params = { ...data.detail, ids }
  deleteNotice(params).then(res => {
    if (res.code === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    }
    // 重新请求数据
    getList()
    data.dialogDeleteConfirm = false
    data.dialogFormVisible = false
  })
}
// 获取公告详情的学院ID
const getDeptId = () => {
  data.DeptOption.map(item => {
    if (item.deptName === data.detail.deptName) {
      data.detail.deptId = item.deptId
    }
  })
}
// 获取公告详情学期ID
const getTermId = () => {
  data.TermOption.map(item => {
    if (item.termName === data.detail.termName) {
      data.detail.termId = item.termId
    }
  })
}
//筛选数据
const dataFilter = (val) => {
  console.log(val);
  data.DeptOption.map(item=>{
    if(item.deptName === val){
      data.queryParams.deptId = item.deptId
    }
  })
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
.Upload {
  position: relative;
  top: 2px;
}
.notice-item {
  width: 280px;
}
.notice-item-content {
  width: 400px;
  position: absolute;
  top: 85px;
  left: 40%;
}
</style>
