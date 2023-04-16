<template>
  <div>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <el-form-item label="学院" >
          <el-select 
            v-model="data.select.department" 
            placeholder="请选择" 
            @change="dataFilter()">
              <el-option
                v-for="item in data.option"
                :key="item.dept.deptName"
                :label="item.label"
                :value="item.dept.deptName"/>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="success" class="btn" @click="data.dialogFormVisible = true">添加管理员</el-button>
        </el-form-item>
      </el-form>
    </div>
      <!-- 添加管理员弹窗 -->
      <el-dialog v-model="data.dialogFormVisible" title="添加管理员" width="400px">
        <el-form :model="form" label-width="90px" >
          <el-form-item label="姓名">
            <el-input v-model="data.form.name" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="等级">
            <el-input v-model="data.form.grade" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
          <el-form-item label="联系方式">
            <el-input v-model="data.form.telephone" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
          <el-form-item label="院系">
            <el-input v-model="data.form.department" class="w-50 m-2" placeholder="请输入"/>
          </el-form-item>  
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit()">提交</el-button>
          </span>
        </template>
      </el-dialog>
      
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData" class="table">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="userName" label="姓名">
            <template #default="scope">
              <el-input v-model="scope.row.userName" v-show="scope.row.isEdit" placeholder="scope.row.userName" class="w-50" autofocus/>
              <span v-show="!scope.row.isEdit">{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="grade" label="等级">
            <template #default="scope">
              <el-input v-model="scope.row.grade" v-show="scope.row.isEdit" placeholder="scope.row.grade" class="w-50"/>
              <span v-show="!scope.row.isEdit">{{scope.row.grade}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dept.phone" label="联系方式">
            <template #default="scope">
              <el-input v-model="scope.row.dept.phone" v-show="scope.row.isEdit" placeholder="scope.row.dept.phone" class="w-50"/>
              <span v-show="!scope.row.isEdit">{{scope.row.dept.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dept.deptName" label="院系">
            <template #default="scope">
              <el-input v-model="scope.row.dept.deptName" v-show="scope.row.isEdit" placeholder="scope.row.dept.deptName" class="w-50"/>
              <span v-show="!scope.row.isEdit">{{scope.row.dept.deptName}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="操作">
            <template #default="scope">
                <el-button 
                  type="warning" 
                  @click="handleEdit(scope.row)"
                  v-show="!scope.row.isEdit">
                  修改
                </el-button>
                <el-button 
                  type="warning" 
                  @click="EditComplete(scope.row)"
                  v-show="scope.row.isEdit">
                  完成
                </el-button>
                <el-button type="danger">删除</el-button>
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
  </div>  
</template>

<script setup name = "Manager" >
import { reactive } from "vue";
import { getManager } from "@/api/list/manager";
import { ElMessage } from 'element-plus'
//最开始就调用的方法
getList();

const data = reactive({
  //源数据  
  ManagerList: '',
  //添加管理员弹窗
  dialogFormVisible: false, 
  //表格数据
  tableData: '',
  //下拉框选项
  option: '',
  //接收下拉框选择数据
  select:[
    {
      dept: ''
    }
  ],
  //新增管理员数据
  form:[
    {
      name: '',
      grade: '',
      telephone: '',
      department: ''
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
//提交新增管理员
function submit(){
  console.log(data.form);
  // ElMessage({
  //   message: '添加成功',
  //   type: 'success',
  // })
  data.dialogFormVisible = false;
}
//获取管理员数据和下拉框数据
function getList(){
  getManager().then(res =>{
    data.tableData = res;
    data.option = res;
    data.ManagerList = res
    console.log(res);
  });
}
//修改数据,当用户点击修改时，变成输入框  
function handleEdit(row){
  if(row.hasOwnProperty('isEdit')){
    row.isEdit = true;
  }else{
    row['isEdit']= true;
  }
  console.log(row);
}
//当点击完成时执行数据的修改  
function EditComplete(row){
   row.isEdit = false;
   ElMessage({
    message: '修改成功',
    type: 'success',
  })
   console.log(row);
}
//筛选数据
function dataFilter(){
  console.log(data.select.department);
  let result = data.ManagerList.filter(ele => ele.dept.deptName == data.select.department)
  console.log(result);
  this.data.tableData = result;
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
</style>