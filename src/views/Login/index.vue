<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in mneuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="model==='register'">
          <label>确认密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input
                v-model="ruleForm.code"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block"> 获取验证码 </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripcsript, validateEmail ,validatePwd,validateCodes} from "@/utils/validate";
export default {
  name: "login",
  components: {},
  data() {
    // 正则验证邮箱
    var validateusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!validateEmail(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    //密码验证
    var validatePassword = (rule, value, callback) => {
      //过滤特殊字符后的一个数据
      this.ruleForm.password=stripcsript(value);
      value=this.ruleForm.password;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (!validatePwd(value)) {
        callback(new Error("密码喂6至20位字符加字母"));
      } else {
        callback();
      }
    };
    //确认密码验证
    var validatePasswords = (rule, value, callback) => {
      //如果使用 v-show 呢么要做判断
      // if(this.model==="login"){callback()}
      //过滤特殊字符后的一个数据
      this.ruleForm.passwords=stripcsript(value);
      value=this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入确认密码"));
      } else if (value !=this.ruleForm.password ) {
        callback(new Error("确认密码与原密码不符"));
      } else {
        callback();
      }
    };
    //验证码验证
    var validateCode = (rule, value, callback) => {
      //过滤特殊字符后的一个数据
      
      this.ruleForm.code=stripcsript(value);
      value=this.ruleForm.code;
      console.log(value);
     if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (!validateCodes(value)) {
        return callback(new Error("验证码有误"));
      } else {
        callback();
      }
    };
    return {
      mneuTab: [
        { txt: "登录", current: true ,type:"login" },
        { txt: "注册", current: false ,type:"register" },
      ],
      //区别登陆注册 模块值
      model:"Login",
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords:"",
        code: "",
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  created() {},
  //挂载完成后自动执行
  mounted() {},
  //写函数的地方
  methods: {
    toggleMneu(data) {
      this.mneuTab.forEach((elem) => {
        elem.current = false;
      });
      //高光
      data.current = true;
      //修改模块值
      this.model=data.type;
      //清空文本框
      this.ruleForm.username= "",
      this.ruleForm.password="",
      this.ruleForm.passwords="",
      this.ruleForm.code= "";
    },
    //表单方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  props: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
//scoped 表示局部应用此样式
#login {
  background: plum;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
