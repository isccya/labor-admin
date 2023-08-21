<template>
    <div class="app-container">
        <div class="h-15 flex justify-between items-center border rounded-lg">
            <div class="p-3 ml-3">
                <span>学期: </span>
                <el-select v-model="searchLaborInfo.term" placeholder="请选择学期">
                    <el-option v-for="items in termList" :label="items.label" :value="items.value" />
                </el-select>
            </div>
            <div class="font-bold w-300 flex">
                <div class="px-5"><span>姓名: {{ userInfo.name }}</span></div>
                <div class="px-5"> <span>学院: {{ userInfo.college }}</span></div>
                <div class="px-5"><span>年级: {{ userInfo.grade }}</span></div>
                <div class="px-5"> <span>班级: {{ userInfo.class }}</span></div>
                <div class="px-5"><span>学号: {{ userInfo.studentNo }}</span></div>
                <div class="px-5"><span>成绩: {{ userInfo.score }}</span></div>
            </div>
            <div class="mr-10">
                <el-button type="primary">评分</el-button>
            </div>
            <el-page-header @back="goBack()">
                <template #content>
                    <span class="text-large font-600"> 劳动详情 </span>
                </template>
            </el-page-header>
        </div>

        <div class="border mt-5 h-170 ">
            <el-menu mode="horizontal" :default-active="activeIndex" :ellipsis="false" @select="handleSelect">
                <el-menu-item index="0">全部</el-menu-item>
                <el-menu-item index="1">日常劳动记录</el-menu-item>
                <el-menu-item index="2">集中实践劳动记录</el-menu-item>
                <el-menu-item index="3">其他劳动记录</el-menu-item>
                <el-menu-item index="4">社会实践劳动记录</el-menu-item>
            </el-menu>
            <div class="p-2" >
                <el-table :data="tableData"  border >
                <el-table-column prop="date" label="类型"  align = 'center'/>
                <el-table-column prop="date" label="学期" align = 'center' />
                <el-table-column prop="date" label="劳动时间" align = 'center' />
                <el-table-column prop="address" label="操作" align = 'center'>
                    <template #default>
                        <el-button type="primary">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { UserInfo } from '../type'

const router = useRouter();

//学期列表
const termList = reactive([
    {
        label: '2020-2021上半年',
        value: '1'
    }
]);

// 查询个人劳动信息参数
const searchLaborInfo = reactive({
    term: '',
    laborType: '',
})

// 个人信息
const userInfo = reactive<UserInfo>({
    name: 'cc',
    college: '计算机科学与工程学院',
    grade: '2021级',
    class: '信息安全三班',
    studentNo: '2105030305',
    score: 1,
})

function goBack() {
    router.push({
        name: 'Audit'
    })
}

// 默认展示的组件
const activeIndex = ref("0")


function handleSelect() {

}

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
  },
]

defineExpose({

})
</script>
  
<style scoped>
</style>