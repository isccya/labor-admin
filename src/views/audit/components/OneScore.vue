<template>
    <el-dialog v-model="scoreVisible" title="评分" width="30%" align-center>
        <el-form :model="scoreForm" inline :rules="rules" ref="ruleFormRef">
            <el-form-item label="分数 :" prop="score">
                <el-select v-model="scoreForm.score" placeholder="请选择分数">
                    <el-option v-for="items in scoreList" :label="items" :value="items" />
                </el-select>
            </el-form-item>
            <el-form-item label="评语 :" class="w-1/1" prop="remark">
                <el-input v-model="scoreForm.remark" :rows="24" type="textarea" placeholder="请输入评语"
                    :autosize="{ minRows: 6, maxRows: 12 }" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelJudgeScore(ruleFormRef)">取消</el-button>
                <el-button type="primary" @click="JudgeScore(ruleFormRef)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { judgeScore } from '../../../api/audit'
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'

const scoreVisible = ref(false);

const emits = defineEmits(['updateAuditList']);

function deliverStudentId(ids :Array<string>) {
    scoreForm.studentIds.length = 0;
    scoreForm.studentIds.push(...ids);
}
const scoreList = reactive(['优', '良', '中', '及格', '不及格'])
const rules = reactive<FormRules>({
    score: [{ required: true, message: '请选择分数', trigger: 'change', }],
    remark: [{ required: true, message: '请输入评语', trigger: 'change', }],
})
const scoreForm: any = reactive({
    score: '',
    remark: '',
    studentIds: [],
})
const ruleFormRef = ref<FormInstance>()
function cancelJudgeScore(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields();
    scoreVisible.value = false;
}
async function JudgeScore(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            judgeScore(scoreForm).then((res) => {
                scoreVisible.value = false;
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '评分成功'
                    })
                    emits('updateAuditList');
                    // formEl.resetFields();
                } else {
                    ElMessage({
                        type: 'error',
                        message: `${res.description}`,
                    })
                }
            }).catch((error) => {
                ElMessage({
                    type: 'error',
                    message: `评分失败`,
                })
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

defineExpose({
    scoreVisible,
    deliverStudentId,
})
</script>
  
<style scoped></style>

