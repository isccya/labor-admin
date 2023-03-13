<template>
  <div class="list">
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe class="table">
          <el-table-column type="index" label="序号" width="100" align="center" header-align="center"/>
          <el-table-column prop="name" label="姓名" width="180" align="center" header-align="center"/>
          <el-table-column prop="grade" label="年级" width="260" align="center" header-align="center"/>
          <el-table-column prop="tel" label="联系方式" width="180" align="center" header-align="center"/>
          <el-table-column prop="department" label="院系" width="180" align="center" header-align="center"/>
          <el-table-column  label="操作" style="margin-left:90px" align="center" header-align="center">
            <template #default>
              <div>
                <el-button>修改</el-button>
                <el-button>删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="pagination">
          <div class="demo-pagination-block">
              <el-pagination
                v-model:current-page="currentPage4"
                v-model:page-size="pageSize4"
                :page-sizes="[2, 5, 8, 12]"
                :small="small"
                :disabled="disabled"
                background="background"
                layout="total, prev, pager, next, sizes, jumper"
                :total="datas.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
          </div>
        </div>
  </div>
  
</template>

<script>
import dates from '@/store/student.json'
export default {
    data () {
    const datas = dates.tableData
    const status = dates.status
    const statusspace = dates.statusspace
    const selectdata = dates.selectdata
    const optiondata = dates.optiondata
    const tableData = dates.tableData
    return {
      datas,
      status,
      statusspace,
      selectdata,
      optiondata,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableData
    }
  },
  methods: {
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    remoteMethod () {
      let m = 0
      this.stu = this.statusspace
      this.dep = this.selectdata.com1
      this.maj = this.selectdata.com2
      const istatus = this.stu
      const idepartment = this.dep
      const imajor = this.maj
      const igrade = this.selectdata.com3
      if (istatus && idepartment && imajor && igrade) {
        this.tableData = []
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status === istatus && this.datas[i].department === idepartment && this.datas[i].major === imajor && this.datas[i].grade === igrade) {
            console.log('yes')
            this.tableData[m] = this.datas[i]
            m = m + 1
          }
        }
      } else if (istatus && idepartment && imajor) {
        this.tableData = []
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status === istatus && this.datas[i].department === idepartment && this.datas[i].major === imajor) {
            console.log('yes')
            this.tableData[m] = this.datas[i]
            m = m + 1
          }
        }
      } else if (istatus && idepartment) {
        this.tableData = []
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status === istatus && this.datas[i].department === idepartment) {
            console.log('yes')
            this.tableData[m] = this.datas[i]
            m = m + 1
          }
        }
      } else if (idepartment) {
        this.tableData = []
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].department === idepartment) {
            console.log('yes')
            this.tableData[m] = this.datas[i]
            m = m + 1
          }
        }
      }
      this.dep = idepartment // 返回上次调用时的值，下次在调用可以进行叠加筛选
      this.stu = istatus
      this.maj = imajor
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
    position: relative;
    left: 90px;
    top: 5px;
    width: 1174px;
    height: 920px;
    line-height: 20px;
    border-radius: 5px 5px 5px 5px;
    background-color: rgba(255, 255, 255, 1);
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(238, 238, 238, 1);
}
.table{
  width: 100%;
  height: 711px;
}
.pagination {
  position:relative;
  left:115px;
  width: 773px;
}
</style>