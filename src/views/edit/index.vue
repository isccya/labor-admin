<template>
  <div class="home">
    <div class="head">
      <el-icon><Setting /></el-icon>
      <span>基本信息</span>
    </div>
    <div class="select">
      <div class="item">
        <div class="text">
          <el-icon><Calendar /></el-icon>
          <p>学期</p>
        </div>
        <el-select v-model="value" class="m-2" placeholder="请选择">
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
        <el-input v-model="input2" class="w-50 m-2" placeholder="请输入" />
      </div>
      <div class="item">
        <div class="text">
          <el-icon><HomeFilled /></el-icon>
          <p>面向对象</p>
        </div>
        <el-select v-model="value" class="m-2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <write></write>
    
  </div>
</template>

<script setup>
  import Write from './write'
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