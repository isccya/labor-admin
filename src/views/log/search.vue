<template>
  <el-form :model="form">
    <div class="header">
      <div class="select">
        <span>时间</span>
        <el-select v-model="form.time" class="m-2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="select">
        <span>操作</span>
        <el-select v-model="form.operation" class="m-2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div> 
  </el-form>
</template>

<script>
export default {
  data(){
    return{
      form:[
        {
          time:'',
          operation:''
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.header{
    position: relative;
    left: 81px;
    width: 1202px;
    height: 103px;
    line-height: 20px;
    border-radius: 0px 0px 5px 5px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid #EEEEEE;
    text-align: center;
    display:flex;
    flex-direction: row;
}
.btn{
  color: rgba(255, 255, 255, 1);
  margin-left: 58px;
}
.select{
  span{
    margin-right: 26px;
  }
  position: relative;
  left: 28px;
  top: 18px;
  margin-right: 42px;
}
</style>