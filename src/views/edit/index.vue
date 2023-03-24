<template>
  <div class="home">
    <div class="head">
      <el-icon><Setting /></el-icon>
      <span>基本信息</span>
    </div>
    <el-form :mode="form">
      <div class="select">
        <!-- 学期 -->
        <div class="item">
          <div class="text">
            <el-icon><Calendar /></el-icon>
            <p>学期</p>
          </div>
          <el-select v-model="data.form.semester" class="m-2" placeholder="请选择">
            <el-option
              v-for="item in data.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- 指导教师 -->
        <div class="item">
          <div class="text">
            <el-icon><Avatar /></el-icon>
            <p>指导教师</p>
          </div>
          <el-input v-model="data.form.teacher" class="w-50 m-2" placeholder="请输入" />
        </div>
        <!-- 面向对象 -->
        <div class="item">
          <div class="text">
            <el-icon><HomeFilled /></el-icon>
            <p>面向对象</p>
          </div>
          <el-select v-model="data.form.object" class="m-2" placeholder="请选择">
            <el-option
              v-for="item in data.Objector"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <!-- 富文本编辑器 -->
      <write @ok="handleEdit"></write>
      
      <el-button type="primary" class="btn" @click="data.dialogFormVisible = true">确定</el-button>
      <!-- 弹窗 -->
      <el-dialog v-model="data.dialogFormVisible" title="编辑信息" width="400px">
        <el-form :model="data.form" label-width="90px" >
          <el-form-item label="学期">
            {{ data.form.semester }}
          </el-form-item>
          <el-form-item label="指导教师">
            {{ data.form.teacher }}
          </el-form-item>  
          <el-form-item label="面向对象">
            {{ data.form.object }}
          </el-form-item>  
          <el-form-item label="主题">
            {{ data.form.theme }}
          </el-form-item>
          <el-form-item label="文本">
            {{ data.form.valueHtml }}
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
import { reactive } from 'vue';
import Write from './write';
    const data = reactive({
    dialogFormVisible: false,
    form:[
      {
        name: '',
        grade: '',
        telephone: '',
        department: '',
        semester:'',
        teacher:'',
        object:'',
        valueHtml:"",
        theme: "",
      }
    ],
    options:[
      {
        value: '第一学期',
        label: '第一学期',
      },
      {
        value: '第二学期',
        abel: '第二学期',
      },
      {
        value: '第三学期',
        label: '第三学期',
      },
      {
        value: '第四学期',
        label: '第四学期',
      },
      {
        value: '第五学期',
        label: '第五学期',
      },
      {
        value: '第六学期',
        label: '第六学期',
      },
      {
        value: '第七学期',
        label: '第七学期',
      },
      {
        value: '第八学期',
        label: '第八学期',
      },
    ],
    Objector:[
      {
        value: '全校',
        label: '全校',
      },
      {
        value: '计算机科学与工程学院',
        label: '计算机科学与工程学院',
      }
    ]
  })
  //接收子组件的数据
  function handleEdit(message){
    data.form.valueHtml = message.valueHtml;
    data.form.theme = message.theme;
  }
  //提交编辑数据
  function submit(){
      data.dialogFormVisible = false;
  }

  
</script>

<style lang="scss" scoped>
.home{
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
.head{
  span{
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
.item{
  position: relative;
  left: 67px;
  width: 350px;
  height: 70px;
  margin-right: 200px;
  // border: 1px solid black;
}
.select{
  position: relative;
  top: 30px;
  width: 1142px;
  height: 200px;
  // border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.text{
  p{
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
.btn{
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