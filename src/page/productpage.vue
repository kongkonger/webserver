<template>
  <!-- 最外层要用div包裹一层 -->
  <div class="manage_page fillcontain">
    <el-container class="manage_page">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>导航二
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <!-- <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140"></el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>-->
          <!-- 默认列表页面  可以动态替换成详情页或者其他页面 -->
          <!-- <keep-alive>
                  <router-view></router-view>
          </keep-alive>-->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
              <!-- @click="handleDelete(scope.$index, scope.row)" -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                   @click="queryListAsync"
                
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import listitem from "@/components/listitem";
import  {getRequest,putRequest,postRequest} from '@/config/fetch'
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth, //设置的监听屏幕的变化
      testspan: 12 ,//监听media带来的页面缩放的问题，使其值改为：24
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        items:[]
    };
  },
  components: {
    listitem
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
  },
  methods: {
    async queryListAsync() {
    			// if (queryString) {
	    			// try{
            //   // str:'cmc',type:'username'
	    			// 	const cityList = await checkusevalid({});
	    			// 	// if (cityList instanceof Array) {
		    		// 	// 	cityList.map(item => {
		    		// 	// 		item.value = item.address;
		    		// 	// 		return item;
		    		// 	// 	})
		    		// 	// 	cb(cityList)
            //   // }
            //   	console.log(cityList);
	    			// }catch(err){
	    			// 	console.log(err)
            // }
          getRequest('/manage/product/list.do', {
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
      this.items = [];
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
                    this.items.push(tableData);
                });

  console.log('cmc_tag :' + '  items  0   : ' + this.items[0].id   + "  list  0 : " + list[0].categoryId);
 
   console.log('cmc_tag :' + '  retData list  : ' + JSON.stringify(JSON.parse(retData)['list']) );
 
        console.log('cmc_tag :' + data.data.pageSize + ' msg : ' + data.data.pageNum + ' real message : ' +    JSON.stringify(resp.data.data));
    }
   
    }
);
            


    			// }
        },
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
  // background: #222222;
}
.grid-content {
  // el-col 或者 el-row不指定宽高则为0了   内部包裹 div元素，进而限定div 或者其他组件的大小
  border-radius: 4px;
  min-height: 36px;
}
</style>