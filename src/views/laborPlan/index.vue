<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="等级">
                    <el-select v-model="formInline.planRank" placeholder="请选择等级" clearable>
                        <el-option v-for="items in levelList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="学期">
                    <el-select v-model="formInline.termId" placeholder="请选择学期" clearable>
                        <el-option v-for="items in termList" :label="items.termName" :value="items.termId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="院系">
                    <el-select v-model="formInline.collegeId" placeholder="请选择院系" clearable>
                        <el-option v-for="items in collegeList" :label="items.collegeName" :value="items.collegeId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select v-model="formInline.grade" placeholder="请选择年级" clearable>
                        <el-option v-for="items in gradeList" :label="items" :value="items" />
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
            <el-table :data="tableData" stripe style="width: 100%" border v-loading="loading">
                <el-table-column label="序号" width="60" type="index" align="center" />
                <el-table-column prop="planRank" label="等级" align="center">
                    <template #default="scope">
                        {{ judgePlanRank(scope.row.planRank) }}
                    </template>
                </el-table-column>
                <el-table-column prop="collegeName" label="学院" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.collegeName">{{ scope.row.collegeName }}</span>
                        <span v-else>湖南科技大学</span>
                    </template>
                </el-table-column>
                <el-table-column prop="grade" label="年级" align="center" />
                <el-table-column prop="termName" label="学期" align="center" />
                <el-table-column prop="advisor" label="指导老师" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button text type="primary" @click="clickDetailLaborPlan(scope.row)">查看详情</el-button>
                        <el-button text type="danger" @click="clickDeleteLaborPlan(scope.row.planId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"
                    :total="total" @size-change="queryLaborPlan" @current-change="queryLaborPlan" />
            </div>
        </div>

        <AddLaborPlan ref="addLaborPlan" @updateLaborPlan="queryLaborPlan" />
        <DetailLaborPlan ref="detailLaborPlan" @updateLaborPlan="queryLaborPlan" />
        <DeleteLaborPlan ref="deleteLaborPlan" @updateLaborPlan="queryLaborPlan" />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AddLaborPlan from './components/AddLaborPlan.vue';
import DetailLaborPlan from './components/DetailLaborPlan.vue';
import DeleteLaborPlan from './components/DeleteLaborPlan.vue'
import type { CollegeList, LaborPlan, TermList } from './type';
import { getLaborPlanList } from '../../api/laborPlan';
import useBasicInfoStore from '../../store/modules/basicInfo';

const addLaborPlan: any = ref(null);
const detailLaborPlan: any = ref(null);
const deleteLaborPlan: any = ref(null);

const basicInfoStore = useBasicInfoStore();

// 判断劳动计划等级
function judgePlanRank(planRank) {
    if (planRank === 0)
        return '院级';
    else
        return '校级';
}

// 等级列表
const levelList = reactive([
    {
        label: '院级',
        value: 0
    },
    {
        label: '校级',
        value: 1
    },
])

// 学期列表
const termList = reactive<Array<TermList>>([])

//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

//年级列表
const gradeList = reactive([]);

const loading = ref(false);
let tableData = reactive<Array<LaborPlan>>([])

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10)
const pageSizes = reactive([10, 20, 30, 50])
const total = ref(0);

// 搜索表单项
const formInline = reactive({
    planRank: '',
    termId: '',
    collegeId: '',
    grade: '',
    current: currentPage, //当前页码
    size: pageSize, //页码显示数
})

// 获取劳动计划列表
function queryLaborPlan() {
    loading.value = true;
    getLaborPlanList(formInline).then((res) => {
        total.value = res.data.total;
        tableData.length = 0;
        tableData.push(...res.data.dataList);
        loading.value = false;
    })
}

// 搜索表单
function handleQuery() {
    queryLaborPlan();
}

// 重置表单
function resetQuery() {
    formInline.termId = ''
    formInline.collegeId = ''
    formInline.grade = ''
    formInline.planRank = ''
}

function clickAddLaborPlan() {
    addLaborPlan.value.addLaborVisible = true
    if (addLaborPlan.value.termList.length === 0) {
        addLaborPlan.value.termList.push(...termList);
    }
    if (addLaborPlan.value.gradeList.length === 0) {
        addLaborPlan.value.gradeList.push(...gradeList);
    }
    if (addLaborPlan.value.collegeList.length === 0) {
        addLaborPlan.value.collegeList.push(...collegeList);
    }
}

function clickDetailLaborPlan(laborPlanInfo) {
    if (detailLaborPlan.value.termList.length === 0) {
        detailLaborPlan.value.termList.push(...termList);
    }
    if (detailLaborPlan.value.gradeList.length === 0) {
        detailLaborPlan.value.gradeList.push(...gradeList);
    }
    if (detailLaborPlan.value.collegeList.length === 0) {
        detailLaborPlan.value.collegeList.push(...collegeList);
    }
    detailLaborPlan.value.deliverLaborPlanForm(laborPlanInfo);
    detailLaborPlan.value.detailLaborVisable = true;
}

function clickDeleteLaborPlan(id) {
    deleteLaborPlan.value.deleteLaborVisable = true;
    deleteLaborPlan.value.deleteId = id;
}


onMounted(() => {
    queryLaborPlan();
    basicInfoStore.getTermList(termList);
    basicInfoStore.getCollegeList(collegeList);
    basicInfoStore.getGradeList(gradeList);
})
</script>
  
<style scoped></style>