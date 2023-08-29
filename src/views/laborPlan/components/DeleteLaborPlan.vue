<template>
    <!-- 确认删除弹窗 -->
    <el-dialog v-model="deleteLaborPlanVisable" title="提示" width="30%" align-center>
        <span>是否确定该劳动计划删除?</span>
        <template #footer>
            <span>
                <el-button @click="deleteLaborPlanVisable = false">取消</el-button>
                <el-button type="primary" @click="delteLaborPlan">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { deleteLaborPlan } from '../../../api/laborPlan';
import { ElMessage } from 'element-plus'

const emit = defineEmits(['updateLaborPlan'])
const deleteLaborPlanVisable = ref(false);
const deleteId = ref(0);
function delteLaborPlan() {
    deleteLaborPlanVisable.value = false;
    deleteLaborPlan(deleteId.value).then(() => {
        ElMessage({
            message: '删除成功',
            type: 'success',
        });
        emit('updateLaborPlan');
    }).catch(() => {
        ElMessage({
            message: '删除失败',
            type: 'error',
        })
    })
}

defineExpose({
    deleteLaborPlanVisable,
    deleteId,
})
</script>
  
<style scoped></style>