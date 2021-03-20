<template>
  <div class="app-container">
    <!--model跟ref对应data中的数据，prop是对应属性名，跟规则名一样-->
    <el-form :model="show" :rules="rules" ref="show" label-width="100px" class="demo-ruleForm">
      <el-form-item label="演出名称" prop="showName" >
        <el-input v-model="show.showName" width="120"></el-input>
      </el-form-item>

      <el-form-item label="演出类型" prop="showTypeId">
        <el-select v-model="show.showTypeId" clearable placeholder="演出类型">
          <el-option
            v-for="item in types"
            :label="item.showType"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="演出人员" prop="showPerformer">
        <el-input v-model="show.showPerformer"></el-input>
      </el-form-item>

      <el-form-item label="演出城市" prop="showCity">
        <el-input v-model="show.showCity"></el-input>
      </el-form-item>

      <el-form-item label="演出地址" prop="showPlace">
        <el-input v-model="show.showPlace"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="showMobile">
        <el-input v-model="show.showMobile"></el-input>
      </el-form-item>

      <el-form-item label="演出时间" required prop="showTime">
        <el-date-picker v-model="show.showTime" type="datetime" placeholder="选择开始时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="show.endTime" type="datetime" placeholder="选择结束时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="演出简介">
        <el-input type="textarea" v-model="show.showIntro" :autosize="{ minRows: 2, maxRows: 10}"></el-input>
      </el-form-item>

      <el-form-item label="上传海报">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:81/oss/uploadPoster"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="saveOrUpdate">保存</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import showApi from '@/api/show'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components:{ //组件声明
      ImageCropper,PanThumb
    },
    data() {
      return {
        types: null,
        show: { //可以省略
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
        rules: {
          showName: [
            {required: true, message: '请填写演出名称', trigger: 'blur'},
            // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          showTypeId: [
            {required: true, message: '请选择演出类型', trigger: 'change'}
          ],
          showPerformer: [
            {required: true, message: '请填写演出人员', trigger: 'blur'}
          ],
          showCity: [
            {required: true, message: '请填写演出城市', trigger: 'blur'}
          ],
          showPlace: [
            {required: true, message: '请填写演出地点', trigger: 'blur'}
          ],
          showMobile: [
            {required: true, message: '请填写联系方式', trigger: 'blur'}
          ],
          showTime: [
            {type: 'date', required: true, message: '请选择演出时间', trigger: 'change'}
          ],
        },
        //imagecropperShow:false, //上传弹框是否显示
        // imagecropperKey:0, //上传组件key值
        BASE_API:process.env.BASE_API, //
        saveBtnDisabled: false, //保存按钮只能按一次
        uploadUrl:process.env.BASE_API+'/oss/uploadPoster',
        imageUrl:''
      }
    },
    created() { //第一次跳转才执行，
      this.init()
      //console.log(this.BASE_API);
    },
    watch:{ //监听路由变化
      $route(to,from){ //路由发生变化时，执行方法
        this.init()
      }
    },
    methods: {
      saveOrUpdate() { //判断修改还是添加
        this.saveBtnDisabled = true
        if(!this.show.id){
          this.saveShow()
        }else {
          this.updateShow()
        }
      },
      saveShow() { //添加show的方法
        showApi.addShow(this.show).then(response => {
            //提示信息
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            //回到列表页面 路由跳转
            this.$router.push({path: '/show/table'})
          })
      },
      updateShow(){ //修改方法
        showApi.updateShow(this.show).then(response=>{
          //提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path: '/show/table'})
        })
      },
      getInfo(id){ // 修改时回显数据的方法
        showApi.getShowInfo(id).then(response=>{
          this.show=response.data.show
        })
      },
      resetData() { //清空表单的数据
        this.show = {}
      },
      init(){ //把相同的代码抽取出来
        // 判断路径中是否有id值来回显数据
        if(this.$route.params && this.$route.params.id){
          const id=this.$route.params.id
          this.getInfo(id)
        }else{ //清空表单
          this.show = {}
        }
        showApi.getShowType().then(response => { //演出类型
          this.types = response.data.showType
          // console.log(response.data.showType[0].id);
        })
      },
      handleAvatarSuccess(data) { //上传后更新showPoster的数据，保存后更新数据库
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl=data.data.url
        this.show.showPoster=data.data.url
        console.log(data.data.url);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
