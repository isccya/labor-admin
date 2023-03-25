<template>
  <div class="detail">
    <div class="header">
      <div class="main-selfInfo">
        <el-row :gutter="0" class="row">
          <div
              style="width: 30px;height: 30px;border-radius: 15px;border: 1px solid #d2cccc;margin-right: 30px;cursor: pointer">
            <el-icon style="margin-top: 6px;margin-left: 5px">
              <ArrowLeftBold/>
            </el-icon>
          </div>
          <el-col :span="2">
            <div class="selfInfoItem">
              <span class="label">姓名:</span>
              <span class="value">张三</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="selfInfoItem">
              <span class="label">学院:</span>
              <span class="value">计算科学与工程学院</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="selfInfoItem">
              <span class="label">班级:</span>
              <span class="value">软件二班</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="selfInfoItem">
              <span class="label">学号:</span>
              <span class="value">200220020202</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="selfInfoItem">
              <span class="label">年级:</span>
              <span class="value">20</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="selfInfoItem">
              <span class="label">成绩:</span>
              <span class="value">无</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="selfInfoItem">
              <el-button type="primary">评分</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="aside-main">
      <el-row style="height: 100%">
        <el-col :span="5">
          <div class="aside">
            <div class="aside-header">类型</div>
            <div class="aside-item">
              全部
            </div>
            <div class="aside-item">
              日常劳动记录
            </div>
            <div class="aside-item">
              集中实践劳动记录
            </div>
            <div class="aside-item">
              其他劳动记录
            </div>
            <div class="aside-item">
              社会实践劳动记录
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="main">
            <el-table :data="list" stripe>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column label="id" width="50" align="center" prop="id"></el-table-column>
              <el-table-column label="类型" align="center" prop="category"></el-table-column>
              <el-table-column label="学期" align="center" prop="term"></el-table-column>
              <el-table-column label="检查人" align="center" prop="checkPerson"></el-table-column>
              <el-table-column label="劳动时间" align="center" prop="laborTime"></el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="primary" plain>详细</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {reactive, toRefs} from "vue";

const data = reactive({
  list: [
    {
      id: 0,
      category: "集中实践劳动记录",
      term: "第一学期",
      checkPerson: "张三",
      laborTime: "2022-10-1",
    },
    {
      id: 0,
      category: "集中实践劳动记录",
      term: "第一学期",
      checkPerson: "张三",
      laborTime: "2022-10-1",
    },
    {
      id: 0,
      category: "集中实践劳动记录",
      term: "第一学期",
      checkPerson: "张三",
      laborTime: "2022-10-1",
    },
  ],
})

const {list} = toRefs(data);

</script>

<style scoped lang="scss">
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
