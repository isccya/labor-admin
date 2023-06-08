<template>
  <div>
    <div class="header">
      <h1>xxx学院劳动计划</h1>
      <el-button class="buttonConform" style="margin-left: 50px;" type="primary">确认发布</el-button>
    </div>
    <el-form class="form" style="" label-width="170px" label-position="left">
      <!--      学期-->
      <h3>
        <el-icon>
          <Calendar />
        </el-icon>
        学期
      </h3>
      <el-form-item label-width="0" label="">
        <el-select v-model="queryParams.termName" placeholder="请选择" @change="changeTerm">
          <el-option v-for="item in data.option" :key="item.termId" :label="item.termName" :value="item.termName" />
        </el-select>
      </el-form-item>
      <!--      指导老师-->
      <h3>
        <el-icon>
          <Avatar />
        </el-icon>
        指导老师
      </h3>
      <el-form-item label-width="0" label="">
        <el-input v-model="queryParams.mentor" placeholder="" style="width: 200px;"></el-input>
      </el-form-item>
      <br>
      <!--      劳动内容-->
      <h3>
        <el-icon>
          <List />
        </el-icon>
        劳动内容
      </h3>
      <el-form-item label="(1)日常劳动记录">
        <el-input style="width: 200px" v-model="queryParams.dailyLabor" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="(2)集中实践劳动记录">
        <el-input style="width: 200px" v-model="queryParams.collectiveLabor" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="(3)其他劳动记录">
        <el-input style="width: 200px" v-model="queryParams.otherLabor" placeholder="请输入"></el-input>
      </el-form-item>
      <!-- <el-form-item label="(4)添加图片">
        <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                   :show-file-list="false" style="border: 1px dashed #dcdfe6;">
          <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item> -->
    </el-form>
  </div>
</template>