<template>
  <!-- 最外层要用div包裹一层 -->
  <div class="manage_page fillcontain">
    <!-- background-color: #333; -->
    <el-row style="width: 100%; ">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth, //设置的监听屏幕的变化
      testspan: 12, //监听media带来的页面缩放的问题，使其值改为：24
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
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
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
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
  background: #222222;
}
.grid-content {
  // el-col 或者 el-row不指定宽高则为0了   内部包裹 div元素，进而限定div 或者其他组件的大小
  border-radius: 4px;
  min-height: 36px;
}
</style>