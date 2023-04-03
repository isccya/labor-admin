<template>
  <div class="app-container">
    <!-- 实时数据 -->
    <div class="index-title">
      <span>实时数据</span>
      <span>{{ timeData }}</span>
      <!-- svg -->
      <el-icon class="icon">
        <QuestionFilled />
      </el-icon>
    </div>
    <!-- 关键指标 -->
    <div class="keyIndicators">
      <div class="keyIndicators-title">关键指标</div>
      <div class="keyIndicators-main">
        <el-row :gutter="0">
          <el-col :span="8">
            <div class="keyIndicators-item">
              <div class="item-title">浏览量</div>
              <div class="item-number">{{ views }}</div>
              <div class="item-change">
                {{ increaseOverYesterday }}
              </div>
            </div>
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="8">
            <div class="keyIndicators-item">
              <div class="item-title">浏览量</div>
              <div class="item-number">{{ views }}</div>
              <div class="item-change">
                {{ increaseOverYesterday }}
              </div>
            </div>
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="8">
            <div class="keyIndicators-item">
              <div class="item-title">浏览量</div>
              <div class="item-number">{{ views }}</div>
              <div class="item-change">
                {{ increaseOverYesterday }}
              </div>
            </div>
            <div class="grid-content ep-bg-purple" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup name="Index">
const timeData = `13:00:00`; //实时时间
const views = `258`; //浏览量
const increaseOverYesterday = `120%`; //较昨日增长
</script>

<style scoped lang="scss">
.index-title {
  height: 55px;
  line-height: 55px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #101010;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 15px;

  span {
    margin-right: 10px;
  }
  .icon {
    cursor: pointer;
  }
}

.keyIndicators {
  .keyIndicators-title {
    width: 1110px;
    height: 40px;
    background-color: #efefef;
    line-height: 40px;
    padding-left: 33px;
    margin-left: 18px;
    margin-bottom: 15px;
  }
  .keyIndicators-main {
    margin-left: 35px;
  }
  .keyIndicators-item {
    border: 1px solid #efefef;
    display: flex;
    flex-direction: column;
    padding: 35px 0 0 40px;
    width: 277px;
    height: 153px;
  }
}
</style>

