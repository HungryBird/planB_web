<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">管理员登陆页面</h3>
            </div>
            <el-form-item prop="Name">
                <span class="svg-container">
                    <font-awesome-icon :icon="['fas', 'user']" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.Name"
                    placeholder="用户名"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="大写锁定打开" placement="right" manual>
                <el-form-item prop="Password">
                    <span class="svg-container">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                    <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.Password"
                    :type="passwordType"
                    placeholder="密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                    <font-awesome-icon :icon="passwordType === 'password' ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-row :gutter="0">
                <el-col :span="19">
                    <el-form-item prop="Verification">
                        <el-input
                        placeholder="请输入验证码"
                        v-model="loginForm.Verification" />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-tooltip content="点击切换验证码">
                        <el-image :src="verificationImg" @click="getVerificationImg" fit="contain" style="height: 47px;width: 100%;">
                        </el-image>
                    </el-tooltip>
                </el-col>
            </el-row>
            <div style="margin-bottom: 30px;text-align: left;">
                <el-checkbox v-model="remeber" @change="toRemeber">记住密码</el-checkbox>
            </div>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
            <!-- <el-button type="primary" style="width:100%;margin-bottom:30px;margin-left: 0 !important;" @click="showDialog=true">第三方登录</el-button> -->
        </el-form>
        <el-dialog title="Or connect with" :visible.sync="showDialog">
            Can not be simulated on local, so please combine you own business simulation! ! !
            <br>
            <br>
            <br>
            <social-sign />
        </el-dialog>
  </div>
</template>

<script>
import ajax from '@/api/login/index'
import SocialSign from './components/SocialSignin'

export default {
    name: 'Login',
    components: { SocialSign },
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'))
            } else {
                callback()
            }
        }
        const validateVerification = (rule, value, callback) => {
            if (value.length !== 4) {
                callback(new Error('验证码长度为4位'))
            }
            else {
                callback();
            }
        }
        return {
            loginForm: {
                Name: '',
                Password: '',
                Verification: '',
            },
            loginRules: {
                Name: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
                Password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                Verification: [{required: true, trigger: 'blur', validator: validateVerification}]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
            remeber: false,
            verificationImg: '',
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                const query = route.query
                if (query) {
                    this.redirect = query.redirect
                    this.otherQuery = this.getOtherQuery(query)
                }
            },
            immediate: true
            
        }
    },
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus()
        }
        this.getVerificationImg();
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        getVerificationImg() {
            const date = new Date();
            const stamp = date.getTime();
            ajax.captChaUser({stamp}).then(res => {
                this.verificationImg = res;
            })
            // this.verificationImg = `/api/CaptCha/UserLogin?stamp=${stamp}`
        },
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true
                } else {
                    this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    ajax.AdminLogin(this.loginForm).then((res) =>{
                        if (res.Success) {
                            const data = {
                                Modular: res.Modular,
                                Id: res.Id,
                                Name: this.loginForm.Name,
                            }
                            this.$store.dispatch('loginInit', data).then(() => {
                                try{
                                    this.$router.push('/');
                                    this.$message.success(res.Msg);
                                }
                                catch(err) {
                                    console.error(err);
                                }
                            }).catch((err) => {
                                console.error('登录失败！' + toString(err));
                            })
                        }
                        else {
                            this.$message.error(res.Msg);
                        }
                        this.loading = false;
                    })
                } else {
                    return false
                }
            })
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        },
        toRemeber(value) {
            if (value) {
                // 
            }
            else {
                // 
            }
        }
    }
}
</script>

<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
