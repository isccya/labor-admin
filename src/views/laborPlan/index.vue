<template>
  <div class="app-container">
    <!-- 查询 -->
    <el-form inline>
      <el-form-item label="您当前的管理等级">
        <el-select v-model="data.queryParams.ranks" placeholder="" @change="getList()">
          <el-option v-for="item in options.ranks" :key="item" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="data.queryParams.grade" placeholder="" @change="getList()">
          <el-option v-for="item in options.grade" :key="item" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openAddLabor">添加劳动计划</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表展示 -->
    <el-table :data="laborList" stripe>
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
    <el-dialog v-model="data.laborPlaneDetailsDialogVisibale" title="劳动计划" width="90%" draggable
               :before-close="handleCloseLaborPlaneDetails">
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
          <el-form inline>
            <el-form-item label="学期" label-width="70">
              <el-select v-model="detailParams.termName" class="" placeholder="请选择" size="default"
                         @change="changeTerm" :disabled="!data.isAdding">
                <el-option v-for="item in detailOption.term" :key="item.termID" :label="item.termName"
                           :value="item.termName"/>
              </el-select>
            </el-form-item>
            <el-form-item label="指导老师" label-width="70">
              <el-input v-model="detailParams.mentorName" placeholder="请输入" :disabled="!data.isAdding"></el-input>
            </el-form-item>
            <el-form-item label="院系" label-width="70">
              <el-select v-model="detailParams.deptName" class="" placeholder="请输入" size="default"
                         :disabled="!data.isAdding" @change="changeCollege">
                <el-option v-for="item in detailOption.department" :key="item.deptId" :label="item.deptName"
                           :value="item.deptName"/>
              </el-select>
            </el-form-item>
            <el-form-item label="期限" label-width="70">
              <el-input v-model="detailParams.deadline" placeholder="请输入" :disabled="!data.isAdding"></el-input>
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
        <el-form label-position="left" label-width="150px">
          <el-form-item label="(1)日常劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.dailyLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.dailyLaborModify">
                    <el-radio :label="1" size="large">是</el-radio>
                    <el-radio :label="0" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                <!--                是否添加图片-->
                <!--                <el-radio-group v-model="detailParams.dailyLaborModify">-->
                <!--                  <el-radio :label="1" size="large">是</el-radio>-->
                <!--                  <el-radio :label="0" size="large">否</el-radio>-->
                <!--                </el-radio-group>-->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(2)集中实践劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.collectiveLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.collectiveLaborModify">
                    <el-radio :label="1" size="large">是</el-radio>
                    <el-radio :label="0" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                <!--                是否添加图片-->
                <!--                <el-radio-group v-model="detailParams.collectiveLaborModify">-->
                <!--                  <el-radio :label="1" size="large">是</el-radio>-->
                <!--                  <el-radio :label="0" size="large">否</el-radio>-->
                <!--                </el-radio-group>-->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(3)其他劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.otherLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.otherLaborModify">
                    <el-radio :label="1" size="large">是</el-radio>
                    <el-radio :label="0" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                <!--                是否添加图片-->
                <!--                <el-radio-group v-model="detailParams.otherLaborModify">-->
                <!--                  <el-radio :label="1" size="large">是</el-radio>-->
                <!--                  <el-radio :label="0" size="large">否</el-radio>-->
                <!--                </el-radio-group>-->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(4)社会劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.societyLabor" placeholder="请输入"/>
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.societyLaborModify">
                    <el-radio :label="1" size="large">是</el-radio>
                    <el-radio :label="0" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                <!--                是否添加图片-->
                <!--                <el-radio-group v-model="detailParams.otherLaborModify">-->
                <!--                  <el-radio :label="1" size="large">是</el-radio>-->
                <!--                  <el-radio :label="0" size="large">否</el-radio>-->
                <!--                </el-radio-group>-->
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleSubmit">确认发布</el-button>
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
    term: [{termName: "一", termID: 1}, {termName: "二", termID: 2}, {termName: "三", termID: 3}],//学期
    department: [{deptId: 0, deptName: "计算与工程学院"}],//院系
  },
  //查看详细的参数
  detailParams: {
    collectiveLabor: 0,//集体劳动需要完成次数
    collectiveLaborModify: 0,//集体劳动记录是否可以修改
    dailyLabor: 0,//日常劳动需要完成次数
    dailyLaborModify: 0,//日常劳动记录是否可以修改
    deadline: "",//截止时间
    deptId: 0,//学院id
    deptName: "",//学院名
    grade: "",//年级
    mentor: 0,//指导老师id
    mentorName: "",//指导老师姓名
    otherLabor: 0,//其他劳动需要完成次数
    otherLaborModify: 0,//其他劳动记录是否可以修改
    planId: 0,//计划id
    ranks: 0,//级别
    societyLabor: 0,//社会实践劳动需要完成的次数
    societyLaborModify: 0,//社会劳动记录是否可以修改
    status: 0,//是否启动
    term: 0,//学期
    termName: "",//学期名
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
  // data.queryParams.ranks = data.ranks;
  getLaborListWithPage(data.queryParams).then(res => {
    // console.log(res);
    data.laborList = res.rows;
    data.laborList.forEach(item => {
      // console.log(item);
      var tempArr = item.termName.split("-");
      // console.log(tempArr);
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
})
getDeptOption().then(res => {
  // console.log(res);
  data.detailOption.department = res;
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
};

//查看详细关闭
const handleCloseLaborPlaneDetails = () => {
  data.laborPlaneDetailsDialogVisibale = false;
};

//确认发布
const handleSubmit = () => {
  // console.log(detailParams.value);
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

//打开添加劳动计划
const openAddLabor = () => {
  data.isAdding = true;
  data.laborPlaneDetailsDialogVisibale = true;
  for (let item in data.detailParams) {
    data.detailParams[item] = ""
  }
  data.detailParams.ranks = data.queryParams.ranks;
}
//添加劳动计划
const addPlan = () => {
  addLaborPlan(data.detailParams).then(res => {
    console.log(res)
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
}
</style>
