<template>
    <el-dialog v-model="detailLaborVisable" title="劳动计划" width="60%" before-close="">
        <el-form :model="laborPlanForm" label-width="120px" inline>
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
                <el-button @click="detailLaborVisable = false">取消</el-button>
                <el-button type="primary" @click="detailLaborVisable = false">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { LaborPlanForm } from '../type';

// 控制查看劳动计划表单展示
const detailLaborVisable = ref(false)

const laborPlanForm = reactive<LaborPlanForm>({
    level: '',//劳动计划等级
    college: '',
    term: '',
    grade: '',
    mentorName: '',//指导老师
    mentor: '',//指导老师工号
    deadline: '',//期限
    dailyLabor: 0,
    collectiveLabor: 0,
    societyLabor: 0,
    otherLabor: 0,
})

// 子组件对外暴露方法,父组件传数据给子组件,类似props功能
const deliverLaborPlanForm = (laborPlanInfo) => {
    ({
        level: laborPlanForm.level,
        college: laborPlanForm.college, 
        term: laborPlanForm.term,
        grade: laborPlanForm.grade,
        mentorName: laborPlanForm.mentorName,
        mentor: laborPlanForm.mentor,
        deadline: laborPlanForm.deadline,
        dailyLabor: laborPlanForm.dailyLabor,
        collectiveLabor: laborPlanForm.collectiveLabor,
        societyLabor: laborPlanForm.societyLabor,
        otherLabor: laborPlanForm.otherLabor,
    } = laborPlanInfo);
}

function judgeCollegeLaborLevel(level) {
    if (level === '1') {
        // 如果是校级
        laborPlanForm.term = '';
        return true;
    } else
        return false;
}

defineExpose({
    detailLaborVisable,
    deliverLaborPlanForm,
})
</script>
   
<style scoped></style>