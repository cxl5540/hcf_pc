// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import router from './router'
import 'lib-flexible/flexible'

Vue.config.productionTip = false
import Axios from 'axios'
import  '../static/js/global.js'

Vue.prototype.$axios = Axios;

Vue.filter('num',function(val){
	val=Number(val);
	return val.toFixed(2);
	if(val>10000){
	return (val/10000)+'万'	
	}

});
Vue.filter('color',function(val){
  val=Number(val);
    if(val>0){
      return `<span class="red">`+val+`</span>`;
    }else{
      return `<span class="green">`+val+`</span>`;
    }

})
Vue.filter('numval',function(val){
	if(val>10000&&val<100000000){
	return (val/10000).toFixed(2)+'万'	
	}else if(val>100000000){
	return (val/100000000).toFixed(2)+'亿'		
	}else{
	 return val;	
	}
});
Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      let sign =200
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
});
Vue.directive('tabelLoadmore', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');      
      SELECTWRAP_DOM.addEventListener('scroll', function() {

            let sign = 200; // 定义默认的向上滚于乡下滚的边界
            const CONDITION = ((this.scrollHeight - this.scrollTop === this.clientHeight) && 
                            this.scrollTop > sign)// 注意: && this.scrollTop
            
            if(this.scrollTop >=sign) {
               
            }
            if(this.scrollTop < sign) {
                sign = this.scrollTop;
                binding.value();
               
            }
            
       /*    if(CONDITION) {
                binding.value();
            }*/
    });
    }
});

Vue.prototype.initnowday=function(){
    var date=new Date();
    //年
    var year=date.getFullYear();
    //月
    var month=date.getMonth()+1;
    //日
    var day=date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var ss=date.getSeconds();
    var rq=year+'-'+month+'-'+day
     var nowday='';
     return nowday=rq;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
