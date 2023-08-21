<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="等级">
                    <el-select v-model="formInline.level" placeholder="请选择等级" clearable>
                        <el-option v-for="items in levelList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="院系">
                    <el-select v-model="formInline.college" placeholder="请选择院系" clearable>
                        <el-option v-for="items in collegeList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="formInline.grade" placeholder="请选择年级" clearable>
                        <el-option v-for="items in gradeList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="pb-3">
            <el-button type="primary" @click="clickAddLaborPlan()">添加劳动计划</el-button>
        </div>

        <div>
            <el-table :data="tableData" stripe style="width: 100%" border>
                <el-table-column label="序号" width="60" type="index" align="center" />
                <el-table-column prop="level" label="等级" align="center" />
                <el-table-column prop="college" label="学院" align="center" />
                <el-table-column prop="grade" label="年级" align="center" />
                <el-table-column prop="term" label="学期" align="center" />
                <el-table-column prop="mentorName" label="指导老师" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button text type="primary" @click="clickDetailLaborPlan">查看详情</el-button>
                        <el-button text type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="40"
                    @size-change="" @current-change="" />
            </div>
        </div>

        <AddLaborPlan ref="addLaborPlan" />
        <DetailLaborPlan ref="detailLaborPlan"></DetailLaborPlan>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AddLaborPlan from './components/AddLaborPlan.vue';
import DetailLaborPlan from './components/DetailLaborPlan.vue';
import type { LaborPlan } from './type';

const addLaborPlan: any = ref(null);
const detailLaborPlan: any = ref(null);

// 等级列表
const levelList = reactive([
{
        label: '校级',
        value: '0'
    },
    {
        label: '院级',
        value: '1'
    },
])

//学院列表
const collegeList = reactive([
    {
        label: '全部',
        value: '0'
    },
    {
        label: '计算机科学与工程学院',
        value: '1'
    },
    {
        label: '土木学院',
        value: '2'
    }
]);

//年级列表
const gradeList = reactive([
    {
        label: '2020级',
        value: '1'
    }
]);

const tableData = reactive<Array<LaborPlan>>([
    {
        level: '校级',
        college: '湖南科技大学',
        grade: "2021级",
        term: '2021-2022上学期',
        mentorName: 'cc'
    },
    {
        level: '院级',
        college: '计算机科学与工程学院',
        grade: "2021级",
        term: '2021-2022上学期',
        mentorName: 'cc'
    },
    {
        level: '院级',
        college: '计算机科学与工程学院',
        grade: "2021级",
        term: '2021-2022上学期',
        mentorName: 'cc'
    },
    {
        level: '院级',
        college: '计算机科学与工程学院',
        grade: "2021级",
        term: '2021-2022上学期',
        mentorName: 'cc'
    }
])

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10)
const pageSizes = reactive([10, 20, 30, 50])

// 搜索表单
const formInline = reactive({
    level:'',
    college: '',
    grade: '',
    pageNum: currentPage, //当前页码
    pageSize, //页码显示数
})

// 搜索表单
function handleQuery() {

}

// 重置表单
function resetQuery() {
    formInline.college = ''
    formInline.grade = ''
    formInline.level = ''

}

function clickAddLaborPlan() {
    addLaborPlan.value.addLaborVisible = true
}

function clickDetailLaborPlan() {
    detailLaborPlan.value.detailLaborVisable = true;
    detailLaborPlan.value.deliverLaborPlanForm();
}



onMounted(() => {

})
</script>
  
<style scoped></style>