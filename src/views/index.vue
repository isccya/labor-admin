<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always" class="flex justify-center">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Daily active users
                  <el-tooltip effect="dark" content="Number of users who logged into the product in one day"
                    placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" class="flex justify-center">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Daily active users
                  <el-tooltip effect="dark" content="Number of users who logged into the product in one day"
                    placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" class="flex justify-center">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Daily active users
                  <el-tooltip effect="dark" content="Number of users who logged into the product in one day"
                    placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="mt-10 p-2">
            <el-card>
              <template #header>
                <div class="text-1.25rem font-600">
                  用户统计
                </div>
              </template>
              <el-row :gutter="14">
                <el-col :span="12" class="text-center">
                  <el-progress type="circle" :percentage="100" status="success" />
                </el-col>
                <el-col :span="12" class="text-center">
                  <el-progress type="circle" :percentage="100" status="success" />
                </el-col>
              </el-row>
            </el-card>
          </div>
  </div>
</template>

<script setup name="Index">

</script>

<style scoped lang="scss">
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}

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
    width: 90%;
    height: 40px;
    background-color: #efefef;
    line-height: 40px;
    padding-left: 33px;

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

