<template>
  <div>
    <el-row >
      <el-col >
        <div class="show" ><h3>演出ID: &nbsp {{show.id}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>演出名称:&nbsp{{show.showName}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>演出人员:&nbsp{{show.showPerformer}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>演出城市:&nbsp{{show.showCity}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>演出地址:&nbsp{{show.showPlace}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>联系方式:&nbsp{{show.showMobile}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>演出时间:&nbsp{{show.showTime}}</h3></div>
      </el-col>
      <el-col >
        <div class="show"><h3>演出简介:&nbsp{{show.showIntro}}</h3></div>
      </el-col>
      <el-col >
        <div class="show">
          <div class="demo-image__preview">
            <h3>海报预览：</h3>
            <el-image
                style="width: 100px; height: 100px"
                :src="show.showPoster"
                :preview-src-list="srcList">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import showApi from "@/api/show"
  import {getInfo} from "../../api/login";

  export default {
    data() {
      return {
        show: {
          showName: '',
          showTypeId: '',
          showIntro: '',
          showPerformer: '',
          showCity: '',
          showPlace: '',
          showTime: '',
          endTime: '',
          showPoster: '',
          showMobile: ''
        },
        srcList: [],
      }
    },
    created() {
      //从路径获取id
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      }
    },
    methods: {
      getInfo(id) {
        showApi.getShowInfo(id).then(response => {
          this.show = response.data.show
          this.srcList.push(this.show.showPoster)
        })
      }
    }
  }
</script>

<style scoped>
.show{
  margin-left: 2cm;
}
</style>
