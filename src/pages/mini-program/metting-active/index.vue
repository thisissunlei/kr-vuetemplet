
<template>
<div class="metting-active">
	<SectionTitle title="小程序活动配置" />
	<SearchFrom @search="searchClick" @clear="clearClick"/>
	<!-- <KrScroll :on-reach-bottom="handleReachBottom"> -->
		<Table border :columns="activeCol" :data="activeDetail" />
		<div style="float: right;margin:10px;">
			<Page :total="totalCount" :page-size='15' show-total show-elevator @on-change="onPageChange"/>
		</div>
		<Modal
			v-model="openDelete"
			title="提示"
			@on-ok="deleteSubmit"
			@on-cancel="switchDelete">
			<div style="text-align:center;margin-top:20px;font-size:16px;">确定删除此活动？</div>
    </Modal>
		<Modal
			v-model="openRelease"
			title="提示"
			@on-ok="releaseSubmit"
			@on-cancel="switchRelease">
			<div style="text-align:center;margin-top:20px;font-size:16px;">确定要发布活动吗？</div>
    </Modal>
		<Modal
			v-model="openOffline"
			title="提示"
			@on-ok="releaseSubmit"
			@on-cancel="switchOffline">
			<div style="text-align:center;margin-top:20px;font-size:16px;">确定要下线活动吗？</div>
    </Modal>
</div>

</template>
<script>
import SectionTitle from "~/components/SectionTitle";
import SearchFrom from "./searchFrom";
import Buttons from "~/components/Buttons";
import KrScroll from "~/components/KrScroll";
import dateUtils from "vue-dateutils";
import utils from "utils";
export default {
  components: {
    SectionTitle,
    SearchFrom,
    Buttons,
    KrScroll
  },
  data() {
    return {
      //发布开关
      openRelease: false,
      //删除开关
      openDelete: false,
      //下线开关
      openOffline: false,

      totalCount: 0,
      //活动id
      activityId: 0,
      //是否发布
      publish: false,
      tabelParams: {
        totalCount: 0,
        pageSize: 15,
        page: 1,
        beginTime: "",
        endTime: "",
        cmtId: "",
        creatorName: "",
        title: ""
      },
      activeCol: [
        {
          title: "活动id",
          key: "id",
          align: "center"
        },
        {
          title: "活动名称",
          key: "title",
          align: "center"
        },
        {
          title: "所在社区",
          key: "cmtName",
          align: "center"
        },
        {
          title: "活动日期",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            let startDateArr = dateUtils
              .dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.beginTime))
              .split(" ");
            let endDateArr = dateUtils
              .dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.endTime))
              .split(" ");

            if (
              startDateArr[0] != endDateArr[0] &&
              startDateArr[1] == endDateArr[1] &&
              startDateArr[1] == "00:00:00"
            ) {
              params.row.endTime = params.row.endTime - 1;
            }
            let begin = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.beginTime)
            );
            let end = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.endTime)
            );
            let date = begin + "至" + end;
            console.log(begin, "pppp", end);
            if (begin == end) {
              date = begin;
            }
            return h("span", {}, date);
          }
        },
        {
          title: "创建时间",
          key: "ctime",
          align: "center",
          render: (h, params) => {
            let date = params.row.ctime
              ? dateUtils.dateToStr(
                  "YYYY-MM-DD HH:mm:ss",
                  new Date(params.row.ctime)
                )
              : "-";
            return h("span", {}, date);
          }
        },

        {
          title: "报名人数",
          key: "joinCount",
          align: "center"
        },
        {
          title: "到场人数",
          key: "arrivingCount",
          align: "center"
        },
        {
          title: "创建人",
          key: "createUserName",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            let style = {
              display: "inline-block",
              padding: "5px",
              cursor: "pointer",
              color: "#2d8cf0"
            };
            let btns = [
              h(
                "span",
                {
                  style: style,
                  on: {
                    click: () => {
                      this.goDetail(params.row.id);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  style: style,
                  on: {
                    click: () => {
                      this.goEdit(params.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: style,
                  on: {
                    click: () => {
                      this.activityId = params.row.id || 0;
                      this.publish = true;

                      this.switchRelease();
                    }
                  }
                },
                "发布"
              ),
              h(
                "span",
                {
                  style: style,
                  on: {
                    click: () => {
                      this.activityId = params.row.id || 0;
                      this.publish = false;
                      this.switchOffline();
                    }
                  }
                },
                "下线"
              ),
              h(
                "span",
                {
                  style: style,
                  on: {
                    click: () => {
                      this.activityId = params.row.id || 0;

                      this.switchDelete();
                    }
                  }
                },
                "删除"
              ),
              h(
                "span",
                {
                  style: style,
                  on: {
                    click: () => {
                      this.goJoinUser(params.row.id);
                    }
                  }
                },
                "参与用户"
              )
            ];
            if (params.row.published) {
              btns.splice(2, 1);
            } else {
              btns.splice(3, 1);
            }

            return h("div", btns);
          }
        }
      ],
      activeDetail: [],
      theHead: false,
      left: 0,
      width: 0
    };
  },
  mounted() {
    //  var dom=document.getElementById('layout-content-main');
    // dom.addEventListener("scroll",this.onScrollListener);
    // window.addEventListener('resize',this.onResize);
    document.title = '小程序活动-氪空间后台管理系统'
    this.tabelParams = Object.assign(this.tabelParams, this.$route.query);
    this.getTableData();
  },
  methods: {
    searchClick(params) {
      utils.addParams(params);
      this.tabelParams = Object.assign(this.tabelParams, params);
      this.getTableData();
    },
    clearClick(params) {
      utils.addParams(params);
      this.tabelParams = Object.assign(this.tabelParams, params);
      this.getTableData();
    },
    getTableData() {
      let params = Object.assign({}, this.tabelParams);
      params.beginTime = params.beginTime
        ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.beginTime))
        : "";
      params.endTime = params.endTime
        ? dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.endTime))
        : "";
      this.$http
        .get("get-metting-active-list", params)
        .then(res => {
          this.totalCount = res.data.totalCount;
          // _this.deviceList = res.data.items;
          this.activeDetail = [].concat(res.data.items);
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    },
    //删除
    deleteSubmit() {
      this.$http
        .get("metting-active-delete", {
          activityId: this.activityId,
          delete: true
        })
        .then(res => {
          this.getTableData();
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    },
    //发布
    releaseSubmit() {
      this.$http
        .get("metting-active-publish", {
          activityId: this.activityId,
          publish: this.publish
        })
        .then(res => {
          this.getTableData();
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    },

    goDetail(id) {
      window.open(
        `/admin-applet/#/mini-program/metting-active/detail?activityId=${id}`,
        "_blank"
      );
    },
    goEdit(id) {
      window.open(
        `/admin-applet/#/mini-program/metting-active/edit?activityId=${id}`,
        "_blank"
      );
    },
    goJoinUser(id) {
      window.open(
        `/admin-applet/#/mini-program/metting-active/join-user?activityId=${id}`,
        "_blank"
      );
    },
    switchRelease() {
      this.openRelease = !this.openRelease;
    },
    switchDelete() {
      this.openDelete = !this.openDelete;
    },
    onPageChange(index) {
      this.tabelParams.page = index;
      this.getTableData();
    },
    switchOffline() {
      this.openOffline = !this.openOffline;
    }
  }
};
</script>
<style lang="less" scoped>
</style>
