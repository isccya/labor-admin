<template>
    <!-- 确认删除弹窗 -->
    <el-dialog v-model="deleteLaborNoticeVisable" title="提示" width="30%" align-center>
        <span>是否确定删除该通知公告?</span>
        <template #footer>
            <span>
                <el-button @click="deleteLaborNoticeVisable = false">取消</el-button>
                <el-button type="primary" @click="delteLaborNotice">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { deleteLaborNotice } from '../../../api/laborNotice';
import { ElMessage } from 'element-plus'

const emit = defineEmits(['updateLaborNotice'])
const deleteLaborNoticeVisable = ref(false);
const deleteId = ref(0);
function delteLaborNotice() {
    deleteLaborNoticeVisable.value = false;
    deleteLaborNotice(deleteId.value).then(() => {
        ElMessage({
            message: '删除成功',
            type: 'success',
        });
        emit('updateLaborNotice');
    }).catch(() => {
        ElMessage({
            message: '删除失败',
            type: 'error',
        })
    })
}

defineExpose({
    deleteLaborNoticeVisable,
    deleteId,
})
</script>
  
<style scoped></style>