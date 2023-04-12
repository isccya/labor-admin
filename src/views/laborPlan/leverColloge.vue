<template>
  <div class="app-container" style="width: 800px;padding-left: 200px">
    <h1 style="font-size: xx-large;margin: 10px 0 10px 0;color: #606266;">xxx学院劳动计划</h1>
    <el-form style="border: 1px solid #d1d1d1;padding: 10px;border-radius: 10px;position: relative;">
      <el-form-item label="学期">
        <el-select v-model="queryParams.termName" placeholder="请选择">
          <el-option v-for="item in data.option" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="指导老师">
        <el-input v-model="queryParams.mentor" placeholder="" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="劳动内容">
        <el-form label-width="170" label-position="left">
          <el-form-item label="(1)日常劳动记录">
            <el-input v-model="queryParams.dailyLabor" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="(2)集中实践劳动记录">
            <el-input v-model="queryParams.collectiveLabor" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="(3)其他劳动记录">
            <el-input v-model="queryParams.otherLabor" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="(4)添加图片">
            <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                       :show-file-list="false" style="border: 1px dashed #dcdfe6;">
              <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-button class="buttonConform" style="margin-left: 50px;" type="primary">确认发布</el-button>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
//#region import
import {ref, reactive, toRefs} from 'vue';
import {getLaborListWithPage, getLaborDetail} from '@/api/laborPlane'
//#endregion

const imageUrl = ref("");
const planID = ref(0);

//#region data
const data = reactive({
  option: [{value: "第一学期", label: "第一学期"}],
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
})
//#endregion

//region toRefs
const {queryParams} = toRefs(data);
//endregion

//#region  页面流程
//获取planID
const getPlanID = () => {

}
//初始化
const init = () => {
  getLaborDetail(planID).then(res => {
    console.log(res)
    data.queryParams = res.data;
  }).catch(err => {
    console.log(err)
  })
}
init();
//#endregion

</script>

<style scoped>
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
