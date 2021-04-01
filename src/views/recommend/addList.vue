<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.id" placeholder="演出ID"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showName" placeholder="演出名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showCity" placeholder="演出城市"/>
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
      <el-table-column prop="id" label="演出ID" width="70" align="center"/>
      <el-table-column prop="showName" label="演出名" width="120" align="center"/>
      <el-table-column prop="showType" label="演出类型" width="80" align="center"/>
      <el-table-column prop="showPerformer" label="演出人员" width="150" align="center"/>
      <el-table-column prop="showCity" label="演出城市" width="80" align="center"/>
      <el-table-column prop="showPlace" label="演出地点" width="150" align="center"/>
      <el-table-column prop="showTime" label="开始时间" width="150" align="center"/>
      <el-table-column prop="endTime" label="结束时间" width="150" align="center"/>
      <el-table-column prop="showMobile" label="联系方式" width="120" align="center"/>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center"/>

      <el-table-column
          label="操作"
          width="300"
          align="center">
        <template slot-scope="scope">
          <el-button
              type="primary"
              round
              icon="el-icon-plus"
              @click="createShowRecommend(scope.row.id)">新增
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
  import showApi from '@/api/show'
  import recommendApi from "../../api/recommend";
  export default {
    data(){
      return{
        list:null,
        page:1,
        size:10,
        total:0,
        searchObj:{},
        loading:true
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(page=1){
        showApi.getShowByTime(this.page,this.size,this.searchObj)
          .then(response=>{
            if (response.success === true) {//请求成功
              this.list = response.data.show.list;
              this.total = response.data.show.total;
            }
            this.loading = false
          })
      },
      createShowRecommend(id){
        //新增轮播图
        recommendApi.addRecommend(id).then(response=>{
          if(response.success===true){
            //跳转到list
            this.$router.replace('/recommend/table')
          }
        }).catch(error=>{
          if(response.code===420){
            this.$message.error('已达推荐数量上限')
          }else {
            this.$message.error('创建推荐失败')
          }
        })
      },
      resetData(){
        this.searchObj = {}
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>
