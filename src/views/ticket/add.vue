<template>
  <div class="app-container">
    <!--model跟ref对应data中的数据，prop是对应属性名，跟规则名一样-->
    <el-form :model="ticket" :rules="rules" ref="ticket" label-width="100px" class="demo-ruleForm">
      <el-form-item label="演出ID" >
        <el-input v-model="ticket.showId" width="70" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="演出名称" >
        <el-input v-model="ticket.showName" width="120" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="座位类型" prop="seatType">
        <el-input v-model="ticket.seatType" width="120"></el-input>
      </el-form-item>
      <el-form-item label="座位价格" prop="seatPrice">
        <el-input v-model="ticket.seatPrice" type="number" min=1></el-input>
      </el-form-item>
      <el-form-item label="总票量" prop="seatNumber">
        <el-input v-model="ticket.seatNumber" type="number" min=1></el-input>
      </el-form-item>
      <el-form-item label="开售时间" prop="sellTime">
        <el-date-picker v-model="ticket.sellTime" type="datetime" placeholder="选择开售时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="演出时间" prop="showTime">
        <el-input v-model="ticket.showTime" width="120" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="createTicket('ticket')">添加</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ticketApi from '@/api/ticket'
  import showApi from '@/api/show'
  export default {
    data() {
      return {
        ticket: {},
        rules: {
          seatType: [
            {message: '请填写座位类型', trigger: 'blur'},
          ],
          seatPrice: [
            {required: true, message: '请填写座位价格'},
          ],
          seatNumber: [
            {required: true, message: '请填写座位总数'},
          ],
          sellTime: [
            {required: true, message: '请选择开售日期'}
          ]
        },
        saveBtnDisabled: false //保存按钮只能按一次
      }
    },
    created() { //第一次跳转才执行，
      this.init()
    },
    watch: { //监听路由变化
      $route(to, from) { //路由发生变化时，执行方法
        this.init()
      }
    },
    methods: {
      createTicket(formName) { //修改方法
        this.$refs[formName].validate((valid) => {
          if (valid) { //验证通过
            ticketApi.addTicket(this.ticket).then(response => {
              //提示信息
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              //回到列表页面 路由跳转
              this.$router.push({path: '/ticket/addList'})
            })
          } else {
            console.log("数据不正确")
            return false;
          }
        })
      },

      getInfo(id) { // 回显数据
        showApi.getShowInfo(id).then(response => {
          this.ticket.showId = response.data.show.id
          this.ticket.showName = response.data.show.showName
          this.ticket.showTime = response.data.show.showTime
          console.log(this.ticket);
        })
      },

      resetData() { //清空表单的数据
        this.ticket = {}
      },

      init() { //把相同的代码抽取出来
        // 判断路径中是否有id值来回显数据
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getInfo(id)
        } else { //清空表单
          this.ticket = {}
        }
      }

    }
  }
</script>
