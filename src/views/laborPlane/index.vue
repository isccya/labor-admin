<template>
  <div class="app-container">
    <!-- 查询 -->
    <el-form>
      <el-form-item label="学院">
        <el-select v-model="queryParams.department" placeholder="">
          <el-option v-for="item in options.department" :key="item" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 列表展示 -->
    <el-table :data="laborList" stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="院系" prop="department"></el-table-column>
      <el-table-column label="主管老师" prop="chargeTeacher"></el-table-column>
      <el-table-column label="联系方式" prop="tel"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button text type="primary" @click="handleLaborPlaneDetails">查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看详细弹出框 -->
    <el-dialog v-model="data.laborPlaneDetailsDialogVisibale" title="Tips" width="90%" draggable
      :before-close="handleCloseLaborPlaneDetails">
      <!--      基本信息-->
      <div class="baseInfo">
        <div class="title-details" style="font-size: 20px;margin-bottom: 20px">
          <span class="svg">我是图标</span>
          <span>基本信息</span>
        </div>
        <el-container>
          <el-form inline>
            <el-form-item label="学期" label-width="70">
              <el-select v-model="detailParams.term" class="" placeholder="请选择" size="default">
                <el-option v-for="item in detailOption.term" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="指导老师" label-width="70">
              <el-input v-model="data.detailParams.chargeTeacher" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="院系" label-width="70">
              <el-select v-model="data.detailParams.department" class="" placeholder="请输入" size="default">
                <el-option v-for="item in detailOption.department" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-container>
      </div>

      <!--      劳动内容-->
      <div class="labor-context">
        <div class="labor-context" style="font-size: 20px;margin-bottom: 20px">
          <span class="svg">我是图标</span>
          <span>基本信息</span>
        </div>
        <el-form label-position="left" label-width="150px">
          <el-form-item label="(1)日常劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.dailyLabor.name" placeholder="请输入" />
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.dailyLabor.canFix">
                    <el-radio label="是" size="large" />
                    <el-radio label="否" size="large" />
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                是否添加图片
                <el-radio-group v-model="detailParams.dailyLabor.canAddImg">
                  <el-radio label="是" size="large" />
                  <el-radio label="否" size="large" />
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(2)集中实践劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.concentrateLabor.name" placeholder="请输入" />
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.concentrateLabor.canFix">
                    <el-radio label="是" size="large" />
                    <el-radio label="否" size="large" />
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                是否添加图片
                <el-radio-group v-model="detailParams.concentrateLabor.canAddImg">
                  <el-radio label="是" size="large" />
                  <el-radio label="否" size="large" />
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="(3)其他劳动记录">
            <el-row :gutter="100">
              <el-col :span="8">
                <el-input v-model="detailParams.otherLabor.name" placeholder="请输入" />
              </el-col>
              <el-col :span="8">
                <div>
                  是否允许修改
                  <el-radio-group v-model="detailParams.otherLabor.canFix">
                    <el-radio label="是" size="large" />
                    <el-radio label="否" size="large" />
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="8">
                是否添加图片
                <el-radio-group v-model="detailParams.otherLabor.canAddImg">
                  <el-radio label="是" size="large" />
                  <el-radio label="否" size="large" />
                </el-radio-group>
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
import { reactive, toRefs } from "vue";
import Pagination from "@/components/Pagination";
import { timeUnits } from "element-plus";

const data = reactive({
  laborPlaneDetailsDialogVisibale: false, //劳动计划弹出款显示
  total: 1000,
  //查询参数
  queryParams: {
    department: "",//院系
    pageNum: 1,
    pageSize: 10,
  },
  //选项
  options: {
    department: [{ value: "", label: "计算机科学与工程" }],
  },
  // 查看详细的选项
  detailOption: {
    term: [{ value: "第一学期", label: "第一学期" }],//学期
    department: [{ value: "计算与工程学院", label: "计算与工程学院" }],//院系
  },
  detailParams: {
    term: "",
    department: "",
    chargeTeacher: "",//指导老师
    dailyLabor: {//日常劳动记录
      name: "",//劳动记录民
      canFix: null,//是否允许修改
      canAddImg: null,//是否添加图片
    },
    concentrateLabor: {
      name: "",//劳动记录名
      canFix: null,//是否允许修改
      canAddImg: null,//是否添加图片
    },
    otherLabor: {
      name: "",//劳动记录民
      canFix: null,//是否允许修改
      canAddImg: null,//是否添加图片
    },
  },
  //劳动计划列表
  laborList: [
    {
      department: "计算机科学与工程",
      chargeTeacher: "张三",
      tel: 123456789,
    },
    {
      department: "计算机科学与工程",
      chargeTeacher: "张三",
      tel: 123456789,
    },
    {
      department: "计算机科学与工程",
      chargeTeacher: "张三",
      tel: 123456789,
    },
  ],
});

const { queryParams, options, laborList, total, detailOption, detailParams } = toRefs(data);

//获取列表
const getList = () => {
};

//查看详细打开
const handleLaborPlaneDetails = () => {
  data.laborPlaneDetailsDialogVisibale = true;
};

//查看详细关闭
const handleCloseLaborPlaneDetails = () => {
  data.laborPlaneDetailsDialogVisibale = false;
};

//确认发布
const handleSubmit = () => {
  console.log(detailParams.value);
}

</script>

<style scoped lang="scss"></style>
