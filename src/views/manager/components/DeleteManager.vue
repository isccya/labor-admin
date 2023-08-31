<template>
    <!-- 确认删除弹窗 -->
    <el-dialog v-model="deleteManagerVisable" title="提示" width="30%" align-center>
        <span>是否确定删除该管理员?</span>
        <template #footer>
            <span>
                <el-button @click="deleteManagerVisable = false">取消</el-button>
                <el-button type="primary" @click="DeleteManager">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { deleteManager } from '../../../api/manager';
import { ElMessage } from 'element-plus'

const emit = defineEmits(['updateManager'])
const deleteManagerVisable = ref(false);
const deleteId = ref(0);
function DeleteManager() {
    deleteManagerVisable.value = false;
    deleteManager(deleteId.value).then(() => {
        ElMessage({
            message: '删除成功',
            type: 'success',
        });
        emit('updateManager');
    }).catch(() => {
        ElMessage({
            message: '删除失败',
            type: 'error',
        })
    })
}

defineExpose({
    deleteManagerVisable,
    deleteId,
})
</script>
  
<style scoped></style>