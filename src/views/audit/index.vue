<template>
  <div class="app-container">
    <div class="flex">
      <el-form :inline="true" :model="formInline">
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
        <el-form-item label="状态">
          <el-select v-model="formInline.checked" placeholder="请选择状态" clearable>
            <el-option v-for="item in stateList" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="pb-3">
      <el-button type="primary" @click="clickOneExport">一键导出</el-button>
      <el-button type="success" @click="clickOneScore">一键评分</el-button>
    </div>

    <div>
      <el-table :data="tableData" stripe style="width: 100%" border v-loading="loading" ref="multipleTableRef"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" width="60" type="index" align="center" />
        <el-table-column prop="studentName" label="姓名" align="center" />
        <el-table-column prop="collegeName" label="学院" align="center" />
        <el-table-column prop="grade" label="年级" align="center" />
        <el-table-column prop="className" label="班级" align="center" />
        <el-table-column label="审核状态" align="center">
          <template #default="scope">
            <div v-if="scope.row.checked === 1">
              <el-tag size="large">已审核</el-tag>
            </div>
            <div v-else>
              <el-tag type="danger" size="large">待审核</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button v-if="scope.row.isConfirm === 1" type="primary">修改</el-button>
            <el-button v-else type="primary" @click="jumpToDetail(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end p-5">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" v-model:page-sizes="pageSizes"
          background layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="queryAuditList"
          @current-change="queryAuditList" />
      </div>
    </div>

    <OneScore ref="oneScore" @updateAuditList="queryAuditList" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from "element-plus";
import type { LaborList } from './type'
import type { CollegeList } from '../laborPlan/type';
import type { ClassList } from '../student/type'
import { ElTable } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import useBasicInfoStore from '../../store/modules/basicInfo';
import { getClassList } from '../../api/basicInfo';
import { getAuditList } from '../../api/audit'
import OneScore from './components/OneScore.vue'
import { exportLaborScore } from '../../api/audit';
import { number } from 'echarts';

const oneScore: any = ref(null);

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const basicInfoStore = useBasicInfoStore();

const router = useRouter();
const route = useRoute();
function jumpToDetail(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  router.push({
    name: "Detail",
    query: {
      collegeId: formInline.collegeId,
      grade: formInline.grade,
      classId: formInline.classId,
      checked: formInline.checked,
      current: formInline.current,
      size: formInline.size,
    }
  })
}

//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

//年级列表
const gradeList = reactive([]);

// 班级列表
const classList = reactive<Array<ClassList>>([]);

//状态列表
const stateList = reactive([
  {
    label: '待审核',
    value: 0,
  }, {
    label: '已审核',
    value: 1,
  },
]);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizes = reactive([10, 20, 30, 50]);

let formInline: any = reactive({
  collegeId: '',
  grade: '',
  classId: '',
  checked: '',
  current: currentPage,
  size: pageSize,
});

(function () {
  if (route.query.current !== undefined) {
    formInline.collegeId = route.query.collegeId;
    formInline.grade = route.query.grade;
    formInline.classId = route.query.classId;
    formInline.checked = route.query.checked;
    formInline.current = route.query.current;
    currentPage.value = parseInt(formInline.current);
    formInline.size = route.query.size;
    pageSize.value = parseInt(formInline.size);
  }
})()

const loading = ref(false);
const total = ref(0);
const tableData = reactive<Array<LaborList>>([]);

const classForm = computed(() => {
  return {
    collegeId: formInline.collegeId,
    grade: formInline.grade,
  }
});

// 获取班级列表
function queryClassList() {
  getClassList(classForm.value).then((res) => {
    classList.length = 0;
    classList.push(...res.data);
  })
}
watch(classForm, () => {
  formInline.classId = '';
  queryClassList();
});

function queryAuditList() {
  loading.value = true;
  getAuditList(formInline).then((res) => {
    tableData.length = 0;
    total.value = res.data.total;
    tableData.push(...res.data.dataList);
    loading.value = false;
  });
}

// 搜索表单
function handleQuery() {
  queryAuditList();
}

// 重置表单
function resetQuery() {
  formInline.collegeId = ''
  formInline.grade = ''
  formInline.classId = ''
  formInline.checked = ''
}

// 一键导出
function clickOneExport() {
  if (formInline.collegeId === "") {
    ElMessage.error("请选择院系后再导出！！！");
    return;
  }
  if (formInline.grade === "") {
    ElMessage.error("请选择年级后再导出！！！");
    return;
  }
  if (formInline.classId === "") {
    ElMessage.error("请选择班级后再导出！！！");
    return;
  }
  exportLaborScore({
    collegeId: formInline.collegeId,
    grade: formInline.grade,
    classId: formInline.classId,
  }).then((res) => {
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
    const a = document.createElement('a') // 转换完成，创建一个a标签用于下载
    a.download = `劳动成绩单.xls`
    a.href = window.URL.createObjectURL(blob)
    a.click()
    a.remove()
  })
}

// 一键评分
let selectionScore = reactive([]);
function handleSelectionChange(selection) {
  selectionScore = selection;
}
function clickOneScore() {
  if (selectionScore.length === 0) {
    ElMessage({
      message: '请选择要评分的学生',
      type: 'error',
    })
    return;
  }
  oneScore.value.scoreVisible = true;
  const fields = selectionScore.map((items: any) => {
    return items.studentId;
  })
  oneScore.value.deliverStudentId(fields);
}

onMounted(() => {
  basicInfoStore.getCollegeList(collegeList);
  basicInfoStore.getGradeList(gradeList);
  queryClassList();
  queryAuditList();
})
</script>

<style scoped></style>