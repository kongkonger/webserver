<template>
  <div >
    <div>
      <el-button @click="startHacking">Start</el-button>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import {checkusevalid} from '@/api/getData'
  // import {getRequest} from './api'
  import  {getRequest,putRequest,postRequest} from '@/config/fetch'
export default {
  name: 'Login',
  methods: {

    	async querySearchAsync() {
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
          getRequest('/user/check_valid.do', {
    // username: this.loginForm.username,
    // password: this.loginForm.password
    str: 'ccmc',
    type: 'username'
}).then(resp=> {
   console.log('cmc_tag :' + resp.status + ' msg : ' + resp.msg);
     if (resp && resp.status == 200) {
      var data = resp.data;
      console.log('cmc_tag :' + data.status + ' msg : ' + data.msg);
    }
   
    // _this.loading = false;
    // if (resp && resp.status == 200) {
    // _this.getRequest("/config/hr").then(resp=> {
    //     if (resp && resp.status == 200) {
    //     var data = resp.data;
    //     _this.$store.commit('login', data);
    //     var path = _this.$route.query.redirect;
    //     _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
    //     }
    // })
    }
);
            


    			// }
        },
            startHacking () {
      // this.$notify({
      //   title: 'It works!',
      //   type: 'success',
      //   message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
      //   duration: 5000
      // })
      // this.$router.push({path:'/page/HelloWorld'});
      // querySearchAsync();
      debugger
      // this.$options.methods.querySearchAsync();
      this.$router.push({path:'/manage'});
    }

  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
