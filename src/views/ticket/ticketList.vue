<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.id" placeholder="售票ID"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showId" placeholder="演出ID"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showName" placeholder="演出名"/>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="searchObj.isShow">未演出</el-checkbox>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查
        询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--表格-->
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
      <el-table-column prop="id" label="售票ID" width="100" align="center"/>
      <el-table-column prop="showId" label="演出ID" width="100" align="center"/>
      <el-table-column prop="showName" label="演出名称" width="150" align="center"/>
      <el-table-column prop="seatType" label="座位类型" width="100" align="center"/>
      <el-table-column prop="seatPrice" label="座位价格" width="100" align="center"/>
      <el-table-column prop="seatNumber" label="总票量" width="100" align="center"/>
      <el-table-column prop="seatSurplus" label="剩余票量" width="100" align="center"/>
      <el-table-column prop="sellTime" label="开售时间" width="150" align="center"/>
      <el-table-column prop="showTime" label="表演时间" width="150" align="center"/>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center"/>
      <el-table-column
          label="操作"
          width="200"
          align="center">
        <template slot-scope="scope">
          <router-link :to="'/ticket/edit/'+scope.row.id">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
            >编辑
            </el-button>
          </router-link>
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeTicketById(scope.row.id)">删除
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
  import ticket from '@/api/ticket'
  export default {
    data(){
      return {
        page:1,
        size:10,
        total:0,
        searchObj:{},
        list:null,
        loading: true,
        checked:''
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(page=1){
        this.page=page
        ticket.getTicketListPage(this.page,this.size,this.searchObj)
          .then(response=>{
            if(response.success==true){
              this.list=response.data.ticket.list
              this.total=response.data.ticket.total
            }
            this.loading=false
          })
      },
      resetData(){
        this.searchObj={}
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>
