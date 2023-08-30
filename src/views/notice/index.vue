<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="院系">
                    <el-select v-model="formInline.collegeId" placeholder="请选择院系" clearable>
                        <el-option v-for="items in collegeList" :label="items.collegeName" :value="items.collegeId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="学期">
                    <el-select v-model="formInline.termId" placeholder="请选择学期" clearable>
                        <el-option v-for="items in termList" :label="items.termName" :value="items.termId" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="pb-3">
            <el-button type="primary" @click="clickAddNoticePlan()">新建公告</el-button>
        </div>

        <div>
            <el-table :data="laborNoticeList" v-loading="loading" stripe style="width: 100%" border>
                <el-table-column label="序号" width="60" type="index" align="center" />
                <el-table-column prop="title" label="公告标题" align="center" />
                <el-table-column label="公告时间" align="center">
                    <template #default="scope">
                        {{ timeFormate(scope.row.updateTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="termName" label="学期" align="center" />
                <el-table-column prop="collegeName" label="学院" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.collegeName">{{ scope.row.collegeName }}</span>
                        <span v-else>湖南科技大学</span>
                    </template>
                </el-table-column>
                <el-table-column prop="advisor" label="主管老师" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button text type="primary" @click="clickDetailNoticePlan(scope.row)">查看详情</el-button>
                        <el-button text type="danger" @click="clickDeleteNoticePlan(scope.row.noticeId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="total"
                    @size-change="queryLaborNotice" @current-change="queryLaborNotice" />
            </div>
        </div>

        <AddLaborNotice ref="addLaborNotice" @updateLaborNotice="queryLaborNotice" />
        <DeleteLaborNotice ref="deleteLaborNotice" @updateLaborNotice="queryLaborNotice" />
        <DetailLaborNotice ref="detailLaborNotice" @updateLaborNotice="queryLaborNotice" />

    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { CollegeList, TermList } from '../laborPlan/type';
import useBasicInfoStore from '../../store/modules/basicInfo';
import { getLaborNoticeList } from '../../api/laborNotice';
import { timeFormate } from '../../utils/formate.js';
import AddLaborNotice from './components/AddLaborNotice.vue';
import DeleteLaborNotice from './components/DeleteLaborNotice.vue'
import DetailLaborNotice from './components/DetailLaborNotice.vue'


const addLaborNotice: any = ref(null);
const deleteLaborNotice: any = ref(null);
const detailLaborNotice: any = ref(null);

const basicInfoStore = useBasicInfoStore();

//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

//学期列表
const termList = reactive<Array<TermList>>([]);

const loading = ref(false);
const total = ref(0);
const laborNoticeList: any = reactive([]);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10)
const pageSizes = reactive([10, 20, 30, 50])

// 搜索表单数据
const formInline = reactive({
    collegeId: '',
    termId: '',
    current: currentPage,
    size: pageSize,
})

function queryLaborNotice() {
    loading.value = true;
    getLaborNoticeList(formInline).then((res) => {
        laborNoticeList.length = 0;
        total.value = res.data.total;
        laborNoticeList.push(...res.data.dataList);
        loading.value = false;
    })
}

// 搜索表单
function handleQuery() {
    queryLaborNotice();
}

// 重置表单
function resetQuery() {
    formInline.collegeId = ''
    formInline.termId = ''

}

function clickAddNoticePlan() {
    if (addLaborNotice.value.termList.length === 0) {
        addLaborNotice.value.termList.push(...termList);
    }
    if (addLaborNotice.value.collegeList.length === 0) {
        addLaborNotice.value.collegeList.push(...collegeList);
    }
    addLaborNotice.value.addLaborNoticeVisible = true;
}

function clickDeleteNoticePlan(id) {
    deleteLaborNotice.value.deleteLaborNoticeVisable = true;
    deleteLaborNotice.value.deleteId = id;
}

function clickDetailNoticePlan(laborNoticeInfo) {
    if (detailLaborNotice.value.termList.length === 0) {
        detailLaborNotice.value.termList.push(...termList);
    }
    if (detailLaborNotice.value.collegeList.length === 0) {
        detailLaborNotice.value.collegeList.push(...collegeList);
    }
    detailLaborNotice.value.detailLaborNoticeVisible = true;
    detailLaborNotice.value.deliverLaborNoticeForm(laborNoticeInfo);
}




onMounted(() => {
    basicInfoStore.getCollegeList(collegeList);
    basicInfoStore.getTermList(termList);
    queryLaborNotice();
})
</script>
  
<style scoped></style>