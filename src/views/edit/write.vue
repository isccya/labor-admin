<template>
  <div class="index">
    <div class="head">
      <el-icon><Tickets /></el-icon>
      <span>通知内容</span>
    </div>
    <div class="item">
      <el-icon class="icon"><EditPen /></el-icon>&nbsp;
      <el-input
        v-model="formData.noticeTheme"
        class="w-50 m-2"
        placeholder="通知主题"
      />
    </div>
    <div class="write">
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 450px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup name="Write">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, inject, reactive, onUpdated } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const props = defineProps({
  isComplete: {
    type: Boolean,
    default: false
  }
})

// 表单信息
const formData = reactive({
  noticeTheme: '', //通知主题
  noticeContent: '' // 通知内容
})
// 使用emit向父组件传递数据
const emit = defineEmits(['ok'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
// mode
const mode = ref('default')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
function handleChange (editor) {
  formData.noticeContent = editor.getText()
  emit('ok', formData)
}
// 子组件监听父组件的isComplete,清空输入
watch(() => props.isComplete, (nweProps) => {
  formData.noticeTheme = ''
  valueHtml.value = ''
})
</script>    

<style lang="scss" scoped>
.index {
  height: 670px;
  width: 1142px;
}
.head {
  span {
    margin-left: 20px;
  }
  position: relative;
  left: 20px;
  top: 20px;
  width: 200px;
  height: 26px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.item {
  position: relative;
  top: 30px;
  left: 67px;
  width: 350px;
  height: 70px;
  margin-right: 200px;
}
.write {
  position: relative;
  left: 67px;
  top: 33px;
  width: 763px;
  height: 450px;
  background-color: rgba(237, 241, 242, 1);
}
</style>