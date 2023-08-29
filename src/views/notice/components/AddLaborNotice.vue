<template>
    <div>
        <el-dialog v-model="addLaborNoticeVisible" title="公告编辑" width="50%" before-close="">
            <el-form :model="noticeForm" label-width="120px" inline :rules="rules" ref="ruleFormRef">
                <div style="font-size: 20px;margin-bottom: 20px">
                    <span class="svg"><el-icon>
                            <Avatar />
                        </el-icon></span>
                    <span>基本信息</span>
                </div>
                <el-form-item label="学期 :" prop="termId">
                    <el-select v-model="noticeForm.termId" placeholder="请选择学期">
                        <el-option v-for="items in termList" :label="items.termName" :value="items.termId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="通知范围 :" prop="scope">
                    <el-select v-model="noticeForm.scope" placeholder="请选择范围">
                        <el-option v-for="items in levelList" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="面向院系 :" prop="collegeId">
                    <el-select v-model="noticeForm.collegeId" placeholder="请选择院系"
                        :disabled="judgeCollegeNoticeLevel(noticeForm.scope)">
                        <el-option v-for="items in collegeList" :label="items.collegeName" :value="items.collegeId" />
                    </el-select>
                </el-form-item>
                <el-form-item label="指导老师 :" prop="advisor">
                    <el-input v-model="noticeForm.advisor" placeholder="请填写指导老师" class="w-55" />
                </el-form-item>
                <div style="font-size: 20px;margin-bottom: 10px">
                    <span class="svg"><el-icon>
                            <List />
                        </el-icon></span>
                    <span>通知内容</span>
                </div>
                <el-form-item label="通知标题 :" prop="title">
                    <el-input v-model="noticeForm.title" placeholder="请填写通知标题" class="w-55" />
                </el-form-item>
                <el-form-item label="是否置顶通知 :" prop="isTop">
                        <el-radio-group v-model="noticeForm.isTop" class="ml-4">
                            <el-radio :label="1" size="">是</el-radio>
                            <el-radio :label="0" size="">否</el-radio>
                        </el-radio-group>
                </el-form-item>

                <el-form-item label="通知内容 :" class="w-1/1" prop="content">
                    <el-input v-model="noticeForm.content" :rows="24" type="textarea" placeholder="请输入通知内容"
                        :autosize="{ minRows: 6, maxRows: 12 }" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button @click="cancelAddLaborNotice(ruleFormRef)">取消</el-button>
                    <el-button type="primary" @click="AddLaborNotice(ruleFormRef)">
                        添加公告
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CollegeList, TermList } from '../../laborPlan/type';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { addLaborNotice } from '../../../api/laborNotice'

const addLaborNoticeVisible = ref(false);

const emit = defineEmits(['updateLaborNotice'])

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
//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

//学期列表
const termList = reactive<Array<TermList>>([]);

const ruleFormRef = ref<FormInstance>()

// 通知表单
const noticeForm :any = reactive({
    title: '',
    collegeId: '',
    termId: '',
    advisor: '',
    content: '',
    isTop: '',
    scope: '',
})

function judgeCollegeNoticeLevel(level) {
    if (level === 1) {
        // 如果是校级
        noticeForm.collegeId = '';
        return true;
    } else
        return false;
}

const rules = reactive<FormRules>({
    scope: [{ required: true, message: '请选择通知范围', trigger: 'change', }],
    collegeId: [
        {
            required:true,
            validator: (rule: any, value: any, callback: any) => {           
                if (value === '' && noticeForm.scope === 0) {                  
                    callback(new Error('请选择通知面向的院系'))
                }else
                    callback();
            }, trigger: 'change'
        }
    ],
    termId: [{ required: true, message: '请选择学期', trigger: 'change', }],
    advisor: [{ required: true, message: '请填写指导老师', trigger: 'change', }],
    title: [{required: true,message: '请填写通知标题',trigger: 'change',}], 
    isTop: [{ required: true,message: '请选择是否置顶通知',trigger: 'change',}], 
    content: [{required: true,message: '请填写通知内容',trigger: 'change',}],
})

function cancelAddLaborNotice(formEl: FormInstance | undefined){
    if(!formEl) return;
    addLaborNoticeVisible.value = false;
    formEl.resetFields();
}

async function AddLaborNotice(formEl: FormInstance | undefined){
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            addLaborNotice(noticeForm).then(() => {
                ElMessage({
                    type: 'success',
                    message: '添加成功',
                })
                emit('updateLaborNotice')
                formEl.resetFields();
                addLaborNoticeVisible.value = false;
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

defineExpose({
    addLaborNoticeVisible,
    termList,
    collegeList
})

</script>
  
<style scoped></style>