<template>
  <div >
   <Header></Header>
   <div class="leftbar">
      <!-- <ul>
          <li>
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>指数</p>
          </li>
          <li>      
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>沪深</p>
          </li>       
         <li>
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>中小板</p>
          </li>
          <li>
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>创业板</p>
          </li>
      </ul> -->
      <ul>
      <li v-bind:class="{activclass:index==activclass}"  v-for="(item,index) in title"  @click="toggleTabs(item.name,index)">
          <i :class=cssitem[index] ></i>
          <p>{{item.tile}}</p>
      </li>
    </ul>
    </div>
     <Numbottom  v-bind:itemdata='itemdata'></Numbottom>
     <div>
       <component  :is="currentView" v-on:clild='getdata'>
      </component >
     </div>
  </div>
</template>

<script>
import Header from '../components/navbar/Header'
import Numbottom from '../components/num/numbottom'
import number from '../pages/Number1'
import cityhs from '../pages/Cityhs'
import smallmid from '../pages/Smallmid'
import work from '../pages/Work'
import owngp from '../pages/Owngp'
export default {
  name: 'index',
  components:{
   Header,
   Numbottom,
   number,
   cityhs,
   smallmid,
   work,
   owngp
  
  },

  data () {
    return {
       activclass: 0,
       currentView:'number',
        itemdata:'',
        cssitem:["fa fa-expand","fa fa-bar-chart","fa fa-bandcamp","fa fa-fonticons","fa fa-arrows-alt"],
      title:[
    {
      name:'number',
      tile:'指数',
 
    },{
       name:'cityhs',
      tile:'沪深',
 
    },{
        name:'smallmid',
        tile:'中小板',

    },{
       name:'work',
      tile:'创业板',
    },{
       name:'owngp',
      tile:'自选股',
    }],
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
  toggleTabs(tabItem,index){
      this.currentView = tabItem;
       this.activclass=index;
     if(this.currentView=='number'){
      console.log(1);
     }else if(this.currentView=='cityhs'){
         console.log(2);
       }else if(this.currentView=='smallmid'){
         console.log(2);
       }else if(this.currentView=='work'){

       }else{
          console.log(3);
       }
  },
  getdata(data){
    this.itemdata=data;
  },

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftbar{
  width:4%;
  background: #16191F;
  color: #fff;
  display: inline-block;
  float: left;
  height:60vh;
}
ul{
  width: 100%;
}
li{
  display: block;
  padding: 20px 0;
  color: #fff;
}
a{
  color: #fff;
  text-decoration: none;
}
.router-link-exact-active li{
  background: #6179A5;
}
.activclass{
    background: #6179A5;
}
</style>
