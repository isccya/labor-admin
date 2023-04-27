<template>
  <div class="detail">
    <div class="header">
      <div
          style="width: 30px;height: 30px;border-radius: 15px;border: 1px solid #d2cccc;margin-right: 30px;cursor: pointer"
          @click="router.push('/audit/waitAudit')">
        <el-icon style="margin-top: 6px;margin-left: 5px">
          <ArrowLeftBold/>
        </el-icon>
      </div>
      <div class="main-selfInfo">
        <div class="selfInfoItem">
          <span style="margin-right: 10px">选择学期:</span>
          <span>
                <el-select style="width: 150px" v-model="personalQueryParams.term">
                  <el-option v-for="item in option.term" :key="item.termId" :label="item.termName"
                             :value="item.termId"></el-option>
                </el-select>
              </span>
        </div>
        <div class="selfInfoItem">
          <span class="label">姓名:</span>
          <span class="value">{{ peronalInfo.nickName }}</span>
        </div>
        <div class="selfInfoItem">
          <span class="label">学院:</span>
          <span class="value">{{ peronalInfo.collegeName }}</span>
        </div>
        <div class="selfInfoItem">
          <span class="label">班级:</span>
          <span class="value">{{ peronalInfo.className }}</span>
        </div>
        <div class="selfInfoItem">
          <span class="label">学号:</span>
          <span class="value">{{ peronalInfo.userId }}</span>
        </div>
        <div class="selfInfoItem">
          <span class="label">年级:</span>
          <span class="value">{{ peronalInfo.grade }}</span>
        </div>
        <div class="selfInfoItem">
          <span class="label">成绩:</span>
          <span class="value">{{ peronalInfo.level }}</span>
        </div>
        <div class="selfInfoItem">
          <el-button type="primary" @click="showMakeGrade">评分</el-button>
        </div>
      </div>
    </div>

    <div class="aside-main">
      <el-row style="height: 100%">
        <!--        侧边-->
        <el-col :span="5">
          <div class="aside">
            <div class="aside-header">类型</div>
            <div class="aside-item" @click="toggleCategory(1)">
              全部
            </div>
            <div class="aside-item" @click="toggleCategory(2)">
              日常劳动记录
            </div>
            <div class="aside-item" @click="toggleCategory(3)">
              集中实践劳动记录
            </div>
            <div class="aside-item" @click="toggleCategory(4)">
              其他劳动记录
            </div>
            <div class="aside-item" @click="toggleCategory(5)">
              社会实践劳动记录
            </div>
          </div>
        </el-col>
        <!--        main-->
        <el-col :span="19">
          <div class="main">
            <el-table :data="list" stripe>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="id" width="50" align="center" prop="userId"></el-table-column>
              <el-table-column label="类型" align="center" prop="laborKind"></el-table-column>
              <el-table-column label="学期" align="center" prop="term"></el-table-column>
              <el-table-column label="检查人" align="center" prop="checkPerson"></el-table-column>
              <el-table-column label="劳动时间" align="center" prop="data"></el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="primary" plain @click="showLookDetail(scope)">详细</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--    评分弹出框-->
    <el-dialog draggable v-model="data.makeGradeDialogVisible" title="评分" width="30%" :before-close="closeMakeGrade">
      <el-form label-position="left">
        <el-form-item label="分数">
          <el-select v-model="data.peronalInfo.score" class="audit-select" placeholder="请选择等级"
                     size="default"
          >
            <el-option v-for="item in option.score" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="评语">
          <el-input v-model="data.peronalInfo.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeMakeGrade">取消评分</el-button>
          <el-button type="primary" @click="makeGrade">
            确认评分
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!--    详细弹出框-->
    <el-dialog draggable v-model="data.lookDetailDialogVisible" title="劳动记录详细" width="30%"
               :before-close="closeLookDetail">
      <span>
        <el-input type="textarea" v-model="data.detail" disabled></el-input>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeLookDetail">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
//#region import
import {reactive, toRefs} from "vue";
import {useRouter, useRoute} from "vue-router";
import {
  getPersonalAuditList,
  getAuditList,
  makePersonalGrade,
  getLaborRecordList,
  getLaborRecordDetail,
} from "@/api/audit";
import {getTermListOption} from "@/api/selectOption";
import {ElMessage} from "element-plus";

const router = useRouter();
//#endregion

//#region data
const data = reactive({
  makeGradeDialogVisible: false,//评分弹出框
  lookDetailDialogVisible: false,//详细弹出框
  list: [
    {
      checkPerson: "张三",
      data: "2023-01-01 00:00:00",
      laborContent: null,
      laborKind: 1,
      photo: null,
      planId: null,
      recordId: 1,
      term: "19201",
      userId: null,
    },
  ],
  option: {
    term: [
      {
        endTime: "2019-01-31 00:00:00",
        startTime: "2018-07-01 00:00:00",
        termId: 18191,
        termName: "2018-2019-1",
      },
    ],
    score: [
      {label: "优秀", value: 90},
      {label: "良好", value: 80},
      {label: "中等", value: 70},
      {label: "及格", value: 60},
      {label: "不及格", value: 30},
    ],
  },
  //个人审核查询参数
  personalTotal: 100,
  personalQueryParams: {
    term: "",
    pageNum: 1, //当前页码
    pageSize: 10, //页码显示数
  },
  //个人信息
  peronalInfo: {
    "userId": 0,
    "userName": "string",
    "nickName": "string",
    "classId": 0,
    "className": "string",
    "deptId": 0,
    "collegeId": 0,
    "collegeName": "string",
    "sex": "string",
    "grade": "string",
    "score": 0,
    "isConfirm": 0,
    "level": "string",
    "reason": "string",
    "confirmUserId": 0,
    "confirmUserName": "string",
  },
  // 详细信息
  detail: "",
})
//#endregion

const {list, personalQueryParams, peronalInfo, option} = toRefs(data);

//#region 页面流程
//
const getList = () => {
  // const id = useRoute().query.id;
  // console.log(useRoute().query.id);
  // 获取学期下拉框
  getTermListOption().then(res => {
    // console.log(res)
    data.option.term = res;
    data.option.term.forEach(item => {
      // console.log(item)
      var tempArr = item.termName.split("-");
      item.termName = `${tempArr[0]}-${tempArr[1]}学年-第${tempArr[2]}学期`;
    })
  })
  //TODO: 写死的id因为别人的id没有信息 获取个人信息
  getPersonalAuditList(90658).then(res => {
    // console.log(res.data)
    data.peronalInfo = res.data;
    //获取列表
    //TODO: 同理没有其他ID
    getLaborRecordList(101).then(res => {
      console.log(res);
      data.list = res.data;
      data.list.forEach((ele) => {
        data.option.term.forEach((item) => {
          // console.log("item.termId",item.termId.toString())
          // console.log("ele.term",ele.term)
          if (item.termId.toString() === ele.term) {
            // console.log("@@@@")
            ele.term = item.termName;
            console.log(item.termName)
          }
        })
      })
    })
  })
}
getList();

//show评分
const showMakeGrade = () => {
  data.makeGradeDialogVisible = true;

}

//关闭评分
const closeMakeGrade = () => {
  data.makeGradeDialogVisible = false;
}

//评分
const makeGrade = () => {
  let getlever = () => {
    if (data.peronalInfo.score >= 90) {
      return "优秀"
    } else if (data.peronalInfo.score >= 80) {
      return "良好"
    } else if (data.peronalInfo.score >= 70) {
      return "一般"
    } else if (data.peronalInfo.score >= 60) {
      return "及格"
    } else if (data.peronalInfo.score) {
      return "不及格"
    }
  }
  let temp = {
    "userId": data.peronalInfo.userId,
    "userName": data.peronalInfo.userName,
    "nickName": data.peronalInfo.nickName,
    "classId": data.peronalInfo.classId,
    "className": data.peronalInfo.className,
    "deptId": data.peronalInfo.deptId,
    "collegeId": data.peronalInfo.collegeId,
    "collegeName": data.peronalInfo.collegeName,
    "sex": data.peronalInfo.sex,
    "grade": data.peronalInfo.grade,
    "score": data.peronalInfo.score,
    "isConfirm": data.peronalInfo.isConfirm,
    "level": getlever(),
    "reason": data.peronalInfo.reason,
  };
  console.log(temp)
  makePersonalGrade(temp).then(res => {
    console.log(res);
    ElMessage.success("评分成功!");
    closeMakeGrade();
    getList();
  })
}

//show详细
const showLookDetail = (scope) => {
  data.lookDetailDialogVisible = true;
  console.log(scope);
  getLaborRecordDetail(scope.row.recordId).then(res => {
    data.detail = res.data.laborContent;
  })
}
//关闭详细
const closeLookDetail = () => {
  data.lookDetailDialogVisible = false
}

//切换分类
const toggleCategory = (category) => {
  console.log(category);
}

//#endregion
</script>

<style scoped lang="scss">
.header {
  display: flex;

  .main-selfInfo {
    display: flex;
    flex-wrap: wrap;

    .selfInfoItem {
      padding-left: 10px;
      padding-right: 10px;
      border-right: 2px solid #d1d1d1;

      .value {
        font-weight: 700;
      }
    }
  }
}

.detail {
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  height: 100%;
  right: 0;
  left: 0;

  .header {
    //background-color: red;
    margin-bottom: 10px;
    padding: 20px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;

    .main-selfInfo {
      .selfInfoItem {
        line-height: 30px;
      }
    }
  }

  .aside-main {
    flex: 1;
    //background-color: red;
    //height: 100%;

    .aside {
      //background-color: green;
      margin-right: 10px;
      padding: 10px;
      border: 1px solid #d1d1d1;
      border-radius: 5px;
      height: 100%;

      .aside-header {
        height: 50px;
        border: 1px dashed #d1d1d1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .aside-item {
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-bottom: 1px dashed #d2cccc;
        padding-left: 10px;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }

    .main {
      //background-color: orange;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
      height: 100%;
    }

  }
}
</style>
