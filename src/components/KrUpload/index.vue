<template>
	<div style="display:inline-block;">
		<input 
			:id="inputId" 
			type="file" 
			style="display:none;" 
			@change="onChange"	
		>
		<div class="only-up">
			<div style="display:inline-block;">
				<div class="up-show-box" v-for="(item,index) in defaultList" :key="index" style="margin:10px;">
					<KrImg :src="item.url" :width="width"  :height="height" :type="imgDisplay" />
					<div  class="img-mask">
						<div 
							:style="{width:width+'px',height:height+'px',lineHeight:height+'px',textAlign:'center'}"
						>
							<div class="delete-icon ivu-icon ivu-icon-ios-eye" @click="eyePhotoAlbum(index)"></div>
							<div v-if="!disabled" class="delete-icon ivu-icon ivu-icon-trash-a" @click="delClick(index)"></div>
						</div>
						
					</div>
				</div>
			</div>
			<div v-if="!((!multiple && defaultList.length>0) || disabled )" class="up-icon" @click="upBtnClick" :style="{width:width+'px',height:height+'px',lineHeight:height+'px'}">
				<Icon type="plus-round"></Icon>
			</div>
			<slot  name="up-btn" ></slot>
		
		</div>
		<div>{{placeholder}}</div>
		<PhotoAlbum :downLabel="downLabel" @downFile="downImg" :data="imagesArr" v-if="openPhotoAlbum" :eyeIndex="eyeIndex" @close="close"/>
	</div>
</template>


<script>
import utils from "~/plugins/utils";
import KrImg from "../KrImg";
import PhotoAlbum from "../PhotoAlbum";
export default {
  name: "krUpload",
  model: {
    prop: "value",
    event: "input"
  },
  components: {
    KrImg,
    PhotoAlbum
  },
  /**
   *  @param {Object} columnDetail 当用在列表是的上传组件所在行的所有数据
   *  @param {Array} file 上传组件上传的文件列表
   *  @param {Boolean} publicUse 判断文件上传到公共环境还是私有环境
   *  @param {Function} onUpUrl 文件上传成功的回调方法
   */
  props: {
    file: {
      type: Array,
      default: () => []
    },
    publicUse: {
      default: false,
      type: Boolean
    },
    value: {
      default: () => [],
      type: Array
    },
    type: {
      type: String,
      default: "select-up"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: "op/upload"
    },
    downLabel: {
      type: String,
      default: ""
    },
    width: {
      type: [String, Number],
      default: 60
    },
    height: {
      type: [String, Number],
      default: 60
    },
    placeholder: {
      type: String,
      default: ""
		},
		imgDisplay:{
			type:String,
			default:'cover'
		}
  },
  // computed: {
  //   defaultList: {
  //     get() {
  //       return [].concat(this.value);
  //     },
  //     set(val) {}
  //   }
  // },
  data() {
    return {
      isOpenList: false,
      listStyle: {
        left: 0,
        top: 0
      },
      eyeIndex: 1,
      openPhotoAlbum: false,
      imagesArr: [],
      inputId: "up-file" + this._uid,
      defaultList:!this.value.length?[]:this.value,
      serverUrl: ""
    };
  },
  mounted() {},
  methods: {
    eyePhotoAlbum(index) {
      this.eyeIndex = index;
      this.imagesArr = [].concat(this.defaultList);
      this.close();
    },
    downImg(url, id) {
      utils.downImg(url);
    },
    close() {
      this.openPhotoAlbum = !this.openPhotoAlbum;
    },
    delClick(index) {
      var list = [].concat(this.defaultList);
      list.splice(index, 1);
      this.defaultList = [].concat(list);
      this.$emit("input", [].concat(list));
      this.$emit("delete", index);
      this.$emit("onChange", [{}], this.columnDetail, this.defaultList);
    },
    upBtnClick() {
      let fileDom = document.getElementById(this.inputId);
      fileDom.click();
    },
    //错误提示
    config: function() {
      this.$Notice.config({
        top: 80,
        duration: 3
      });
    },
    //获取上传的接口
    getUpFileUrl(event) {
      let category = this.category;
      let that = this;
      let file = event;
      var fileName = event.name;
      var form = new FormData();
      this.$http
        .get("get-vue-upload-url", {
          category: category,
          isPublic: that.publicUse
        })
        .then(res => {
          var response = res.data;
          form.append("OSSAccessKeyId", response.ossAccessKeyId);
          form.append("policy", response.policy);
          form.append("Signature", response.sign);
          form.append("key", response.pathPrefix + "/" + file.name);
          form.append("uid", response.uid);
          form.append("callback", response.callback);
          form.append("x:original_name", file.name);
          form.append("file", file);
          that.upfile(form, response.serverUrl, fileName);
        })
        .catch(err => {
          this.$Notice.error({
            title: err.message
          });
        });
    },
    upfile(form, serverUrl, fileName) {
      var that = this;

      var xhrfile = new XMLHttpRequest();
      xhrfile.timeout = 600000;
      xhrfile.onreadystatechange = function() {
        if (xhrfile.readyState === 4) {
          var fileResponse = xhrfile.response;
          if (xhrfile.status === 200) {
            if (fileResponse && fileResponse.code > 0) {
              var data = fileResponse.data;
              var params = {};
              params.fieldUrl = fileResponse.data.url;
              params.name = fileName;
              params.url = fileResponse.data.url;
              params.fileId = "" + fileResponse.data.id;
              params.fileName = fileName;
              params.fileUrl = fileResponse.data.url;
              params.type = "ATTACHMENT";
              that.onSuccess(params);
            } else {
              that.$Notice.error({
                title: "上传失败请稍后重试"
              });
            }
          } else {
            that.$Notice.error({
              title: "上传失败请稍后重试"
            });
          }
          that.isLoadding = false;
          that.percent = 100;
        }
      };
      xhrfile.open("POST", serverUrl, true);
      xhrfile.responseType = "json";
      xhrfile.send(form);
    },
    onChange(event) {
      var file = event.target.files[0];
      if (file) {
        this.getUpFileUrl(file);
      }
    },
    //上传成功
    onSuccess(params) {

      var detail = Object.assign({}, params);
      if (this.multiple) {
        this.defaultList.push(detail);
      } else {
        this.defaultList =[].concat([detail]);
			}
      this.$emit("input", [].concat(this.defaultList));
      this.$emit("onChange", [detail], [].concat(this.defaultList));
      this.$emit("upSuccess", [detail], [].concat(this.defaultList));
    },
    onTokenSuccess() {},
    downFille(params) {
      // return ;
      var that = this;

      this.$http.post(
        "get-station-contract-pdf-url",
        {
          id: params.fileId
        },
        response => {
          utils.downFile(response.data);
        },
        error => {
          that.$Notice.error({
            title: error.message
          });
        }
      );
    },
    listMove(file, fileList) {
      this.defaultList = [].concat(fileList);
    }
  }
};
</script>

<style lang="less" scoped>
.only-up {
  .up-icon {
    height: 58px;
    width: 58px;
    text-align: center;
    line-height: 58px;
    border: 1px dashed #dddee1;
    cursor: pointer;
    font-size: 30px;
    vertical-align: middle;
    font-size: 26px;
    transition: all 0.3s;
    display: inline-block;
    box-sizing: content-box;
    border-radius: 4px;
    margin: 0px 10px;
  }

  .up-icon:hover {
    color: #2d8cf0;
    border: 1px dashed #57a3f3;
  }
  .up-show-box {
    display: inline-block;
    position: relative;

    border-radius: 4px;
    overflow: hidden;
    margin: 0 10px;
    vertical-align: middle;
    .img-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      top: 0px;
      left: 0px;
      display: none;
      font-size: 20px;
    }
  }
  .up-show-box:hover .img-mask {
    display: block;
    text-align: center;
    .delete-icon {
      cursor: pointer;
      margin: 0px 5px;
    }
  }
}
</style>
