<template>
  <div class="app-container">
    <!--model跟ref对应data中的数据，prop是对应属性名，跟规则名一样-->
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">

      <el-form-item label="用户名" prop="username" >
        <el-input v-model="user.username" width="120"></el-input>
      </el-form-item>

      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="mobile">
        <el-input
          type="text"
          placeholder="请输入手机号码"
          v-model="user.mobile"
          maxlength="11"
          minlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>

      <!--头像-->

      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="updateUser('user')">保存</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import userApi from '@/api/user'

  export default {
    data() {
      return {
        types: null,
        user: {},
        rules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'},
            // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请填写昵称', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: '请填写手机号码', trigger: 'blur'},
            {min:11,max:11,message:'手机号必须为11位',trigger: 'blur'}
          ],
        },
        saveBtnDisabled: false //保存按钮只能按一次
      }
    },
    created() { //第一次跳转才执行，
      this.init()
    },
    watch:{ //监听路由变化
      $route(to,from){ //路由发生变化时，执行方法
        this.init()
      }
    },
    methods: {
      updateUser(formName){ //修改方法
        this.$refs[formName].validate((valid)=>{
          if(valid){ //验证通过
            userApi.updateUser(this.user).then(response=>{
              //提示信息
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              //回到列表页面 路由跳转
              this.$router.push({path: '/user/table'})
            })
          } else{
            console.log("提交失败");
            return false;
          }
        })

      },

      getInfo(id){ // 修改时回显数据的方法
        userApi.getUserInfo(id).then(response=>{
          this.user=response.data.user
        })
      },
      resetData() { //清空表单的数据
        this.user = {}
      },
      init(){ //把相同的代码抽取出来
        // 判断路径中是否有id值来回显数据
        if(this.$route.params && this.$route.params.id){
          const id=this.$route.params.id
          this.getInfo(id)
        }else{ //清空表单
          this.user = {}
        }
      }
    }
  }
</script>

