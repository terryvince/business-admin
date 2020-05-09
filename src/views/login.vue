<template>
  <div class="login flex-main-center">
    <div class="login-wrap">
      <div class="fs-34 txt-bold">商户系统登录</div>
      <el-form
        :label-position="labelPosition"
        label-width="60px"
        :model="loginForm"
        :style="'margin-top:20px'"
      >
        <el-form-item label="账号">
          <el-input
            v-model="loginForm.username"
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- suffix-icon="el-icon-s-cooperation" -->
        <el-form-item label="密码">
          <el-input
            v-model="loginForm.password"
            show-password
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item size="medium">
          <div class="flex-main-start">
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <!-- <el-button>注册</el-button> -->
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
.login {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: url('../assets/login-bg.jpg') no-repeat center;
  background-size: cover;
}
.login-wrap {
  min-height: 360px;
  min-width: 420px;
  padding: 40px;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
<script>
import { postLogin } from '@/servers/request';
import { mapMutations } from 'vuex';
export default {
  name: 'login',
  components: {},
  data: function() {
    return {
      labelPosition: 'left',
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapMutations({
      toggleLayout: 'toggleLayout',
      toggleLogin: 'toggleLogin'
    }),
    onSubmit() {
      postLogin(this.loginForm)
        .then(res => {
          if (res.data.ec == 200) {
            this.toggleLogin(res.data.data);
            this.toggleLayout();
            this.$message({
              message: '登录成功!',
              type: 'success'
            });
            this.$router.push({ path: '/count' });
          } else {
            this.$message.error(res.data.em);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
