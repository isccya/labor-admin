<template>
    <el-dialog v-model="scoreVisible" title="Warning" width="30%" align-center>
        <span>Open the dialog from the center from the screen</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="scoreVisible = false">Cancel</el-button>
                <el-button type="primary" @click="scoreVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const scoreVisible = ref(false);

defineExpose({
    scoreVisible,
})
</script>
  
<style scoped></style>

