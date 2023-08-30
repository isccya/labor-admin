<template>
    <div class="app-container">

        <div class="flex">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
                <el-form-item label="班级">
                    <el-select v-model="formInline.classId" placeholder="请选择班级" clearable>
                        <el-option v-for="items in classList" :label="items.className" :value="items.classId" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                    <el-button icon="Refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="studentList" v-loading="loading" stripe style="width: 100%" border>
                <el-table-column label="序号" width="60" type="index" align="center" />
                <el-table-column prop="studentName" label="姓名" align="center" />
                <el-table-column prop="collegeName" label="院系" align="center" />
                <el-table-column prop="grade" label="年级" align="center" />
                <el-table-column prop="className" label="班级" align="center" />
                <el-table-column prop="phone" label="联系方式" align="center" />
                <el-table-column prop="studentId" label="学号" align="center" />

            </el-table>
            <div class="flex justify-end p-5">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    v-model:page-sizes="pageSizes" background layout="total, sizes, prev, pager, next, jumper"
                    :total="total" @size-change="queryStudentList" @current-change="queryStudentList" />
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref , watch} from 'vue'
import type { StudentList, ClassList } from './type';
import type { CollegeList } from '../laborPlan/type';
import { getStudentList } from '../../api/student';
import { getClassList } from '../../api/basicInfo'
import useBasicInfoStore from '../../store/modules/basicInfo';

const basicInfoStore = useBasicInfoStore();

//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

//年级列表
const gradeList = reactive([]);

// 班级列表
const classList = reactive<Array<ClassList>>([]);

const loading = ref(false);
const total = ref(0);
const studentList = reactive<Array<StudentList>>([]);

function queryStudentList() {
    loading.value = true;
    getStudentList(formInline).then((res) => {
        studentList.length = 0;
        total.value = res.data.total;
        studentList.push(...res.data.dataList);
        loading.value = false;
    })
}

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = reactive([10, 20, 30, 50]);

const formInline = reactive({
    collegeId: '',
    classId:'',
    grade: '',
    current: currentPage,
    size: pageSize, 
})

// 获取班级列表
function queryClassList(){
    const classForm = reactive({
        collegeId:formInline.collegeId,
        grade:formInline.grade,
    })
    getClassList(classForm).then((res)=>{
        classList.length = 0;
        classList.push(...res.data);
    })
}
watch(formInline,()=>{
    queryClassList();
})

// 搜索表单
function handleQuery() {
    queryStudentList();
}
// 重置表单
function resetQuery() {
    formInline.collegeId = ''
    formInline.grade = ''
    formInline.classId = ''

}
onMounted(() => {
    queryStudentList();
    queryClassList();
    basicInfoStore.getGradeList(gradeList);
    basicInfoStore.getCollegeList(collegeList);
})
</script>
  
<style scoped></style>