<template>
  <div class="app-container">
    <!--model跟ref对应data中的数据，prop是对应属性名，跟规则名一样-->
    <el-form :model="order" :rules="rules" ref="order" label-width="100px" class="demo-ruleForm">

      <el-form-item label="订单号" prop="orderSn" >
        <el-input v-model="order.orderSn" width="120"></el-input>
      </el-form-item>

      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="order.userId"></el-input>
      </el-form-item>

      <el-form-item label="演出ID" prop="showId" >
        <el-input v-model="order.showId"></el-input>
      </el-form-item>

      <el-form-item label="身份证号码" prop="idNumber" >
        <el-input v-model="order.idNumber" width="120" maxlength="18"
                  minlength="18"
                  show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="售票ID" prop="ticketId" >
        <el-input v-model="order.ticketId" width="120"></el-input>
      </el-form-item>

      <el-form-item label="座位号" prop="seatNo" >
        <el-input v-model="order.seatNo" width="120"></el-input>
      </el-form-item>

      <el-form-item label="订单金额" prop="orderAmount" >
        <el-input v-model="order.orderAmount" width="120"></el-input>
      </el-form-item>

      <el-form-item label="订单状态" prop="orderStatus" >
        <el-select v-model="order.orderStatus" placeholder="订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="删除状态" prop="deleteStatus" >
        <el-select v-model="order.deleteStatus" placeholder="删除状态">
          <el-option
            v-for="item in deleteOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="order.createTime" width="120" :disabled="true" ></el-input>
      </el-form-item>

      <el-form-item label="更新时间" prop="updateTime" >
        <el-input v-model="order.updateTime" width="120" :disabled="true" ></el-input>
      </el-form-item>

      <el-form-item label="支付时间" prop="paymentTime" >
        <el-input v-model="order.paymentTime" width="120"></el-input>
      </el-form-item>

      <el-form-item label="支付方式" prop="paymentType" >
        <el-input v-model="order.paymentType" width="120"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="updateOrder('order')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import orderApi from '@/api/order'

  export default {
    data() {
      return {
        types: null,
        order: {},
        options:[{
          value:'0',
          label:'待支付'
        },{
          value: '1',
          label: '已支付'
        },{
          value: '2',
          label: '已关闭'
        },{
          value: '3',
          label: '无效单'
        }],
        deleteOptions:[{
          value:'0',
          label:'未删除'
        },{
          value: '1',
          label: '已删除'
        }],
        rules: {
          orderSn: [
            {required: true, message: '请填写订单号', trigger: 'blur'},
          ],
          userId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          showId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          idNumber: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {min:18,max:18,message: '身份证号为18位',trigger: 'blur'}
          ],
          ticketId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          seatNo: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          orderAmount: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          orderStatus: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          deleteStatus: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          createTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          updateTime: [
          ],
          paymentTime: [
          ],
          paymentType: [
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
      updateOrder(formName){ //修改方法
        this.$refs[formName].validate((valid)=>{
          if(valid){ //验证通过
            orderApi.updateOrder(this.order).then(response=>{
              //提示信息
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              //回到列表页面 路由跳转
              this.$router.push({path: '/order/table'})
            })
          } else{
            console.log("提交失败");
            return false;
          }
        })

      },

      getInfo(id){ // 回显数据
        orderApi.getOrderInfo(id).then(response=>{
          this.order=response.data.order
      })
      },
      resetData() { //清空表单的数据
        this.order = {}
      },
      init(){ //把相同的代码抽取出来
        // 判断路径中是否有id值来回显数据
        if(this.$route.params && this.$route.params.id){
          const id=this.$route.params.id
          this.getInfo(id)
        }else{ //清空表单
          this.order = {}
        }
      }
    }
  }
</script>


