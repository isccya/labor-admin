<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules">
                <el-form-item label="院系">
                    <el-select v-model="formInline.college" placeholder="请选择院系" clearable @change="getManagerList">
                        <el-option v-for="items in collegeList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addManager">添加管理员</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="序号" width="50" type="index" align="center" />
                <el-table-column prop="address" label="姓名" align="center" />
                <el-table-column prop="name" label="等级" align="center" />
                <el-table-column prop="name" label="院系" align="center" />
                <el-table-column prop="name" label="联系方式" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="warning" @click="">
                            修改
                        </el-button>
                        <el-button type="warning" @click="" v-if="scope.row.isEdit">
                            完成
                        </el-button>
                        <el-button type="danger" @click="DeleteManager(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper" :total="40"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>

        <div>
            <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
                <span>This is a message</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">
                            添加
                        </el-button>
                    </span>
                </template>
            </el-dialog>
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
function addManager(){
    dialogVisible.value = true;
}
function getManagerList() {
    alert(123);
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
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
    pageNum: currentPage, //当前页码
    pageSize, //页码显示数
})
const dialogVisible = ref(false)

onMounted(() => {

})
</script>
  
<style scoped></style>