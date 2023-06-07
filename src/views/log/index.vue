<template>
  <div>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <!-- 时间 -->
        <el-form-item label="时间">
          <el-select v-model="data.select.time" placeholder="请选择">
            <el-option
              v-for="item in data.option"
              :key="item.userName"
              :label="item.label"
              :value="item.userName"
            />
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item label="操作">
          <el-select v-model="data.select.operation" placeholder="请选择">
            <el-option
              v-for="item in data.option"
              :key="item.userName"
              :label="item.label"
              :value="item.userName"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData" stripe>
          <el-table-column type="index" label="序号"/>
          <el-table-column prop="userName" label="姓名"/>
          <el-table-column prop="grade" label="年级"/>
          <el-table-column prop="dept.phone" label="联系方式"/>
          <el-table-column prop="dept.deptName" label="院系"/>
          <el-table-column prop="operation" label="操作"/>
      </el-table>
      <!-- 分页器 -->
      <div>
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

<script setup name = "Log">
import { reactive } from "vue";
import { getLog } from "@/api/list/log";
const data = reactive({
  //表格数据
  tableData: [],
  //下拉框选项
  option: '',
   //下拉框选择数据
  select:[
    {
      time: '',
      operation: ''
    }
  ],
  //分页参数
  pageParams: {
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
    currentPage: '',
  },
});

//获取日志数据
function getList () {
  getLog().then(res => {
    data.tableData = res;
    data.option = res;
    console.log(res);
  });
}
getList();
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
</style>
