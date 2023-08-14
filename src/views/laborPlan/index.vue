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
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="pb-3">
            <el-button type="primary" @click="addLaborPlan">添加劳动计划</el-button>
        </div>

        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column label="序号" width="50" type="index" align="center" />
                <el-table-column prop="address" label="学院" align="center" />
                <el-table-column prop="name" label="年级" align="center" />
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
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>

        <div>
            <el-dialog v-model="dialogVisible" title="劳动计划" width="60%" :before-close="handleClose">
                <el-form :model="laborPlanForm" label-width="120px" inline :rules="rules">
                    <div class="title-details" style="font-size: 20px;margin-bottom: 20px">
                        <span class="svg"><el-icon>
                                <Avatar />
                            </el-icon></span>
                        <span>基本信息</span>
                    </div>
                    <el-form-item label="劳动计划等级">
                        <el-select v-model="laborPlanForm.level" placeholder="请选择劳动计划等级">
                            <el-option label="校级" value="1" />
                            <el-option label="院级" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select v-model="laborPlanForm.term" placeholder="请选择学期">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院系">
                        <el-select v-model="laborPlanForm.college" placeholder="请选择院系"
                            :disabled="judgeCollegeLaborLevel(laborPlanForm.level)">
                            <el-option label="计算机科学与工程学院" value="1" />
                            <el-option label="土木工程学院" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select v-model="laborPlanForm.grade" placeholder="请选择年级">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指导老师">
                        <el-input v-model="laborPlanForm.mentorName" placeholder="请输入" class="w-55" />
                    </el-form-item>
                    <el-form-item label="期限">
                        <el-date-picker v-model="laborPlanForm.deadline" type="date" placeholder="请选择期限" />
                    </el-form-item>
                    <div style="font-size: 20px;margin-bottom: 10px">
                        <span class="svg"><el-icon>
                                <List />
                            </el-icon></span>
                        <span>劳动内容</span>
                    </div>
                    <div class="pb-3">
                        <span style="color: red">注意:</span> <span> 院级劳动记录条数不得少于校级</span>
                    </div>
                    <div>
                        <el-form-item label="日常劳动记录" label-width="200px">
                            <el-input v-model="laborPlanForm.dailyLabor" />
                        </el-form-item>
                        <el-form-item label="集中实践劳动记录" label-width="200px">
                            <el-input v-model="laborPlanForm.collectiveLabor" />
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="社会实践劳动记录" label-width="200px">
                            <el-input v-model="laborPlanForm.societyLabor" />
                        </el-form-item>

                        <el-form-item label="其他劳动记录" label-width="200px">
                            <el-input v-model="laborPlanForm.otherLabor" />
                        </el-form-item>
                    </div>
                </el-form>
                <template #footer>
                    <span>
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">
                            添加劳动计划
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
//年级列表
const gradeList = reactive([
    {
        label: '2020级',
        value: '1'
    }
]);
const tableData = [
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

}
const dialogVisible = ref(false)
function addLaborPlan() {
    dialogVisible.value = true;
}
const laborPlanForm = reactive({
    level: '',//劳动计划等级
    college: '',
    term: '',
    grade: '',
    mentorName: '',//指导老师
    mentor: '',//指导老师工号
    deadline: '',//期限
    dailyLabor: '',
    collectiveLabor: '',
    societyLabor: '',
    otherLabor: '',
})
// 表单检验规则
// const rules = reactive({
//     level: [
//         {
//             required: true,
//             message: 'Please select Activity zone',
//             trigger: 'change',
//         }
//     ],
//     college: [
//         {
//             required: true,
//             message: 'Please select Activity zone',
//             trigger: 'change',
//         }
//     ],
//     level: [
//         {
//             required: true,
//             message: 'Please select Activity zone',
//             trigger: 'change',
//         }
//     ],
//     term: [
//         {
//             required: true,
//             message: 'Please select Activity zone',
//             trigger: 'change',
//         }
//     ],
//     dailyLabor: [{ required: true, message: '请输入日常劳动次数', trigger: 'change' }],
//     collectiveLabor: [{ required: true, message: '请输入集体劳动次数', trigger: 'blur' }],
//     otherLabor: [{ required: true, message: '请其他劳动次数', trigger: 'blur' }],
//     societyLabor: [{ required: true, message: '请社会实践劳动次数', trigger: 'blur' }],
// })
function judgeCollegeLaborLevel(level) {
    if (level === '1') {
        // 如果是校级
        laborPlanForm.term = '';
        return true;
    } else
        return false;
}
onMounted(() => {

})
</script>
  
<style scoped></style>