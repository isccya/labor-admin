<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules">
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
                <el-form-item label="专业">
                    <el-select v-model="formInline.major" placeholder="请选择专业" clearable>
                        <el-option v-for="items in majorList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="address" label="姓名" align="center" />
                <el-table-column prop="name" label="年级" align="center" />
                <el-table-column prop="name" label="班级" align="center" />
                <el-table-column prop="name" label="联系方式" align="center" />
                <el-table-column prop="name" label="院系" align="center" />
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="40"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, reactive, ref } from 'vue'
//学院列表
const collegeList = reactive([
    {
        label: '计算机科学与工程学院',
        value: '1'
    }
]);
//年级列表
const gradeList = reactive([
    {
        label: '2020级',
        value: '1'
    }
]);
// 专业列表
const majorList = reactive([
    {
        label: '信息安全',
        value: "1"
    }
])
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
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
const currentPage = ref(1);//当前所在页面数
const pageSize = ref(10)//每页内容数
const pageSizes = reactive([10, 20, 30, 50])//可选择每页展示的内容数
const formInline = reactive({
    college: '',
    grade: '',
    major: '',
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
    formInline.major = ''

}
onMounted(() => {

})
</script>
  
<style scoped></style>