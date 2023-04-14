<template>
  <div class="app-container">
    <div class="header">
      <h1>xxx学院劳动计划</h1>
      <el-button class="buttonConform" style="margin-left: 50px;" type="primary">确认发布</el-button>
    </div>
    <el-form>
      <el-table :data="list" stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="学期" prop="termName"></el-table-column>
        <el-table-column label="指导老师" prop="mentorName"></el-table-column>
        <el-table-column label="日常劳动记录" prop="dailyLabor"></el-table-column>
        <el-table-column label="集中劳动记录" prop="collectiveLabor"></el-table-column>
        <el-table-column label="其他劳动记录" prop="otherLabor"></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
//#region import
import { ref, reactive, toRefs } from 'vue';
import { getLaborDetail, getLaborListWithPage } from '@/api/laborPlane'
import { getTermListOption } from "@/api/selectOption"
//#endregion

const imageUrl = ref("");
const planID = ref(0);

//#region data
const data = reactive({
  option: [{ termName: "第一学期", termId: "第一学期" }],
  queryParams: {
    /**
     * 集体劳动需要完成次数
     */
    collectiveLabor: 0,
    /**
     * 集体劳动记录是否可以修改
     */
    collectiveLaborModify: 0,
    /**
     * 日常劳动需要完成次数
     */
    dailyLabor: 0,
    /**
     * 日常劳动记录是否可以修改
     */
    dailyLaborModify: 0,
    /**
     * 截止时间
     */
    deadline: Date,
    /**
     * 学院id
     */
    deptId: 0,
    /**
     * 学院名
     */
    deptName: "",
    /**
     * 年级
     */
    grade: "",
    /**
     * 指导老师id
     */
    mentor: 0,
    /**
     * 指导老师姓名
     */
    mentorName: "",
    /**
     * 其他劳动需要完成次数
     */
    otherLabor: 0,
    /**
     * 其他劳动记录是否可以修改
     */
    otherLaborModify: 0,
    /**
     * 计划id
     */
    planId: 0,
    /**
     * 级别
     */
    ranks: 0,
    /**
     * 社会实践劳动需要完成的次数
     */
    societyLabor: 0,
    /**
     * 社会劳动记录是否可以修改
     */
    societyLaborModify: 0,
    /**
     * 是否启动
     */
    status: 0,
    /**
     * 学期
     */
    term: 0,
    /**
     * 学期名
     */
    termName: "",
  },
  list: [{/**
     * 集体劳动需要完成次数
     */
    collectiveLabor: 0,
    /**
     * 集体劳动记录是否可以修改
     */
    collectiveLaborModify: 0,
    /**
     * 日常劳动需要完成次数
     */
    dailyLabor: 0,
    /**
     * 日常劳动记录是否可以修改
     */
    dailyLaborModify: 0,
    /**
     * 截止时间
     */
    deadline: Date,
    /**
     * 学院id
     */
    deptId: 0,
    /**
     * 学院名
     */
    deptName: "",
    /**
     * 年级
     */
    grade: "",
    /**
     * 指导老师id
     */
    mentor: 0,
    /**
     * 指导老师姓名
     */
    mentorName: "dsad",
    /**
     * 其他劳动需要完成次数
     */
    otherLabor: 0,
    /**
     * 其他劳动记录是否可以修改
     */
    otherLaborModify: 0,
    /**
     * 计划id
     */
    planId: 0,
    /**
     * 级别
     */
    ranks: 0,
    /**
     * 社会实践劳动需要完成的次数
     */
    societyLabor: 0,
    /**
     * 社会劳动记录是否可以修改
     */
    societyLaborModify: 0,
    /**
     * 是否启动
     */
    status: 0,
    /**
     * 学期
     */
    term: 0,
    /**
     * 学期名
     */
    termName: "dwawdda",
  }]
})
//#endregion

//region toRefs
const { queryParams, list } = toRefs(data);
//endregion

//#region  页面流程
//获取planID
const getPlanID = () => {

}
//初始化
const init = () => {
  getTermListOption().then(res => {
    data.option = res;
    // console.log(res);
  })
  // getLaborDetail(planID).then(res => {
  //   // console.log(res)
  //   data.queryParams = res.data;
  // }).catch(err => {
  //   console.log(err)
  // })
  getLaborListWithPage({ deptId: Math.random() * 10 }).then(res => {
    console.log(res);

  })
}
init();

//改变学期
const changeTerm = (val) => {
  let term;
  term = data.option.find(elem => elem.termName === val)
  data.queryParams.term = term.termId;
}
//#endregion

</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
  color: #606266;

  h1 {
    font-size: 30px;
  }

}

.form {
  padding-left: 100px;
  margin-top: 10px;

  h3 {
    font-weight: 700;
    color: #606266;
    margin-bottom: 10px;
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.buttonConform {
  position: absolute;
  right: 30px;
  top: 10px;
}
</style>
