<template>
  <div class="code-login">
    <div class="login-form">
        <h3 class="title">劳务系统后台管理系统</h3>
            <div class="qr_login" id="qr_login"></div>
        <div class="qr_return">
          <router-link class="link-type" :to="'/login'">使用账号密码登录</router-link>
        </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Hunan University of Science & Technology</span>
    </div>
  </div>
</template>

<script setup>
    onMounted(()=>{
      Login();
    }) 
    const Login = ()=>{
      new WwLogin({
          "id": "qr_login" ,
          "appid": "wwaefefd6969bc87ee", 
          "agentid" :"1000002",
          "redirect_uri" : encodeURI("https://jwc.hnust.edu./"),
          "state": "hellowesom",
          "href": "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4OyBiYWNrZ3JvdW5kOmJsYWNrfQ0KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMjAwcHg7fQ0KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30=",
          "lang":"zh",
        })
      }
</script>

<style lang='scss' scoped>
.code-login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  height: 400px;
  padding: 25px 25px 5px 25px;
  margin-left: 0px;
}
.title {
  margin: 0px auto 0px auto;
  text-align: center;
  color: #707070;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.qr_login{
    width: 200px;
    height: 200px;
    margin-left: 6%;
    // border: 1px solid black;
}
.qr_return{
  position: absolute;
  float: left; 
  margin-top: 108px; 
  z-index:9999;
}
</style>