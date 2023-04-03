<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { scrollTo } from "@/utils/scroll-to";
import { computed } from "vue";

const props = defineProps({
  //数据总数
  total: {
    required: true,
    type: Number,
  },
  //当前第几页
  page: {
    type: Number,
    default: 1,
  },
  //限制页面显示条数
  limit: {
    type: Number,
    default: 20,
  },
  //页面显示条数组
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    },
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7,
  },
  //显示的组件
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  // 背景
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits();

//当前页
const currentPage = computed({
  get() {
    return props.page;
    // return this.page;
  },
  set(val) {
    emit("update:page", val);
  },
});

//显示条数
const pageSize = computed({
  get() {
    return props.limit;
    // return this.limit;
  },
  set(val) {
    emit("update:limit", val);
  },
});

function handleSizeChange(val) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1;
  }
  emit("pagination", { page: currentPage.value, limit: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}

function handleCurrentChange(val) {
  emit("pagination", { page: val, limit: pageSize.value });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style scoped>
.pagination-container {
  background: transparent;
  padding: 32px 16px;
  position: relative;
  right: 45px;
}

.pagination-container.hidden {
  display: none;
}
</style>
