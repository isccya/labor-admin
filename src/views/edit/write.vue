<template>
  <div class="index">
    <div class="head">
      <el-icon><Tickets /></el-icon>
      <span>通知内容</span>
    </div>
    <div class="item">
      <el-icon class="icon"><EditPen /></el-icon>&nbsp;
      <el-input v-model="formData.theme" class="w-50 m-2" placeholder="通知主题" />
    </div>
    <div class="write">
        <div style="border: 1px solid #ccc;">
          <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            style="border-bottom: 1px solid #ccc"
          />
          <Editor
            :defaultConfig="editorConfig"
            :mode="mode"
            v-model="formData.valueHtml"
            style="height: 450px; overflow-y: hidden"
            @onCreated="handleCreated"
            @onChange="handleChange"
            @onDestroyed="handleDestroyed"
            @onFocus="handleFocus"
            @onBlur="handleBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
          />
        </div>
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
export default{
  components:{Editor, Toolbar},
  data(){
    return {
      formData:[
        {
          valueHtml: "",
          theme: "",
        }
      ]
    }
  },
  methods: {
    // 通过$emit监听父组件的事件，子组件向父组件传数据
    getVal(){
         this.$emit("ok",this.formData);
      }
  },
  // 在页面数据更新时执行
  updated(){
    this.getVal();
  },

  //富文本编辑器的相关函数
  setup() {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();
    const toolbarConfig = {};
    const editorConfig = { placeholder: '请输入内容...' };

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.destroy();
    });

    // 编辑器回调函数
    const handleCreated = (editor) => {
      console.log('created', editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      console.log('change:', editor.getHtml());
    };
    const handleDestroyed = (editor) => {
      console.log('destroyed', editor);
    };
    const handleFocus = (editor) => {
      console.log('focus', editor);
    };
    const handleBlur = (editor) => {
      console.log('blur', editor);
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      console.log('ClipboardEvent 粘贴事件对象', event);

      // 自定义插入内容
      editor.insertText('xxx');

      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(false); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    };

    const insertText = () => {
      const editor = editorRef.value;
      if (editor == null) return;

      editor.insertText('hello world');
    };

    const printHtml = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      console.log(editor.getHtml());
    };

    const disable = () => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.disable()
    };

    return {
      editorRef,
      mode: 'default',
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
    };
  },
}

</script>

<style lang="scss" scoped>
.index{
  height: 670px;
  width: 1142px;
}
.head{
  span{
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
.item{
  position: relative;
  top:30px;
  left: 67px;
  width: 350px;
  height: 70px;
  margin-right: 200px;
}
.write{
  position: relative;
  left: 67px;
  top:33px;
  width: 763px;
  height: 535px;
  background-color: rgba(237, 241, 242, 1);
  border: 2px solid rgba(187, 187, 187, 1);
}
</style>