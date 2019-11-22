<template>
  <!-- 最外层要用div包裹一层 -->
  <!-- template包裹结构， slot -->
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" router theme="dark">
          <el-menu-item index="manage">
            <div  style="padding-left: 20px;">
              <i class="el-icon-document"></i>
              首页
            </div>
          </el-menu-item>
          <el-submenu  class="submenu" index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              
              <span>数据管理</span>
            </template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>添加数据
            </template>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-col>
      <!-- <van-col style="height: 100%; ">
        <van-row span="20" class="container">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </van-row>
        <van-tabbar v-model="active">
          <van-tabbar-item icon="home-o">标签</van-tabbar-item>
          <van-tabbar-item icon="search">标签</van-tabbar-item>
          <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
          <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
      </van-col>
      </van-row>-->
      <el-main>
        <!-- <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140"></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
        <!-- 默认列表页面  可以动态替换成详情页或者其他页面 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-row>
  </div>
</template>

<script>
// import { Tabbar, TabbarItem } from 'vant';
// Vue.use(Tabbar).use(TabbarItem);
// import { Row, Col } from 'vant';
// Vue.use(Row).use(Col);
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth, //设置的监听屏幕的变化
      testspan: 12, //监听media带来的页面缩放的问题，使其值改为：24
      bannerlist: [],
      active: 0
    };
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

    this.bannerlist.push({
      url: require("@/assets/img/banner1.png"),
      value: 0
    });
    this.bannerlist.push({
      url: require("@/assets/img/banner2.jpg"),
      value: 1
    });
  },
  methods: {
    startHacking() {
      // this.$notify({
      //   title: 'It works!',
      //   type: 'success',
      //   message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
      //   duration: 5000
      // })
      // this.$router.push({path:'/page/HelloWorld'});
      // querySearchAsync();
      debugger;
      // this.$options.methods.querySearchAsync();
      this.$router.push({ path: "/productpage" });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
// el-col 或者 el-row不指定宽高则为0了   内部包裹 div元素，进而限定div 或者其他组件的大小
.manage_page {
}
.backstyle {
  height: 100px;
  z-index: 100;
  bottom: 0;
  left: 0;
  background-color: #324057;
}
.container {
  min-height: 100vh;
  display: flex;
}
.inner_text{
 
  font-size: 30px;

}
 .el-menu-item{
   
 height: 100px;
 display: flex;
  font-size: 30px !important;
  line-height: 100px;
 
  color: #48576a;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
 }
 .submenu{
   font-size: 30px;
 }
.el-submenu{
    font-size: 30px !important;
}
.el-submenu__title{
height: 100px;

  font-size: 30px;
   padding: 0 20px;
     line-height: 100px;
}

</style>

 
