<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-input v-model="searchObj.id" placeholder="用户id"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.username" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.nickname" placeholder="用户昵称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.status" clearable placeholder="账号状态">
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
      <el-table-column prop="id" label="用户ID" width="70" align="center"/>
      <el-table-column prop="username" label="用户名" width="120" align="center"/>
      <el-table-column prop="nickname" label="用户昵称" width="80" align="center"/>
      <el-table-column prop="mobile" label="手机号码" width="150" align="center"/>
      <el-table-column prop="header" label="头像" width="80" align="center"/>
      <el-table-column prop="status" label="账号状态" width="150" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">禁用</span>
          <span v-if="scope.row.status==1">正常</span>
          <span v-if="scope.row.status==2">注销</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center"/>

      <el-table-column
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            >编辑
            </el-button>
          </router-link>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-remove"
            @click="disableUser(scope.row)">
            <span v-if="scope.row.status == 0" >启用</span>
            <span v-else>禁用</span>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeUserById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">

      <el-pagination background
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
  import userApi from '@/api/user'

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
          label:'禁用'
        },{
          value: '1',
          label: '正常'
        },{
          value: '2',
          label: '注销'
        }],
      }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
      this.getList()
    },
    methods: {
      getList(page = 1) { //默认第一页
        this.page = page
        userApi.getUserListPage(this.page, this.size, this.searchObj)
          .then(response => { //请求成功,response是得到接口返回的数据
            if (response.success === true) {
              this.list = response.data.user.list;
              this.total = response.data.user.total;
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

      removeUserById(id) { //删除用户
        this.$confirm('记录删除后将无法恢复，是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //调用删除的方法
          userApi.removeUser(id)
            .then(response => { //成功删除，提示信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()  //刷新页面
            })
        })
      },

      disableUser(row){ //禁用、启用账号
        userApi.updateStatus(row.id);
        this.getList() //刷新页面
      }
    }
  }

</script>

