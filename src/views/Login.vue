<script lang="ts" setup>
import { mainStore } from '@/store/mian';
import { ref } from 'vue'
import { getPhoneLogin } from "@/network/api/home"
import console from 'console';

const store = mainStore()
const phone = ref<number>()
const password = ref<number>()
const login = async() => {
  const res = await getPhoneLogin({phone, password})
  console.log(res)
  // console.log(phone, password)
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