<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="院系">
                    <el-select v-model="formInline.college" placeholder="请选择院系" clearable>
                        <el-option v-for="items in collegeList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="学期">
                    <el-select v-model="formInline.term" placeholder="请选择学期" clearable>
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
            <el-button type="primary" @click="addNoticePlan">新建公告</el-button>
        </div>

        <div>
            <el-table :data="noticeList" stripe style="width: 100%">
                <el-table-column label="序号" width="50" type="index" align="center" />
                <el-table-column prop="name" label="公告标题" align="center" />
                <el-table-column prop="address" label="学院" align="center" />
                <el-table-column prop="name" label="学期" align="center" />
                <el-table-column prop="name" label="主管老师" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button text type="primary">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="40"
                    @size-change="" @current-change="" />
            </div>
        </div>

        <div>
            <el-dialog v-model="dialogVisible" title="劳动计划" width="60%" before-close="">
                <el-form :model="noticeForm" label-width="120px" inline rules="">
                    <div style="font-size: 20px;margin-bottom: 20px">
                        <span class="svg"><el-icon>
                                <Avatar />
                            </el-icon></span>
                        <span>基本信息</span>
                    </div>
                    <el-form-item label="学期">
                        <el-select v-model="noticeForm.term" placeholder="请选择学期">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="面向院系">
                        <el-select v-model="noticeForm.college" placeholder="请选择院系">
                            <el-option label="计算机科学与工程学院" value="1" />
                            <el-option label="土木工程学院" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指导老师">
                        <el-input v-model="noticeForm.mentorName" placeholder="请输入" class="w-55" />
                    </el-form-item>
                    <div style="font-size: 20px;margin-bottom: 10px">
                        <span class="svg"><el-icon>
                                <List />
                            </el-icon></span>
                        <span>通知内容</span>
                    </div>
                    <el-form-item label="通知内容" class="w-1/1">
                        <el-input v-model="noticeForm.textarea" :rows="24" type="textarea" placeholder="请输入通知内容"
                            :autosize="{ minRows: 6, maxRows: 12 }" class="" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">
                            添加公告
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { TermList } from '../laborPlan/type';
import useBasicInfoStore from '../../store/modules/basicInfo';

const basicInfoStore = useBasicInfoStore();

//学院列表
const collegeList = reactive([
    {
        label: '计算机科学与工程学院',
        value: '1'
    }
]);

//学期列表
const termList = reactive<Array<TermList>>([]);

const noticeList = [
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10)
const pageSizes = reactive([10, 20, 30, 50])

// 搜索表单数据
const formInline = reactive({
    college: '',
    term: '',
    pageNum: currentPage, //当前页码
    pageSize, //页码显示数
})

// 搜索表单
function handleQuery() {

}

// 重置表单
function resetQuery() {
    formInline.college = ''
    formInline.term = ''

}

const dialogVisible = ref(false)

function addNoticePlan() {
    dialogVisible.value = true;
}

// 通知表单
const noticeForm = reactive({
    college: '',
    term: '',
    mentorName: '',
    title: '',
    textarea: '',
})



onMounted(() => {
    basicInfoStore.getTermList(termList);
})
</script>
  
<style scoped></style>