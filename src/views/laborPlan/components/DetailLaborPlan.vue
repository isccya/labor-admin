<template>
    <el-dialog v-model="detailLaborVisable" title="劳动计划" width="60%" before-close="">
        <el-form :model="laborPlanForm" ref="ruleFormRef" label-width="120px" inline :rules="rules">
            <div class="title-details" style="font-size: 20px;margin-bottom: 20px">
                <span class="svg"><el-icon>
                        <Avatar />
                    </el-icon></span>
                <span>基本信息</span>
            </div>
            <el-form-item label="劳动计划等级" prop="planRank">
                <el-select v-model="laborPlanForm.planRank" placeholder="请选择劳动计划等级">
                    <el-option v-for="items in levelList" :label="items.label" :value="items.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="院系" prop="collegeId">
                <el-select v-model="laborPlanForm.collegeId" placeholder="请选择院系"
                    :disabled="judgeCollegeLaborLevel(laborPlanForm.planRank)">
                    <el-option v-for="items in collegeList" :label="items.collegeName" :value="items.collegeId" />
                </el-select>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
                <el-select v-model="laborPlanForm.grade" placeholder="请选择年级">
                    <el-option v-for="items in gradeList" :label="items" :value="items" />
                </el-select>
            </el-form-item>
            <el-form-item label="学期" prop="termId">
                <el-select v-model="laborPlanForm.termId" placeholder="请选择学期">
                    <el-option v-for="items in termList" :label="items.termName" :value="items.termId" />
                </el-select>
            </el-form-item>
            <el-form-item label="指导老师" prop="advisor">
                <el-input v-model="laborPlanForm.advisor" placeholder="请填写指导老师" class="w-55" />
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker v-model="laborPlanForm.startTime" type="date" placeholder="请选择期限" />
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker v-model="laborPlanForm.endTime" type="date" placeholder="请选择期限" />
            </el-form-item>
            <div style="font-size: 20px;margin-bottom: 10px">
                <span class="svg"><el-icon>
                        <List />
                    </el-icon></span>
                <span>劳动内容</span>
            </div>
            <div class="pb-3">
                <span style="color: red">注意:</span> <span> 院级劳动记录条数不得少于校级,请先查看对应学期校级劳动计划数</span>
            </div>
            <div>
                <el-form-item label="日常劳动记录" label-width="200px" prop="dailyAmount">
                    <el-input v-model="laborPlanForm.dailyAmount" />
                </el-form-item>
                <el-form-item label="集中实践劳动记录" label-width="200px" prop="centralAmount">
                    <el-input v-model="laborPlanForm.centralAmount" />
                </el-form-item>
            </div>
            <div>
                <el-form-item label="社会实践劳动记录" label-width="200px" prop="societyAmount">
                    <el-input v-model="laborPlanForm.societyAmount" />
                </el-form-item>

                <el-form-item label="其他劳动记录" label-width="200px" prop="otherAmount">
                    <el-input v-model="laborPlanForm.otherAmount" />
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="detailLaborVisable = false">取消</el-button>
                <el-button type="primary" @click="changeLaborPlan(ruleFormRef)">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import type { CollegeList, LaborPlanForm, TermList } from '../type';
import { putLaborPlan } from '../../../api/laborPlan';

// 控制查看劳动计划表单展示
const detailLaborVisable = ref(false)

const emit = defineEmits(['updateLaborPlan'])

// 等级列表
const levelList = reactive([
    {
        label: '院级',
        value: 0
    },
    {
        label: '校级',
        value: 1
    },
])

// 学期列表
const termList = reactive<Array<TermList>>([])

//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

//年级列表
const gradeList = reactive([]);

let laborPlanForm = reactive<LaborPlanForm>({
    planId: '',
    planRank: '',
    collegeId: '',
    grade: '',
    termId: '',
    advisor: '',
    startTime: '',
    endTime: '',
    dailyAmount: 0,
    centralAmount: 0,
    societyAmount: 0,
    otherAmount: 0,
})

function judgeCollegeLaborLevel(level) {
    if (level === 1) {
        // 如果是校级
        laborPlanForm.collegeId = '';
        return true;
    } else
        return false;
}

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
    planRank: [{ required: true, message: '请选择劳动计划等级', trigger: 'change', },],
    collegeId: [
        {
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (value === '' && laborPlanForm.planRank === 0) {
                    callback(new Error('请选择院系'))
                } else
                    callback();
            }, trigger: 'change'
        }
    ],
    grade: [{ required: true, message: '请选择年级', trigger: 'change', }],
    termId: [{ required: true, message: '请选择学期', trigger: 'change', }],
    advisor: [{ required: true, message: '请填写指导老师', trigger: 'change', }],
    startTime: [{ required: true, message: '请选择开始时间', trigger: 'change', }],
    endTime: [{ required: true, message: '请选择结束时间', trigger: 'change', }],
    dailyAmount: [{ required: true, message: '请填写日常劳动记录数', trigger: 'change', }],
    centralAmount: [{ required: true, message: '请填写集中实践劳动记录数', trigger: 'change', }],
    societyAmount: [{ required: true, message: '请填写社会实践劳动记录数', trigger: 'change', }],
    otherAmount: [{ required: true, message: '请填写其他劳动记录数', trigger: 'change', }],
})

function changeLaborPlan(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            putLaborPlan(laborPlanForm).then((res) => {
                ElMessage({
                    type: 'success',
                    message: res.description,
                })
                detailLaborVisable.value = false;
                emit('updateLaborPlan');
            })
        } else {
            console.log('error submit!')
        }
    })
}

// 子组件对外暴露方法,父组件传数据给子组件,类似props功能
const deliverLaborPlanForm = (laborPlanInfo) => {
    ({
        planId: laborPlanForm.planId,
        planRank: laborPlanForm.planRank,
        collegeId: laborPlanForm.collegeId,
        termId: laborPlanForm.termId,
        grade: laborPlanForm.grade,
        advisor: laborPlanForm.advisor,
        startTime: laborPlanForm.startTime,
        endTime: laborPlanForm.endTime,
        dailyAmount: laborPlanForm.dailyAmount,
        centralAmount: laborPlanForm.centralAmount,
        societyAmount: laborPlanForm.societyAmount,
        otherAmount: laborPlanForm.otherAmount,
    } = laborPlanInfo);
    laborPlanForm = reactive({...laborPlanInfo})
}

defineExpose({
    detailLaborVisable,
    deliverLaborPlanForm,
    termList,
    collegeList,
    gradeList,
})
</script>
   
<style scoped></style>