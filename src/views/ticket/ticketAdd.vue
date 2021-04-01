<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.id" placeholder="演出ID"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showName" placeholder="演出名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showCity" placeholder="演出城市"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查
        询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
        :data="list"
        style="width: 100%"
        v-loading="loading">
      <el-table-column
          label="序号"
          align="center"
          width="70"
          type="index">
      </el-table-column>
      <el-table-column prop="id" label="演出ID" width="70" align="center"/>
      <el-table-column prop="showName" label="演出名" width="200" align="center"/>
      <el-table-column prop="showCity" label="演出城市" width="120" align="center"/>
      <el-table-column prop="showTime" label="演出时间" width="150" align="center"/>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center"/>
      <el-table-column
          label="操作"
          width="200"
          align="center">
        <template slot-scope="scope">
          <router-link :to="'/ticket/add/'+scope.row.id">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
            >添加售票
            </el-button>
          </router-link>
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
  import ticketApi from '@/api/ticket'
  import showApi from '@/api/show'
  export default {
    data(){
      return{
        list:[],
        page:1,
        size:10,
        total:0,
        searchObj:{},
        loading:true,
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(page=1){
        this.page=page
        showApi.getShowByTime(this.page,this.size,this.searchObj)
          .then(response=>{
            if (response.success === true) {
              this.list = response.data.show.list;
              this.total = response.data.show.total;
            }
            this.loading = false
          })
          .catch(error => { //请求失败
            console.log(error)
          })
      },

      resetData() { //清空表单的数据
        this.searchObj = {}
        this.getList()
      },

    },

  }
</script>

<style scoped>

</style>
