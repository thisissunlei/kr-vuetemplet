<template>
    <!-- <div :style='styleObj'>
        <div id='ueditor-container' type="text/plain" style='width:100%;height:100%'></div>
    </div> -->

    <div class="ui-kr-editor" :id="'ueditor-container'+_uid" type="text/plain" :style='styleObj'></div>

</template>
<script>

import  config from './config.js'
export default {
    name: 'ueditor',
    props: {
        styleObj: {
            type: Object,
            default: () => {
                return {
                    width: '100%',
                    height: '100%'
                }
            }
        },
        config: {
            type: Object,
            default: () => {
                return {}
            }
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            ue: null,
            editorContent: this.value,
            configs:config()
        }
    },
    watch: {
        value(val) {
            if (val != this.editorContent) {
                this.editorContent = val
                if (this.ue && this.ue.body) {
                    this.ue.setContent(val);
                }
            }
        }
    },
    mounted() {

        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function (action) {
            if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
                // return '/image/api/krspace-finance-web/activity/ue-upload-pic';
                return '/api/krspace-finance-web/activity/ue-upload-pic';
            } else {
                return this._bkGetActionUrl.call(this, action);
            }
        }
        var config={};
        if (Object.keys(config) == 0) {
            config = Object.assign({}, this.configs, this.config)
        }
        else {
            config = Object.assign({}, this.config)
        }

        this.ue = UE.getEditor('ueditor-container' + this._uid, config)
        this.ue.addListener("ready", () => {
            this.ue.setContent(this.editorContent); // 确保UE加载完成后，放入内容。
        });
        this.ue.addListener('contentChange', () => {
            let content = this.ue.getContent()
            this.editorContent = content
            this.$emit('on-content-change', content)
            this.$emit('input', content)
        })
    },
    destroyed() {
        this.ue.destroy();
    }
}
</script>
<style lang="less">
.ui-kr-editor{
    line-height: 1.15;
    // div.ivu-form-item-content{
    //     line-height: 1.15 !important;
    // }
    // .edui-box.edui-combox{
    //     background: red;
    //     line-height: 1.15 !important;
    // }
}
       
    
    

</style>
