<template>
  <div >
    <div class="leftbar">
      <ul>
        <router-link to='/number'>
          <li>
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>指数</p>
          </li>
        </router-link>
         <router-link to='/cityhs'>
          <li>      
          <i class="fa fa-fonticons" aria-hidden="true"></i>
          <p>沪深</p>
          </li>
          </router-link>
       
        <router-link to='/smallmid'>
         <li>
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>中小板</p>
          </li>
        </router-link>
        <router-link to='/work'>
          <li>
          <i class="fa fa-bandcamp" aria-hidden="true"></i>
          <p>创业板</p>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods:{
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftbar{
  width:4vw;
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
  padding: 30px 0;
}
a{
  color: #fff;
  text-decoration: none;
}
.router-link-exact-active li{
  background: #6179A5;
}
</style>
