<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="操作">
                    <el-select v-model="formInline.operate" placeholder="请选择操作" clearable>
                        <el-option v-for="items in operateList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="院系">
                    <el-select v-model="formInline.college" placeholder="请选择院系" clearable>
                        <el-option v-for="items in collegeList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker v-model="formInline.time" range-separator="To" start-placeholder="Start time"
                        type="daterange" end-placeholder="End time" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="logList" stripe style="width: 100%">
                <el-table-column width="50" type="index" align="center" />
                <el-table-column prop="operAdminName" label="操作人员" align="center" />
                <el-table-column prop="operTime" label="操作时间" align="center" />
                <el-table-column prop="college" label="院系" align="center" />
                <el-table-column prop="contact" label="联系方式" align="center" />
                <el-table-column prop="operType" label="操作类型" align="center">
                    <template #default="scope">
                        <span>{{ judgeOperateType(scope.row.operType) }}</span>
                    </template>    
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="40"
                    @size-change="" @current-change="" />
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

// 定义表格数据
interface Log {
    operAdminName: string
    operTime: string
    college: string
    contact: string
    operType: number
}

//学院列表
const collegeList = reactive([
    {
        label: '计算机科学与工程学院',
        value: '1'
    }
]);

//操作列表
const operateList = reactive([
    {
        label: '进行审核工作',
        value: '1'
    },
    {
        label: '劳动计划内容修改',
        value: '2'
    }
]);

function judgeOperateType(type){
    if(type === 1){
        return '进行审核工作';
    }else
        return '劳动计划内容修改';
}

// 搜索表单
function handleQuery(){
  
}

// 重置表单
function resetQuery(){
  formInline.time = []
  formInline.operate = ''
  formInline.college = ''
}

const logList = reactive<Array<Log>>([
    {
        operAdminName: 'cc',
        operTime: '2023-8-14',
        college: '计算机科学与工程学院',
        contact: '15616591710',
        operType: 1,
    },{
        operAdminName: 'cc',
        operTime: '2023-8-14',
        college: '计算机科学与工程学院',
        contact: '15616591710',
        operType: 2,
    },
])

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = reactive([10, 20, 30, 50]);

// 表单数据
const formInline = reactive({
    time: [],
    operate: '',
    college: '',
    pageNum: currentPage, //当前页码
    pageSize, //页码显示数
})

/*
* 数据初始化
* */
onMounted(() => {

})
</script>
  
<style scoped></style>