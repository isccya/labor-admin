<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="操作">
                    <el-select v-model="formInline.operate" placeholder="请选择操作" clearable>
                        <el-option v-for="items in operateList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item> -->
                <el-form-item label="时间">
                    <el-date-picker v-model="formInline.time" range-separator="To" start-placeholder="Start time" type="daterange"
                        end-placeholder="End time" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="logList" stripe style="width: 100%" v-loading="loading">
                <el-table-column width="50" type="index" align="center" />
                <el-table-column prop="adminName" label="操作人员" align="center" />
                <el-table-column prop="operationTime" label="操作时间" align="center" />
                <el-table-column prop="collegeName" label="院系" align="center">
                    <template #default="scope">
                        <div v-if="scope.row.collegeName"> {{ scope.row.collegeName }}</div>
                        <div v-else>湖南科技大学</div>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center" />
                <el-table-column prop="operationName" label="操作类型" align="center" />
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="queryLogList" @current-change="queryLogList" />
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getLogList } from '../../api/log'; 
import { timeFormate } from '../../utils/formate'

const loading = ref(false);
const total = ref(0);
const logList: any = reactive([])

// 搜索表单
function handleQuery() {
    queryLogList();
}

// 重置表单
function resetQuery() {
    formInline.time = []
}

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = reactive([10, 20, 30, 50]);

// 表单数据
const formInline: any = reactive({
    time:[],
    current: currentPage,
    size: pageSize,
})

function queryLogList() {
    loading.value = true;
    console.log(formInline.time[0] && timeFormate(formInline.time[0]));
    getLogList({
        startTime:formInline.time[0] && timeFormate(formInline.time[0]),
        endTime:formInline.time[1] && timeFormate(formInline.time[1]),
        current: currentPage.value,
        size: pageSize.value,
    }).then((res) => {
        logList.length = 0;
        total.value = res.data.total;
        logList.push(...res.data.dataList);
        loading.value = false;
    })
}

/*
* 数据初始化
* */
onMounted(() => {
    queryLogList();
})
</script>
  
<style scoped></style>