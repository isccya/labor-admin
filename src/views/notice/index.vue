<template>
    <div class="select">
      <el-form :model="select" :inline="true">
        <!-- 学院 -->
        <el-form-item label="学院">
          <el-select v-model="data.select.department" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
          </el-select>
        </el-form-item>
        <!-- 学期 -->
        <el-form-item label="学期">
          <el-select v-model="data.select.semester" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="success" class="btn" @click="data.dialogFormVisible = true">新建公告</el-button>
        </el-form-item>
        <!-- 一键导入 -->
        <el-form-item class="Upload">
          <FileUpload></FileUpload>
        </el-form-item>
      </el-form>
    </div>
      <!-- 新建公告弹窗 -->
      <el-dialog v-model="data.dialogFormVisible" title="新建公告" width="400px">
        <el-form :model="form" label-width="90px" >
          <el-form-item label="姓名">
            <el-input v-model="data.form.name" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="学期">
            <el-input v-model="data.form.semester" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
          <el-form-item label="创建者">
            <el-input v-model="data.form.founder" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
          <el-form-item label="类型">
            <el-input v-model="data.form.type" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </span>
        </template>
      </el-dialog>
      
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData" class="table">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="term" label="学期"/>
          <el-table-column prop="founder" label="创建者" />
          <el-table-column prop="type" label="类型" />
          <el-table-column  label="操作">
            <template #default>
              <div>
                <el-button>修改</el-button>
                <el-button>删除</el-button>
              </div>
            </template>
          </el-table-column>
      </el-table>

        <!-- 分页器 -->
        <div class="pagination">
          <Pagination 
            :total="data.tableData.length" 
            v-model:page="data.pageParams.pageNum" 
            v-model:limit="data.pageParams.pageSize"
            @pagination="getList">
          </Pagination>
        </div>
    </div>
    
</template>

<script setup name = "Notice" >
import { reactive } from "vue";
import FileUpload from "@/components/FileUpload";

const data = reactive({
  //添加管理员弹窗
  dialogFormVisible: false, 
  //表格数据
  tableData: '',
  //下拉框选择数据
  select:[
    {
      department: '',
      semester:''
    }
  ],
  //新增管理员数据
  form:[
    {
      name: '',
      semester: '',
      founder: '',
      type: ''
    }
  ],
  //分页参数
  pageParams: {
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
    currentPage: '',
    pageSize:''
  },
})
//提交新增公告
function submit(){
      data.dialogFormVisible = false;
}
//获取公告数据
function getList () {
}
</script>

<style lang="scss" scoped>
.btn{
  color: rgba(255, 255, 255, 1);
  margin-left: 58px;
}
.select{
  position: relative;
  left: 28px;
  top: 18px;
  margin-right: 42px;
}
.list{
  padding: 20px;
}
.table{
  height: 711px;
}
.pagination {
  position:relative;
  left:115px;
  width: 773px;
}
.Upload{
  position: relative;
  top:2px;
}
</style>
