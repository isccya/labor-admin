<template>
    <div class="app-container">
        <div class="h-15 flex justify-between items-center border rounded-lg">
            <div class="p-3 ml-3">
                <span>学期: </span>
                <el-select v-model="searchLaborRecord.termId" placeholder="请选择学期" @change="queryLaborRecord" clearable>
                    <el-option v-for="items in termList" :label="items.termName" :value="items.termId" />
                </el-select>
            </div>
            <div class="font-bold w-300 flex">
                <div class="px-5"><span>姓名: {{ userInfo.studentName }}</span></div>
                <div class="px-5"> <span>学院: {{ userInfo.collegeName }}</span></div>
                <div class="px-5"><span>年级: {{ userInfo.grade }}</span></div>
                <div class="px-5"> <span>班级: {{ userInfo.className }}</span></div>
                <div class="px-5"><span>学号: {{ userInfo.studentId }}</span></div>
                <div class="px-5"><span>成绩: {{ userInfo.score }} <span v-if="!userInfo.score"> 无</span> </span></div>
            </div>
            <div class="mr-10">
                <el-button type="primary" @click="clickScore(userInfo.studentId)">评分</el-button>
            </div>
            <el-page-header @back="goBack()">
                <template #content>
                    <span class="text-large font-600"> 劳动详情 </span>
                </template>
            </el-page-header>
        </div>

        <div class="border mt-5 h-170 ">
            <el-menu mode="horizontal" :default-active="activeIndex" :ellipsis="false" @select="handleSelect">
                <el-menu-item index="">全部</el-menu-item>
                <el-menu-item index="1">日常劳动记录</el-menu-item>
                <el-menu-item index="2">集中实践劳动记录</el-menu-item>
                <el-menu-item index="3">社会实践劳动记录</el-menu-item>
                <el-menu-item index="4">其他劳动记录</el-menu-item>
            </el-menu>
            <div class="p-2">
                <el-table :data="recordList" border v-loading="loading">
                    <el-table-column prop="date" label="类型" align='center'>
                        <template #default="scope">
                            {{ laborType(scope.row.typeId) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="termName" label="学期" align='center' />
                    <el-table-column prop="laborDate" label="劳动时间" align='center' />
                    <el-table-column prop="address" label="操作" align='center'>
                        <template #default>
                            <el-button type="primary">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"
                    :total="total" @size-change="queryLaborRecord" @current-change="queryLaborRecord" />
            </div>
        </div>
        <Score ref="score" @updateAuditDetail="updateAuditDetail" />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { UserInfo } from '../audit/type'
import { TermList } from '../laborPlan/type';
import useBasicInfoStore from '../../store/modules/basicInfo';
import Score from './components/Score.vue'
import { getLaborDetail, getLaborRecordList } from '../../api/audit';

const score :any = ref(null);

// 路由跳回
const router = useRouter();
function goBack() {
    router.push({
        name: 'Audit',
    })
    localStorage.removeItem('userInfo');
}

const basicInfoStore = useBasicInfoStore();

// 个人信息
const userInfo = reactive<UserInfo>(JSON.parse(localStorage.getItem('userInfo')));

//学期列表
const termList = reactive<Array<TermList>>([]);

const laborType = (index) => {
    if (index === 1) return '日常劳动记录'
    else if (index === 2) return '集中实践劳动记录'
    else if (index === 3) return '社会实践劳动记录'
    else if (index === 4) return '其他劳动记录'
}

// 选择劳动类型
const activeIndex = ref("")
function handleSelect(index) {
    searchLaborRecord.typeId = index;
    queryLaborRecord();
}

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = reactive([10, 20, 30, 50]);

// 查询个人劳动信息参数
const searchLaborRecord = reactive({
    studentId: userInfo.studentId,
    termId: '',
    typeId: '',
    current: currentPage,
    size: pageSize,
})

// 劳动记录数据
const loading = ref(false);
const total = ref(0);
const recordList: any = reactive([]);

function queryLaborRecord() {
    loading.value = true;
    getLaborRecordList(searchLaborRecord).then((res) => {
        recordList.length = 0;
        total.value = res.data.total;
        recordList.push(...res.data.dataList);
        loading.value = false;
    })
}

// 评分
function clickScore(id){
    score.value.scoreVisible = true;
    score.value.deliverStudentId(id);
}

function updateAuditDetail(score){
    userInfo.score = score;
    console.log(userInfo);
    localStorage.clear();
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
}

onMounted(() => {
    basicInfoStore.getTermList(termList);
    queryLaborRecord();
})
</script>
  
<style scoped></style>

