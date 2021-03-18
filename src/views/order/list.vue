<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.orderSn" placeholder="订单号"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.id" placeholder="订单ID"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.userId" placeholder="用户ID"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showId" placeholder="演出ID"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.orderStatus" clearable placeholder="订单状态">
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
      <el-table-column prop="orderSn" label="订单号" width="150" align="center"/>
      <el-table-column prop="id" label="订单ID" width="80" align="center"/>
      <el-table-column prop="userId" label="用户ID" width="80" align="center"/>
      <el-table-column prop="showId" label="演出ID" width="80" align="center"/>
      <el-table-column prop="orderAmount" label="订单金额" width="100" align="center"/>
      <el-table-column prop="orderStatus" label="订单状态" width="150" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus==0">待支付</span>
          <span v-if="scope.row.orderStatus==1">已支付</span>
          <span v-if="scope.row.orderStatus==2">已关闭</span>
          <span v-if="scope.row.orderStatus==3">无效单</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center"/>

      <el-table-column
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/order/edit/'+scope.row.id">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            >详情
            </el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeOrderById(scope.row.id)">删除
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
      }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
      this.getList()
    },
    methods: {
      getList(page = 1) { //默认第一页
        this.page = page
        orderApi.getOrderListPage(this.page, this.size, this.searchObj)
          .then(response => { //请求成功,response是得到接口返回的数据
            if (response.success === true) {
              this.list = response.data.order.list;
              this.total = response.data.order.total;
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

      removeOrderById(id) { //删除
        this.$confirm('记录删除后将无法恢复，是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //调用删除的方法
          orderApi.removeOrder(id)
            .then(response => { //成功删除，提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()  //刷新页面
            })
        })
      },
    }
  }
</script>
