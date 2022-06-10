<script lang="ts" setup>
import { mainStore } from '@/store/mian'
import { ref } from 'vue'
import { getPhoneLogin, getUserInfo } from "@/network/api/home"
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = mainStore()
const { isLogin, token, user } = storeToRefs(store)
const phone = ref<string>()
const password = ref<string>()
const login = async() => {
  const res = await getPhoneLogin({phone:phone.value, password:password.value})
  console.log(res)
  if(res.data.code === 200) {
    token.value = res.data.token
    localStorage.setItem("token",JSON.stringify(res.data.token))

    let result = await getUserInfo(res.data.account.id)
    console.log(result)
    user.value = result.data.profile
    localStorage.setItem("user",JSON.stringify(result.data.profile))

    router.push('/userInfo')
    isLogin.value = true
  }else {
    alert("手机号或者密码错误")
    password.value = ""
  }
}
</script>

<template>
  <div class="login">
    <h1>欢迎登录</h1>
    <div class="input">
      <input type="text" placeholder="请输入手机号" v-model="phone">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="btn">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding-top: 1.6rem;
  background-color: rgb(201, 90, 90);
  h1 {
    text-align: center;
    color: #fff;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .input {
    width: 100%;
    input {
      display: block;
      width: 80%;
      height: 0.8rem;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
  .btn {
    width: 100%;
    
    button {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>