<template>
  <div class="app-container">
    <!-- 查询 -->
    <el-form inline>
      <el-form-item label="您当前的管理等级">
        <el-select clear-icon="CircleCloseFilled" clearable v-model="data.queryParams.ranks" placeholder="" @change="changeRank()">
          <el-option v-for="item in options.ranks" :key="item" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select clear-icon="CircleCloseFilled" clearable v-model="data.queryParams.grade" placeholder="" @change="getList()">
          <el-option v-for="item in options.grade" :key="item" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openAddLabor">添加劳动计划</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表展示 -->
    <el-table :data="laborList" stripe style="overflow-y: scroll;height: 550px">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="院系" prop="deptName"></el-table-column>
      <el-table-column label="年级" prop="grade"></el-table-column>
      <el-table-column label="学期(xx年-xx年-第x学期)" prop="termName"></el-table-column>
      <el-table-column label="主管老师" prop="mentorName"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button text type="primary" @click="handleLaborPlaneDetails(scope)">查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看详细弹出框 -->
    <el-dialog v-model="data.laborPlaneDetailsDialogVisibale" title="劳动计划" width="90%"
               style="height: 100%;overflow-y: scroll;" draggable :before-close="handleCloseLaborPlaneDetails">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h2>劳动计划</h2>
          <span style="color: #1c84c6">(点击任意空白处或按ESC关闭)</span>
        </div>
      </template>
      <!--      基本信息-->
      <div class="baseInfo">
        <div class="title-details" style="font-size: 20px;margin-bottom: 20px">
                    <span class="svg"><el-icon>
                            <Avatar/>
                        </el-icon></span>
          <span>基本信息</span>

        </div>
        <el-container>
          <el-form inline ref="form1" :rules="rule1" :model="detailParams" label-position="left">
            <el-form-item label="劳动计划等级" label-width="120" prop="ranks" style="width: 380px;">
              <el-select v-model="detailParams.ranks" placeholder="请选择" :disabled="!data.isAdding">
                <el-option v-for="item in options.ranks" :key="item" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期" label-width="120" prop="termName" style="width: 380px;">
              <el-select v-model="detailParams.termName" class="" placeholder="请选择" size="default"
                         @change="changeTerm" :disabled="!data.isAdding">
                <el-option v-for="item in detailOption.term" :key="item.termID" :label="item.termLabel"
                           :value="item.termName"/>
              </el-select>
            </el-form-item>
            <el-form-item label="年级" label-width="120" prop="grade" style="width: 380px;">
              <el-select v-model="detailParams.grade" class="" placeholder="请选择" size="default"
                         :disabled="!data.isAdding">
                <el-option v-for="item in options.grade" :key="item.value" :label="item.label"
                           :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="指导老师" label-width="120" prop="mentorName" style="width: 380px;">
              <el-input v-model="detailParams.mentorName" placeholder="请输入"
                        :disabled="!data.isAdding"></el-input>
            </el-form-item>
            <el-form-item label="指导老师工号" label-width="120" prop="mentor" style="width: 380px;">
              <el-input v-model.number="detailParams.mentor" placeholder="请输入"
                        :disabled="!data.isAdding"></el-input>
            </el-form-item>
            <el-form-item label="院系" label-width="120" prop="deptName" style="width: 380px;">
              <el-select v-model="detailParams.deptName" class="" placeholder="请输入" size="default"
                         :disabled="!data.isAdding" @change="changeCollege">
                <el-option v-for="item in detailOption.department" :key="item.deptId" :label="item.deptName"
                           :value="item.deptName"/>
              </el-select>
            </el-form-item>
            <el-form-item label="期限" label-width="120" prop="deadline" style="width: 380px;">
              <el-input v-if="!data.isAdding" v-model="detailParams.deadline" placeholder="请输入"
                        :disabled="!data.isAdding"></el-input>
              <div v-else>
                <el-date-picker v-model="detailParams.deadline" type="datetime" placeholder="选择日期"
                                format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="是否启用" prop="status" style="width: 380px;">
              <el-radio-group v-model="detailParams.status">
                <el-radio :label="1" size="large">是</el-radio>
                <el-radio :label="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-container>
      </div>

      <!--      劳动内容-->
      <div class="labor-context">
        <div class="labor-context" style="font-size: 20px;margin-bottom: 20px">
                    <span class="svg"><el-icon>
                            <List/>
                        </el-icon></span>
          <span>劳动内容</span>
        </div>
        <span style="color: red">注意:</span> <span> 院级劳动记录条数不得少于校级</span>
        <el-form :model="detailParams" :rules="rule2" ref="form2" label-position="left" label-width="170px">
          <el-form-item label="(1)日常劳动记录" prop="dailyLabor">
            <el-row :gutter="100">
              <el-col :span="12">
                <el-input v-model.number="detailParams.dailyLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="12">
                                <span>
                                    是否允许修改
                                </span>
                <span>
                                    <el-radio-group v-model="detailParams.dailyLaborModify">
                                        <el-radio :label="1" size="large">是</el-radio>
                                        <el-radio :label="0" size="large">否</el-radio>
                                    </el-radio-group>
                                </span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(2)集中实践劳动记录" prop="collectiveLabor">
            <el-row :gutter="100">
              <el-col :span="12">
                <el-input v-model.number="detailParams.collectiveLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="12">
                <div>
                                    <span>
                                        是否允许修改
                                    </span>
                  <span>
                                        <el-radio-group v-model="detailParams.collectiveLaborModify">
                                            <el-radio :label="1" size="large">是</el-radio>
                                            <el-radio :label="0" size="large">否</el-radio>
                                        </el-radio-group>
                                    </span>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(3)其他劳动记录" prop="otherLabor">
            <el-row :gutter="100">
              <el-col :span="12">
                <el-input v-model.number="detailParams.otherLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="12">
                <div>
                                    <span>
                                        是否允许修改
                                    </span>
                  <span>
                                        <el-radio-group v-model="detailParams.otherLaborModify">
                                            <el-radio :label="1" size="large">是</el-radio>
                                            <el-radio :label="0" size="large">否</el-radio>
                                        </el-radio-group>
                                    </span>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(4)社会劳动记录" prop="societyLabor">
            <el-row :gutter="100">
              <el-col :span="12">
                <el-input v-model.number="detailParams.societyLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="12">
                <div>
                                    <span>
                                        是否允许修改
                                    </span>
                  <span>
                                        <el-radio-group v-model="detailParams.societyLaborModify">
                                            <el-radio :label="1" size="large">是</el-radio>
                                            <el-radio :label="0" size="large">否</el-radio>
                                        </el-radio-group>
                                    </span>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>


      <template #footer>
                <span class="dialog-footer">
                    <el-button v-if="!data.isAdding" @click="handleSubmit" type="primary"
                               style="margin-left: 300px">确认发布</el-button>
                    <el-button v-else @click="addPlan(form1, form2)" type="primary"
                               style="margin-left: 300px">添加劳动计划</el-button>
                </span>
      </template>

    </el-dialog>

    <!-- 分页组件 -->
    <Pagination :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
                @pagination="getList"></Pagination>
  </div>
</template>

<script setup name="laborPlane">

//#region import
import {reactive, toRefs} from "vue";
import Pagination from "@/components/Pagination";
import {getLaborListWithPage, getLaborDetail, schoolChangeLaborPlane, addLaborPlan} from "@/api/laborPlane"
import {getDeptOption, getTermListOption} from "@/api/selectOption";
import {ElMessage} from "element-plus";
//#endregion
//TODO:做数据校验
const form1 = ref();
const form2 = ref();
const rule1 = reactive({
  ranks: [{required: true, message: '请选择等级', trigger: 'change'}],
  termName: [{required: true, message: '请选择学期', trigger: 'blur'}],
  grade: [{required: true, message: '请选择年级', trigger: 'blur'}],
  mentorName: [
    {required: true, message: '填写指导员姓名', trigger: 'blur'},
    {type: "string", message: '请输入人名', trigger: 'blur'},
  ],
  mentor: [{required: true, message: '请填写指导员工号', trigger: 'blur'}],
  deptName: [{required: true, message: '请选择学院', trigger: 'blur'}],
  deadline: [{required: true, message: '请选择截至日期', trigger: 'blur'}],
  status: [{required: true, message: '请选择否启用', trigger: 'blur'}],
})
const rule2 = reactive({
  dailyLabor: [{required: true, message: '请输入日常劳动次数', trigger: 'change'}],
  collectiveLabor: [{required: true, message: '请输入集体劳动次数', trigger: 'blur'}],
  otherLabor: [{required: true, message: '请其他劳动次数', trigger: 'blur'}],
  societyLabor: [{required: true, message: '请社会实践劳动次数', trigger: 'blur'}],
})

//#region data
const data = reactive({
  laborPlaneDetailsDialogVisibale: false, //劳动计划弹出款显示
  total: 1000,
  //分页查询参数
  queryParams: {
    pageNum: 1,//当前页数
    pageSize: 10,
    ranks: "",//1院级 0校级
    grade: "",//年级
  },
  //管理等级选项
  options: {
    ranks: [{value: 0, label: "校级"}, {value: 1, label: "院级"}],
    grade: [
      {label: "2020级", value: "2020"},
      {label: "2021级", value: "2021"},
      {label: "2022级", value: "2022"},
      {label: "2023级", value: "2023"},
      {label: "2024级", value: "2024"},
      {label: "2025级", value: "2025"},
    ],
  },
  //查看详细的选项
  detailOption: {
    term: [{termLabel: "", termName: "一", termID: 1}],//学期
    department: [{deptId: 0, deptName: "计算与工程学院"}],//院系
  },
  //查看详细的参数
  detailParams: {
    "deptId": 101,
    "deptName": "资源环境与安全工程学院（矿业工程研究院）",
    "grade": "",
    "term": 23242,
    "termName": "2023-2024-2",
    "mentor": 1051002552,
    "mentorName": "张三",
    "dailyLabor": 10,
    "collectiveLabor": 20,
    "societyLabor": 40,
    "otherLabor": 50,
    "dailyLaborModify": 0,
    "collectiveLaborModify": 0,
    "societyLaborModify": 0,
    "otherLaborModify": 0,
    "ranks": 0,
    "status": 1,
    "deadline": "2025-03-02 15:58:23",
  },
  //劳动计划列表
  laborList: [
    {
      planId: 0, //计划id
      collectiveLabor: 0,//集体劳动需要完成次数
      dailyLabor: 0,//日常劳动需要完成次数
      otherLabor: 0,//其他劳动需要完成次数
      societyLabor: 0,//社会实践劳动需要完成的次数
      deadline: "2021-1-1",//截止时间
      deptId: 0,//学院id
      deptName: "",//学院名
      grade: "21级",//年级
      mentor: 0,//指导老师id
      mentorName: "",
      term: 0,//学期
    },
  ],
  //是否在添加
  isAdding: false,
});
//#endregion

//#region toRefs
const {queryParams, options, laborList, total, detailOption, detailParams} = toRefs(data);
//#endregion

//#region API
//获取列表 laborList
const getList = () => {
  getLaborListWithPage(data.queryParams).then(res => {
    // console.log(res);
    data.laborList = res.rows;
    data.laborList.forEach(item => {
      // console.log(item);
      var tempArr = item.termName.split("-");
      item.termName = `${tempArr[0]}-${tempArr[1]}学年-第${tempArr[2]}学期`;
    })
    data.total = res.total;
  }).catch(err => {
    console.log(err);
  })
};
//#endregion

//#region  页面流程
//获取列表 laborList
getList();
//获取下拉框选项
getTermListOption().then(res => {
  // console.log(res)
  data.detailOption.term = res;
  data.detailOption.term.forEach(item => {
    // console.log(item)
    var tempArr = item.termName.split("-");
    item.termLabel = `${tempArr[0]}-${tempArr[1]}学年-第${tempArr[2]}学期`;
  })
})
getDeptOption().then(res => {
  // console.log(res);
  data.detailOption.department = res.data;
})

//查看详细打开
const handleLaborPlaneDetails = (scope) => {
  data.isAdding = false;
  data.laborPlaneDetailsDialogVisibale = true;
  // console.log(scope);
  let planID = scope.row.planId;

  //获取详细详细信息
  getLaborDetail(planID).then(res => {
    data.detailParams = res.data
    // console.log(res);
  }).catch(err => {
  })
}

//查看详细关闭
const handleCloseLaborPlaneDetails = () => {
  data.laborPlaneDetailsDialogVisibale = false;
  for (let item in data.detailParams) {
    data.detailParams[item] = "";
  }
  // console.log(data.detailParams)
}

//确认发布
const handleSubmit = () => {
  data.detailParams.dailyLabor = Number(data.detailParams.dailyLabor);
  data.detailParams.otherLabor = Number(data.detailParams.otherLabor);
  data.detailParams.societyLabor = Number(data.detailParams.societyLabor);
  data.detailParams.collectiveLabor = Number(data.detailParams.collectiveLabor);
  console.log(detailParams.value);
  schoolChangeLaborPlane(data.detailParams).then(res => {
    // console.log(res);
    ElMessage({
      message: "修改计划成功!",
      type: "success",
    })
    handleCloseLaborPlaneDetails();
  });
}

//改变学期
const changeTerm = (val) => {
  let term;
  term = data.detailOption.term.find(elem => elem.termName === val)
  data.detailParams.term = term.termId;
}

//改变学院
const changeCollege = (val) => {
  let term;
  term = data.detailOption.department.find(elem => elem.deptName === val)
  data.detailParams.deptId = term.deptId;
}

//改变等级
const changeRank = () => {
  getList();
}

//打开添加劳动计划
const openAddLabor = () => {
  data.isAdding = true;
  data.laborPlaneDetailsDialogVisibale = true;
  for (let item in data.detailParams) {
    data.detailParams[item] = ""
  }
}

//添加劳动计划
const addPlan = async (f1, f2) => {
  if (!f1) return;
  if (!f2) return;
  console.log(f1);
  console.log(f2);
  f1.validate((valid, fields) => {
    if (valid) {
      f2.validate((valid, fields) => {
        if (valid) {
          addLaborPlan(data.detailParams).then(res => {
            // console.log(res);
            ElMessage.success("添加成功！！！");
            handleCloseLaborPlaneDetails();
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  })
}

//#endregion

</script>

<style scoped lang="scss">
.my-header {
  font-size: 30px;
  font-weight: 700;
  color: #606266;

  span {
    font-weight: 400;
    margin-top: 10px;
    font-size: 15px;
  }

  i {
    font-weight: 200;
    margin-top: 10px;
    font-size: 10px;
  }
}
</style>
