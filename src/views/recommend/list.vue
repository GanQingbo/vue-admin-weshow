<template>
  <el-table
      :data="list"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
  >
    <el-table-column
        label="序号"
        align="center"
        width="50"
        type="index">
    </el-table-column>
    <el-table-column
        prop="showId"
        label="演出ID"
        sortable
        width="180">
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="创建日期"
        sortable
        width="180">
    </el-table-column>
    <el-table-column
        label="操作"
        width="200"
        align="center">
      <template slot-scope="scope">
        <router-link :to="'/recommend/details/'+scope.row.showId">
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
          >查看详情
          </el-button>
        </router-link>
        <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeRecommendById(scope.row.id)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import recommend from "@/api/recommend";
  export default {
    data(){
      return{
        list:[],
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        recommend.getAllRecommend().then(response=>{
          if(response.success===true){
            this.list=response.data.recommend;
            console.log(response);
          }
        })
      },

      removeRecommendById(id){
        this.$confirm('记录删除后将无法恢复，是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //调用删除的方法
          recommend.removeRecommend(id)
            .then(response => { //成功删除，提示信息
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

<style scoped>

</style>
