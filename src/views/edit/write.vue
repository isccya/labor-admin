<template>
  <div class="index">
    <div class="head">
      <el-icon><Tickets /></el-icon>
      <span>通知内容</span>
    </div>
    <div class="item">
      <el-icon class="icon"><EditPen /></el-icon>&nbsp;
      <el-input v-model="input2" class="w-50 m-2" placeholder="通知主题" />
    </div>
    <div class="write">
        <editor/>
        <el-button color="#75F9FD" class="btn" >确定</el-button>
    </div>
  </div>
  
    
</template>

<script setup>
import Editor from './editor'
</script>

<style lang="scss" scoped>
.index{
  height: 770px;
  width: 1142px;
}
.head{
  span{
    margin-left: 20px;
  }
  position: relative;
  left: 20px;
  top: 20px;
  width: 200px;
  height: 26px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.item{
  position: relative;
  top:30px;
  left: 67px;
  width: 350px;
  height: 70px;
  margin-right: 200px;
}
.write{
  position: relative;
  left: 67px;
  top:33px;
  width: 763px;
  height: 535px;
  background-color: rgba(237, 241, 242, 1);
  border: 2px solid rgba(187, 187, 187, 1);
}
.btn{
  position: relative;
  left: 420px;
  top: 31px;
  width: 109px;
  height: 37px;
  border-radius: 4px;
  background-color: rgba(117, 249, 253, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 1);
}
</style>