<template>
  <div class="home">
    <div class="head">
      <el-icon><Setting /></el-icon>
      <span>基本信息</span>
    </div>
    <el-form :mode="data.form">
      <div class="select">
        <!-- 学期 -->
        <div class="item">
          <div class="text">
            <el-icon><Calendar /></el-icon>
            <p>学期</p>
          </div>
          <el-select
            v-model="data.form.termName"
            class="m-2"
            placeholder="请选择"
            @change="getTermId"
          >
            <el-option
              v-for="item in data.options"
              :key="item.termId"
              :label="item.label"
              :value="item.termName"
            />
          </el-select>
        </div>
        <!-- 指导教师 -->
        <div class="item">
          <div class="text">
            <el-icon><Avatar /></el-icon>
            <p>指导教师</p>
          </div>
          <el-input
            v-model="data.form.guideTeacherName"
            class="w-50 m-2"
            placeholder="请输入"
          />
        </div>
        <!-- 面向对象 -->
        <div class="item">
          <div class="text">
            <el-icon><HomeFilled /></el-icon>
            <p>面向对象</p>
          </div>
          <el-select
            v-model="data.form.object"
            class="m-2"
            placeholder="请选择"
            ref="object"
            @change="getDeptId"
          >
            <el-option
              v-for="item in data.Objector"
              :key="item.deptId"
              :label="item.label"
              :value="item.deptName"
            />
          </el-select>
        </div>
      </div>
      <!-- 富文本编辑器 -->
      <write @ok="handleEdit" :isComplete="isComplete"></write>

      <el-button
        type="primary"
        class="btn"
        @click="data.dialogFormVisible = true"
        >确定</el-button
      >
      <!-- 弹窗 -->
      <el-dialog
        v-model="data.dialogFormVisible"
        title="编辑信息"
        width="400px"
      >
        <el-form :model="data.form" label-width="90px">
          <el-form-item label="学期">
            {{ data.form.termName }}
          </el-form-item>
          <el-form-item label="指导教师">
            {{ data.form.guideTeacherName }}
          </el-form-item>
          <el-form-item label="面向对象">
            {{ data.form.object }}
          </el-form-item>
          <el-form-item label="主题">
            {{ data.form.noticeTheme }}
          </el-form-item>
          <el-form-item label="文本">
            {{ data.form.noticeContent }}
          </el-form-item>
          <el-form-item label="学期ID">
            {{ data.form.termId }}
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 弹窗 -->
    </el-form>
  </div>
</template>

<script setup name = "Edit">
import { provide, reactive } from 'vue'
import Write from './write'
import { getTermList, getDeptSelect } from '@/api/list/select.js'
import { AddNotice } from '@/api/list/notice.js'
const data = reactive({
  dialogFormVisible: false,
  form: {
    id: new Date().getTime().toString(), // 通知id 
    termId: '', // 学期ID
    termName:'', // 学期名
    guideTeacherName: '', // 指导老师姓名
    noticeContent: "", // 通知内容
    noticeTheme: "",  // 通知主题
    deptId: '', // 院系id
    noticeType: 1, // 通知类型（0 - 公告 1 - 通知）
    object:'' //面向对象
  },
  options: '',
  optionsParams: {
    startTime: '', // startTime
    endTime: '', // 结束时间
    termId: '', // 学期id
    termName: '' // 学期
  },
  Objector: ''
})
// 子组件清空输入的标志
const isComplete = ref(false)

//接收子组件的数据
function handleEdit (message) {
  data.form.noticeContent = message.noticeContent
  data.form.noticeTheme = message.noticeTheme
}
//提交编辑数据
function submit () {
  AddNotice(data.form).then(res => {
    console.log(res)
  })
  data.dialogFormVisible = false
  setTimeout(() => {
    // 清空输入
    data.form = {}
    data.form.noticeType = 1
    isComplete.value = !isComplete.value
  }, 1500)
}
// 查询学期
const getTerm = () => {
  getTermList(data.optionsParams).then(res => {
    data.options = res
  })
}
getTerm()
// 查询院系
const getDept = () => {
  getDeptSelect().then(res => {
    data.Objector = res.data
  })
}
getDept()
// 通过选择的院系，获取其院系ID
function getDeptId (val) {
  data.Objector.map(item => {
    if (item.deptName === val) {
      data.form.deptId = item.deptId
    }
  })
}
// 通过选择的学期，获取其学期ID
function getTermId (val) {
  data.options.map(item => {
    if (item.termName === val) {
      data.form.termId = item.termId
    }
  })
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  left: 21px;
  top: 17px;
  width: 1142px;
  height: 1013px;
  line-height: 20px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
}
.head {
  span {
    margin-left: 20px;
  }
  position: relative;
  left: 20px;
  top: 17px;
  width: 200px;
  height: 26px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.item {
  position: relative;
  left: 67px;
  width: 350px;
  height: 70px;
  margin-right: 200px;
  // border: 1px solid black;
}
.select {
  position: relative;
  top: 30px;
  width: 1142px;
  height: 200px;
  // border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.text {
  p {
    width: 92px;
    height: 26px;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    margin-left: 20px;
  }
  float: left;
  width: 150px;
  height: 26px;
  display: flex;
  flex-direction: row;
  // border: 1px solid black;
}
.btn {
  position: relative;
  left: 500px;
  top: 30px;
  width: 109px;
  height: 37px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>