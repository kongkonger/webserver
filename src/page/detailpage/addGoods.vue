<template>
  <!-- 最外层要用div包裹一层 -->
  <div class="manage_page fillcontain">
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <el-form
          :model="foodForm"
          :rules="foodrules"
          ref="foodForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="食品名称" prop="name">
            <el-input v-model="foodForm.name"></el-input>
          </el-form-item>

          <el-form-item label="上传食品图片">
            <el-upload
              class="avatar-uploader"
              :action="baseImageUrl + '/manage/product/upload.do'"
              :name="upload_file"
              :show-file-list="false"
              :on-success="uploadImg"
              :before-upload="beforeImgUpload"
            >
              <img
                v-if="foodForm.image_path"
                :src="foodForm.image_path"
                class="avatar"
              >
          
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                       <img
                :src="rtImgPath"
                class="avatar"
              >
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {baseImageUrl, baseImgPath} from '@/config/env'
import  {getRequest,putRequest,postRequest,uploadFileRequest} from '@/config/fetch'
import listitem from "@/components/listitem";
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth, //设置的监听屏幕的变化
      testspan: 12, //监听media带来的页面缩放的问题，使其值改为：24
      // foodForm: {
      //   name: "",
      //   description: "",
      //   image_path: "",
      //   activity: "",
      //   attributes: [],
      //   specs: [
      //     {
      //       specs: "默认",
      //       packing_fee: 0,
      //       price: 20
      //     }
      //   ]
      // },
      		foodForm: {
    				name: '',
    				description: '',
    				image_path: '',
    				activity: '',
    				attributes: [],
    				specs: [{
    					specs: '默认',
			          	packing_fee: 0,
			          	price: 20,
    				}],
    			},
      baseImageUrl,
      baseImgPath,
       rtImgPath: '',
    };
  },
  components: {
    //   这样才可以使用公共组件
    listitem
  },
   methods: {
     		uploadImg(res, file) {
           console.log('cmc_tag image_path : ' + res.image_path)
				if (res.status == 1) {
					this.foodForm.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
      },
        async addGoodsAsync(file,curObj) {
           let fd = new FormData()
        fd.append('upload_file', file)
        let that = curObj
        uploadFileRequest('/manage/product/upload.do', fd).then(res=> {

        debugger
        // }, (res) => {
        console.log(res)
        	// if (res.status == 1) {
        
      if (res && res.status == 200) {
          // this.foodForm.image_path = res.uri;
                var data = res.data;
            
                // resp.json(response.data) 
                console.log('cmc_tag :' + data.data.uri + ' msg : ' + data.data.uri);
                that.rtImgPath = data.data.uri;
                // ['data']  JSON.parse(JSON.stringify(resp.data.data))
                let retData = JSON.stringify(res.data.data);
                var uri  = JSON.parse(retData)['uri'];
                    that.foodForm;
                that.foodForm.image_path = uri;
                console.log('cmc image url : ' +  that.foodForm.uri)
				}else{
					this.$message.error('上传图片失败！');
				}
        });
       },
			beforeImgUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
        }

        // let fd = new FormData()
        // fd.append('file', file)
        // uploadFileRequest('/manage/product/upload.do', fd).then((res) => {

        // }, (res) => {
        // console.log(res)
        // 	if (res.status == 1) {
				// 	this.foodForm.image_path = res.image_path;
				// }else{
				// 	this.$message.error('上传图片失败！');
				// }
        // })

        var that = this
        this.$options.methods.addGoodsAsync(file,that);//
        
        // addGoodsAsync(file);
        return false
        
				// return isRightType && isLt2M;
      },
     
   },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        // that.$refs.el-menu-item.style.width == screenWidth/8 +'px'
      })();
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.manage_page {
}

// .el-menu-item{
//   width: 200px  ;
// }
// .el-menu-itemr /deep/ .name{ //第一种写法
//   color:red;
// }
// 修改el-menu-item样式问题
.el-menu-item {
  // background-color: #333 !important;
  // width: 240px;
}
// .el-submenu .el-menu-item {
//   min-width: $dim_width_large3;
// }
.bg-purple-dark {
  // background: #222222;
}
.grid-content {
  // el-col 或者 el-row不指定宽高则为0了   内部包裹 div元素，进而限定div 或者其他组件的大小
  border-radius: 4px;
  min-height: 36px;
}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
</style>