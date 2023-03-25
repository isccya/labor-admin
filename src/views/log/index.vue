<template>
    <div class="select">
      <el-form :model="data.select" :inline="true">
        <!-- 时间 -->
        <el-form-item label="时间">
          <el-select v-model="data.select.time" placeholder="请选择">
            <el-option
              v-for="item in data.option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item label="操作">
          <el-select v-model="data.select.operation" placeholder="请选择">
            <el-option
              v-for="item in data.option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据展示 -->
    <div class="list">
      <el-table :data="data.tableData" stripe  class="table">
          <el-table-column type="index" label="序号"/>
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="grade" label="年级"/>
          <el-table-column prop="tel" label="联系方式"/>
          <el-table-column prop="department" label="院系"/>
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

<script setup name = "Log">
import { reactive } from "vue";
// import {  };
const data = reactive({
  //表格数据
  tableData: '',
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
    pageSize:''
  },
});

//获取日志数据
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
  width: 100%;
  height: 711px;
}
.pagination {
  position:relative;
  left:115px;
  width: 773px;
}
</style>
