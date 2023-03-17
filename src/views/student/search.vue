<template>
  <div class="header">
    <div class="select">
      <span>学院</span>
      <el-select v-model="value" class="m-2" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="select">
      <span>年级</span>
      <el-select v-model="value" class="m-2" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button color="#75F9FD" class="btn" @click="dialogFormVisible = true">添加学员</el-button>
      <!-- 添加学员 -->
      <el-dialog v-model="dialogFormVisible" title="添加学员" width="400px">
        <el-form :model="form" label-width="90px" >
          <el-form-item label="姓名">
            <el-input v-model="form.name" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="form.grade" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
          <el-form-item label="联系方式">
            <el-input v-model="form.telephone" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
          <el-form-item label="院系">
            <el-input v-model="form.department" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 添加学员 -->
    </div>

    
  </div>
</template>

<script>
export default {
  data(){
    return{
      dialogFormVisible:false,
      form:[
        {
          name: '',
          grade: '',
          telephone: '',
          department: ''
        }
      ]
    }
  },
  methods:{
    submit(){
      this.dialogFormVisible = false;
    }
  }
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