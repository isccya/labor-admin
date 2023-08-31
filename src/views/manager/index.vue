<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="工号">
                    <el-select v-model="formInline.college" placeholder="请输入工号" clearable @change="getManagerList">
                        <el-option v-for="items in collegeList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="success" @click="clickAddManager">添加管理员</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="managerList" stripe style="width: 100%" border v-loading="loading">
                <el-table-column label="序号" width="60" type="index" align="center" />
                <el-table-column prop="userId" label="用户名" align="center" />
                <el-table-column prop="userName" label="姓名" align="center" />
                <el-table-column label="等级" align="center">
                    <template #default="scope">
                        {{ judgeAdminRole(scope.row.adminRole) }}
                    </template>
                </el-table-column>
                <el-table-column label="院系" align="center">
                    <template #default="scope">
                        <div v-if="scope.row.collegeName">{{ scope.row.collegeName }}</div>
                        <div v-else>湖南科技大学</div>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="warning" @click="">
                            修改
                        </el-button>
                        <el-button type="warning" @click="" v-if="scope.row.isEdit">
                            完成
                        </el-button>
                        <el-button type="danger" @click="clickDeleteManager(scope.row.userId)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"
                    :total="total" @size-change="" @current-change="" />
            </div>
        </div>

        <AddManager ref="addManager" @updateManager="queryManagerList" />
        <DeleteManager ref="deleteManager" @updateManager="queryManagerList" />

    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getManagerList } from '../../api/manager'
import AddManager from './components/AddManager.vue';
import DeleteManager from './components/DeleteManager.vue'

const addManager: any = ref(null);
const deleteManager: any = ref(null);

const managerList: any = reactive([]);
const total = ref(0);
const loading = ref(false);


// 分页数据 
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = reactive([10, 20, 30, 50])

const formInline = reactive({
    current: currentPage,
    size: pageSize,
})

function queryManagerList() {
    loading.value = true;
    getManagerList(formInline).then((res) => {
        managerList.length = 0;
        total.value = res.data.total;
        managerList.push(...res.data.dataList);
        loading.value = false;
    })
}

function judgeAdminRole(val) {
    if (val === 1)
        return '院级';
    else
        return '校级';
}

function clickAddManager() {
    addManager.value.addManagerVisble = true;
}

function clickDeleteManager(userId) {

}

onMounted(() => {
    queryManagerList();
})
</script>
  
<style scoped></style>