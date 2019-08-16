<template>
  <div id="app">
<!--  <Header></Header>
   <div ><Leftbar></Leftbar></div>
    <Numbottom ></Numbottom> -->
    <router-view/>
  </div>
</template>

<script>
/*import Header from './components/navbar/Header'
import Leftbar from './components/leftbar/Leftbar'
import Numbottom from './components/num/numbottom'*/
export default {
  name: 'App',
    components:{
/*  Header,
   Leftbar,
   Numbottom*/
  },
  data(){
    return {
       /*show:false,*/
    }
  },
  created(){
    /* $('.num_bottom,.footer,.leftbar,.header').hide()*/
  },
  watch:{
    $route(to,from){
   /*   console.log(this.$route.path);*/
      /*if(to.path=='/number'){
        console.log(to.path);
        this.show=true;
       $('.num_bottom,.footer,.leftbar,.header').show()
      }*/
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
body{
  margin: 0;
  padding: 0;
  height: 100vh;
  font-size: 0.22rem !important;
  overflow: hidden;
  min-width:1000px;
    min-height:800px;
}
img{
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
.num{
  height: 24vh;
  background: #16191F;
}
.el-tabs__content{
  position: static !important;
}
/* 



.el-tabs__item{
  font-size: 16px;
  color: #409EFF;
  padding: 0 36px;
} */
/* .el-tabs__nav-scroll{
  background: #292F39;
  margin-bottom: 2px;
}
.el-tabs__nav-wrap{
  background: #000;
}
 */
 .el-tabs__item{
  color: #fff !important;
  font-size: 0.22rem !important;
 }
/* .el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #13151A !important;
} */
.el-table td, .el-table th.is-leaf{
  border-bottom: 1px solid #000 !important;
}
.el-table td{
   border-bottom: 1px solid #000 !important;
}
.el-table th.is-leaf{
   border-bottom: 1px solid #000 !important;
}
.el-tabs__nav-scroll{
  padding-left: 10px !important;
}
.el-tabs__nav{
  color: #fff !important;
}
.el-tabs--border-card{
  background: #000 !important;
  border:1px solid #000 !important;
}
.el-tabs--border-card>.el-tabs__header{
    border-bottom:1px solid #000 !important;
}
.el-tabs__nav-scroll{
  background: #16191F  !important;
}
.el-tabs--border-card>.el-tabs__header{
  border: none;
}
.el-tabs__nav-wrap::after{
  height:0 !important;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0.1rem !important;
}
.el-table::before{
  display: none !important;
}
.el-table{
  font-size: 0.22rem !important;
}
.el-table__body tr.current-row>td{
  background-color: #1F4575 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #1F4575 !important;
  cursor: pointer;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
.el-table__row td{
    padding:4px 0 !important;
}
.el-table tr{
  background-color:#13151A;
  color:#fff !important;
}
.el-table tr{
    background-color:#13151A !important;
}
.hover_row{
  background-color: #1F4575 !important;
}
.el-table__row:hover tr{
  background-color: #1F4575 !important;
}
.el-table__row:hover tr{
   background-color: #1F4575 !important; 
}
.el-table__row tr:hover>td {
  background-color: #1F4575 !important; 
}
.el-tabs__nav-wrap:after{
  height: 0 !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color: #409EFF !important;
}
.el-tabs__item.is-active{
   color: #409EFF !important;
} 
</style>
