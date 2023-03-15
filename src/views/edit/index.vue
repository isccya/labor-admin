<template>
  <div class="home">
    <div class="head">
      <el-icon><Setting /></el-icon>
      <span>基本信息</span>
    </div>
    <el-form :mode="form">
      <div class="select">
        <div class="item">
          <div class="text">
            <el-icon><Calendar /></el-icon>
            <p>学期</p>
          </div>
          <el-select v-model="form.semester" class="m-2" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="item">
          <div class="text">
            <el-icon><Avatar /></el-icon>
            <p>指导教师</p>
          </div>
          <el-input v-model="form.teacher" class="w-50 m-2" placeholder="请输入" />
        </div>
        <div class="item">
          <div class="text">
            <el-icon><HomeFilled /></el-icon>
            <p>面向对象</p>
          </div>
          <el-select v-model="form.object" class="m-2" placeholder="请选择">
            <el-option
              v-for="item in Objectoriented"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <write @ok="handleEdit"></write>
    </el-form>
  </div>
</template>

<script>
  import Write from './write';
  export default{
    name:'Edit',
    components:{Write},
    data(){
      return {
        form:[
          {
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
            label: '第二学期',
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
        Objectoriented:[
          {
            value: '全校',
            label: '全校',
          },
          {
            value: '计算机科学与工程学院',
            label: '计算机科学与工程学院',
          }
        ]
      }
    },
    methods:{
      //接收子组件的数据
      handleEdit(message){
        this.form.valueHtml = message.valueHtml;
        this.form.theme = message.theme;
      }
    }
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
</style>