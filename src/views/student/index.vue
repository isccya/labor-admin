<template>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <!-- 学院 -->
        <el-form-item label="学院">
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
        <!-- 年级 -->
        <el-form-item label="年级">
          <el-select 
            v-model="data.select.grade" 
            placeholder="请选择"
            @change="dataFilter()">
            <el-option
              v-for="item in data.option"
              :key="item.grade"
              :label="item.label"
              :value="item.grade"/>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="success" class="btn" @click="data.dialogFormVisible = true">添加学员</el-button>
        </el-form-item>
      </el-form>
          <!-- 添加学员 -->
          <el-dialog v-model="data.dialogFormVisible" title="添加学员" width="400px">
            <el-form :model="form" label-width="90px" >
              <el-form-item label="姓名">
                <el-input v-model="data.form.name" class="w-50 m-2" placeholder="请输入"/>
              </el-form-item>
              <el-form-item label="年级">
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
                <el-button type="primary" @click="submit">提交</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 添加学员 -->
    </div>
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData" stripe  class="table">
          <el-table-column type="index" label="序号"/>
          <el-table-column prop="userName" label="姓名">
            <template #default="scope">
              <el-input v-model="scope.row.userName" v-show="scope.row.isEdit" placeholder="scope.row.userName" class="w-50"/>
              <span v-show="!scope.row.isEdit">{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="grade" label="年级">
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
              <div>
                <el-button 
                  text
                  type="warning" 
                  @click="handleEdit(scope.row)"
                  v-show="!scope.row.isEdit">
                  修改
                </el-button>
                <el-button 
                  text
                  type="warning" 
                  @click="EditComplete(scope.row)"
                  v-show="scope.row.isEdit">
                  完成
                </el-button>
                <el-button text type="danger">删除</el-button>
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

<script setup name = "Student">
import { reactive } from "vue";
import { getStudent } from "@/api/list/student";
import Pagination from "@/components/Pagination";
import { ElMessage } from 'element-plus'
//最开始就调用
getList ()
const data = reactive({
  //源数据  
  StudentList: '',
  //添加学生弹窗
  dialogFormVisible: false, 
  //表格数据
  tableData: '',
  //下拉框选项
  option: '',
   //下拉框选择数据
  select:[
    {
      department: '',
      grade: ''
    }
  ],
  //添加学生选框数据
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
});

//提交新增学生    
function submit(){
  console.log(data.form);
  // ElMessage({
  //   message: '添加成功',
  //   type: 'success',
  // })
  data.dialogFormVisible = false;
}
//获取学生数据
function getList () {
  getStudent().then(res =>{
    data.tableData = res;
    data.option = res;
    data.StudentList = res
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
  let result;
  if(data.select.department && data.select.grade){
    console.log(111);
    result = data.StudentList.filter(ele => (ele.dept.deptName == data.select.department && ele.grade == data.select.grade))
  }
  else if(data.select.department){
    result = data.StudentList.filter(ele => ele.dept.deptName == data.select.department)
  }
  else if(data.select.grade){
    result = data.StudentList.filter(ele => ele.grade == data.select.grade)
  }
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
  width: 100%;
  height: 711px;
}
.pagination {
  position:relative;
  left:115px;
  width: 773px;
}
</style>