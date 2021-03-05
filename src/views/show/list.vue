<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.showType" clearable placeholder="演出类型">
          <el-option
            v-for="item in types"
            :key="item.showType"
            :label="item.showType"
            :value="item.showType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showName" placeholder="演出名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showPerformer" placeholder="演出人员"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.showCity" placeholder="演出城市"/>
      </el-form-item>
      <el-form-item label="演出时间">
        <el-date-picker
          v-model="searchObj.beginTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.endTime"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
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
        width="200"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/show/edit/'+scope.row.id">
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
            @click="removeShowById(scope.row.id)">删除
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
  import show from '@/api/show'

  export default {
    //核心代码
    data() {
      return {
        list: null, //查询之后接口返回集合
        page: 1,  //当前页
        size: 10,  //每页记录数
        total: 0, //总记录数
        types: null, //演出类型
        searchObj: {}, //条件封装对象，里面可以省略,select选择的绑定到这里面
        loading: true
      }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
      this.getList()
    },
    methods: { //调用show.js定义的方法
      getList(page = 1) { //默认第一页
        this.page = page
        show.getShowListPage(this.page, this.size, this.searchObj)
          .then(response => { //请求成功,response是得到接口返回的数据
            if (response.success === true) {
              this.list = response.data.show.list;
              this.total = response.data.show.total;
              show.getShowType().then(response=>{ //演出类型
                this.types=response.data.showType;
                console.log(this.types);
              })
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

      removeShowById(id) { //删除
        this.$confirm('记录删除后将无法恢复，是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //调用删除的方法
          show.removeShow(id)
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
