<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.orderId" placeholder="订单Id"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.adminId" placeholder="处理人ID"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.returnStatus" clearable placeholder="处理状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查
        询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--用户数据表格-->
    <el-table
      :data="list"
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        label="序号"
        align="center"
        width="50"
        type="index">
      </el-table-column>
      <el-table-column prop="id" label="退票ID" width="150" align="center"/>
      <el-table-column prop="orderId" label="订单ID" width="80" align="center"/>
      <el-table-column prop="adminId" label="处理人ID" width="80" align="center"/>
      <el-table-column prop="returnStatus" label="订单状态" width="150" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.returnStatus==0">待处理</span>
          <span v-if="scope.row.returnStatus==1">已退款</span>
          <span v-if="scope.row.returnStatus==2">已拒绝</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" width="200" align="center"/>
      <el-table-column prop="handleTime" label="处理时间" width="200" align="center"/>
      <el-table-column prop="returnMoney" label="退款金额" width="100" align="center"/>

      <el-table-column
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            :disabled="scope.row.returnStatus != '0'"
            @click="handlePass(scope.row)">通过
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.returnStatus != '0'"
            @click="handleReject(scope.row)">拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">

      <el-pagination
        :current-page="page"
        :page-size="size"
        :total="total"
        layout="total, prev, pager, next"
        @current-change="getList"
        style="padding:30px 0;text-align: center">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // 引入接口
  import orderApi from '@/api/order'

  export default {
    //核心代码
    data() {
      return {
        list: null, //查询之后接口返回集合
        page: 1,  //当前页
        size: 10,  //每页记录数
        total: 0, //总记录数
        searchObj: {
        }, //条件封装对象，里面可以省略,select选择的绑定到这里面
        loading: true,
        options:[{
          value:'0',
          label:'待处理'
        },{
          value: '1',
          label: '已退款'
        },{
          value: '2',
          label: '已拒绝'
        }],
      }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
      this.getList()
    },
    methods: {
      getList(page = 1) { //默认第一页
        this.page = page
        orderApi.getReturnListPage(this.page, this.size, this.searchObj)
          .then(response => { //请求成功,response是得到接口返回的数据
            if (response.success === true) {
              this.list = response.data.orderReturn.list;
              this.total = response.data.orderReturn.total;
            }
            this.loading = false
            console.log(response);
          })
          .catch(error => { //请求失败
            console.log(error)
          })
      },

      resetData() { //清空表单的数据
        this.searchObj = {}
        this.getList()
      },

      handlePass(orderReturn){ //通过申请
        this.$confirm('此操作无法还原，是否同意退款？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //调用方法
          orderReturn.returnStatus=1
          orderApi.updateOrderReturn(orderReturn)
            .then(response => {
              this.$message({
                type: 'success',
                message: '退款成功!'
              });
              this.getList()  //刷新页面
            })
        })
      },

      handleReject(orderReturn){ //不通过
        this.$confirm('此操作无法还原，是否拒绝退款？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //调用方法
          orderReturn.returnStatus=2
          orderApi.updateOrderReturn(orderReturn)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()  //刷新页面
            })
        })
      }
    }
  }
</script>

