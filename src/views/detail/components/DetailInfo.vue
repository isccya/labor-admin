<template>
    <el-dialog v-model="detailInfoVisable" title="评分" width="30%" align-center>
        <el-form :model="detailInfo" inline ref="ruleFormRef">
            <el-form-item label="劳动内容 :" class="w-1/1" prop="remark">
                <el-input v-model="detailInfo.content" :rows="24" type="textarea" :autosize="{ minRows: 6, maxRows: 12 }"
                    disabled />
            </el-form-item>
            <el-form-item label="劳动图片 :" class="w-1/1" prop="remark">
                <div>
                    <el-image style="width: 100px; height: 100px" v-for="items in detailInfo.imgUrls" :src="items"
                        fit="fit" />
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="viewDetail()">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'

const detailInfoVisable = ref(false);

const detailInfo: any = reactive({
    imgUrls: [],
    content: ''
})

const deliverDetail = (detail: any) => {
    detailInfo.content = detail.content;
    detailInfo.imgUrls.length = 0;
    detailInfo.imgUrls.push(...detail.imgUrls);
}

function viewDetail() {
    detailInfoVisable.value = false;
}



defineExpose({
    detailInfoVisable,
    deliverDetail,
})

</script>
  
<style scoped></style>

