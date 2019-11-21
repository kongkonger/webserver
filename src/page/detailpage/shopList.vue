<template>
  <!-- 最外层要用div包裹一层 -->
  <div class="manage_page fillcontain">
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import  {getRequest,putRequest,postRequest} from '@/config/fetch'
import listitem from "@/components/listitem";
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth, //设置的监听屏幕的变化
      testspan: 12, //监听media带来的页面缩放的问题，使其值改为：24
      tableData: [{name:'我的'},{name:'我的1'},{name:'我的2'},{name:'我的3'},{name:'我的4'},{name:'我的5'}],
      categoryData: []
    };
  },
  components: {
    //   这样才可以使用公共组件
    listitem
  },
    created(){
            this.queryListAsync();
            console.log(11111)
        },
  methods: {
     async getResturants(){
                const {latitude, longitude} = this.city;
                const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
                this.tableData = [];
                restaurants.forEach(item => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.address = item.address;
                    tableData.description = item.description;
                    tableData.id = item.id;
                    tableData.phone = item.phone;
                    tableData.rating = item.rating;
                    tableData.recent_order_num = item.recent_order_num;
                    tableData.category = item.category;
                    tableData.image_path = item.image_path;
                    this.tableData.push(tableData);
                })
            },
            //获取商品信息
            async queryListAsync() {
                    getRequest('/manage/product/list.do', {pageNum:1,pageSize:20
          }).then(resp=> {
                debugger
                  // const responseJson =  resp.json();
            console.log('cmc_tag :' + resp.status + ' msg : ' + resp.data);
              if (resp && resp.status == 200) {
                var data = resp.data;
            
                // resp.json(response.data) 
                console.log('cmc_tag :' + data.data.pageSize + ' msg : ' + data.data.pageNum);
                // ['data']  JSON.parse(JSON.stringify(resp.data.data))
                let retData = JSON.stringify(resp.data.data);
                var list  = JSON.parse(retData)['list'];
                this.tableData = [];
                list.forEach((item, index) => {
                              const tableData = {};
                              tableData.id = item.id;
                              tableData.categoryId = item.categoryId;
                              tableData.name = item.name;
                              tableData.subtitle = item.subtitle;
                    tableData.mainImage = item.mainImage;
                    tableData.price = item.price;
                              tableData.status = item.status;
                              tableData.imageHost = item.imageHost;
                              this.tableData.push(tableData);
                          });

            console.log('cmc_tag :' + '  tableData  0   : ' + this.tableData[0].id   + "  list  0 : " + list[0].categoryId);
            console.log('cmc_tag :' + '  retData list  : ' + JSON.stringify(JSON.parse(retData)['list']) );
            console.log('cmc_tag :' + data.data.pageSize + ' msg : ' + data.data.pageNum + ' real message : ' +    JSON.stringify(resp.data.data));
              }
            
              }
          );
      },
      //获取品类子节点
     async queryCategory() {
                    getRequest('/manage/category/get_category.do', {
          }).then(resp=> {
                debugger
                  // const responseJson =  resp.json();
            console.log('cmc_tag :' + resp.status + ' msg : ' + resp.data);
              if (resp && resp.status == 200) {
                var data = resp.data;
            
                // resp.json(response.data) 
                console.log('cmc_tag :' + data.data.pageSize + ' msg : ' + data.data.pageNum);
                // ['data']  JSON.parse(JSON.stringify(resp.data.data))
                let retData = JSON.stringify(resp.data.data);
            //     var list  = JSON.parse(retData)['list'];
            //     this.categoryData = [];
            //     list.forEach((item, index) => {
            //                   const tableData = {};
            //                   tableData.id = item.id;
            //                   tableData.categoryId = item.categoryId;
            //                   tableData.name = item.name;
            //                   tableData.subtitle = item.subtitle;
            //         tableData.mainImage = item.mainImage;
            //         tableData.price = item.price;
            //                   tableData.status = item.status;
            //                   tableData.imageHost = item.imageHost;
            //                   this.tableData.push(tableData);
            //               });
            // console.log('cmc_tag :' + '  tableData  0   : ' + this.tableData[0].id   + "  list  0 : " + list[0].categoryId);
            // console.log('cmc_tag :' + '  retData list  : ' + JSON.stringify(JSON.parse(retData)['list']) );
            // console.log('cmc_tag :' + data.data.pageSize + ' msg : ' + data.data.pageNum + ' real message : ' +    JSON.stringify(resp.data.data));
              }
            
              }
          );
      }

      //增加节点

      //更新节点信息

      //获取当前分类id及递归子节点CategoryId



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
</style>