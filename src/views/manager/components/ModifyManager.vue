<template>
    <el-dialog v-model="modifyManagerVisble" title="修改管理员" width="25%">
        <el-form :model="managerForm" label-width="120px" inline :rules="rules" ref="ruleFormRef">
            <el-form-item label="工号" prop="userId">
                <el-input v-model="managerForm.userId" placeholder="请填写工号搜索老师信息" class="w-55" />
                <el-button :icon="Search" circle class="ml-3" @click="queryManagerInfo(managerForm.userId)" />
            </el-form-item>
            <el-form-item label="姓名" prop="userName">
                <el-input v-model="userName" placeholder="姓名" class="w-55" disabled="false" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
                <el-input v-model="phone" placeholder="联系方式" class="w-55" disabled="false" />
            </el-form-item>
            <el-form-item label="新密码" prop="userPassword">
                <el-input v-model="managerForm.userPassword" placeholder="请填写新密码" class="w-55" />
            </el-form-item>
            <el-form-item label="等级" prop="roleId">
                <el-select v-model="managerForm.roleId" placeholder="请选择管理员等级">
                    <el-option v-for="items in roleList" :label="items.roleName" :value="items.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item label="院系" prop="collegeId">
                <el-select v-model="managerForm.collegeId" placeholder="请选择院系" :disabled="judgeManagerLevel(managerForm.roleId)">
                    <el-option v-for="items in collegeList" :label="items.collegeName" :value="items.collegeId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="CancelModifyManager(ruleFormRef)">取消</el-button>
                <el-button type="primary" @click="modifyManager(ruleFormRef)">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import  useBasicInfoStore  from '../../../store/modules/basicInfo'
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import type { ManagerList } from '../type'
import { updateManagerList, getManagerInfo } from '../../../api/manager';
import { CollegeList } from '../../laborPlan/type';

const modifyManagerVisble = ref(false);

const emits = defineEmits(['updateManager']);
const basicInfoStore = useBasicInfoStore();

//学院列表
const collegeList = reactive<Array<CollegeList>>([]);

let userName = ref('');
let phone = ref('');
const managerForm = reactive<ManagerList>({
    userId: '',
    userPassword: '',
    roleId: '',
    collegeId: '',
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    userId: [{ required: true, message: '请输入工号并搜索', trigger: 'change', }],
    userPassword: [{ required: true, message: '请填写密码', trigger: 'change', }],
    roleId: [{ required: true, message: '请选择管理员等级', trigger: 'change', }],
    collegeId: [
        {
            required:true,
            validator: (rule: any, value: any, callback: any) => {           
                if (value === '' && managerForm.roleId === 1) {                  
                    callback(new Error('请选择院系'))
                }else
                    callback();
            }, trigger: 'change'
        }
    ],
})

const roleList = reactive([
    {
        roleName: '院级管理员',
        roleId: 1,
    },
    {
        roleName: '校级管理员',
        roleId: 2,
    },
])

function queryManagerInfo(userId) {
    getManagerInfo({
        userId,
    }).then((res) => {
        userName.value = res.data.userName;
        phone.value = res.data.phone;
    }).catch(()=>{
        userName.value = '';
        phone.value = '';
    })
}

function judgeManagerLevel(level) {
    if (level === 2) {
        // 如果是校级
        managerForm.collegeId = '';
        return true;
    } else
        return false;
}

async function modifyManager(formEl: FormInstance | undefined) {
    if (!formEl)
        return;
    await formEl.validate((valid) => {
        if (valid) {
            updateManagerList(managerForm).then(() => {
                ElMessage({
                    type: 'success',
                    message: '修改成功'
                });
                formEl.resetFields();
                emits('updateManager');
                modifyManagerVisble.value = false;
            }).catch(()=>{
                
            })
        }
    })
}

function CancelModifyManager(formEl: FormInstance | undefined) {
    if (!formEl)
        return;
    formEl.resetFields();
    modifyManagerVisble.value = false
}

function deliverMangerInfo(managerInfo){
    ({
        userId:managerForm.userId,
        userName:userName.value,
        phone:phone.value,
        adminRole:managerForm.roleId,
        collegeId:managerForm.collegeId,
    }=managerInfo)
}

defineExpose({
    modifyManagerVisble,
    deliverMangerInfo,
})

onMounted(()=>{
    basicInfoStore.getCollegeList(collegeList);
})
</script>
  
<style scoped></style>