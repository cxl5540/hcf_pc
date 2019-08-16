<template>
  <div class="num" style='position: relative;'>
    <el-table
    ref="tablehs"
     highlight-current-row 
    :data="tableData3"
    height="100%"
    :cell-style="tablepading"
      v-loadmore='loadMore'
    v-tabelLoadmore='upload'
     @row-click='chooseitem'
      @row-dblclick='gok'
      @header-click='updown'
     :header-cell-style="{'background-color':'#1F232B','color':'#848fa3','width':'100%',}"
    style="width: 100%;background:#000">
    <el-table-column
    v-for="(item,index) in title"
     :label="item.tile" 
     :key="item.index" 
     :property="item.key"  
     :width="item.width">
       <template slot-scope="scope">
                   {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
              </template>
    </el-table-column>
  </el-table>
 <div class="feny">
   <div class="fenlt" @click='gofirst'>
     <div class="d4" style='position: absolute;top: 0;right: 6px'></div>
     <div class="d4"></div>
   </div>
    <div class="d4"  @click='gopre'></div>
    <p><span>{{page}}</span>/<span>{{lastPage}}</span></p>
    <div class="d2"  @click='gonext'></div>
    <div class="fenrt"  @click='golast'>
      <div class="d2"></div>
      <div class="d2" style='position: absolute;top: 0;left: 6px'></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
    components:{
  },
  data () {
    return {
    title:[
    {
      tile:'代码',
      key:'prod_code',
      width:'100'
    },{
      tile:'名称',
      key:'prod_name',
      width:'100'
    },{
      tile:'涨幅%',
       key:'px_change_rate',
      width:'100'
    },{
      tile:'最新价',
       key:'last_px',
      width:'100'
    },{
      tile:'涨跌',
       key:'px_change',
      width:'100'
    },{
      tile:'买价',
       key:'bid',
      width:'100'
    },{
      tile:'卖价',
       key:'ask',
      width:'100'
    },{
      tile:'成交量',
       key:'turnover_volume',
      width:'100'
    },{
      tile:'昨收',
       key:'preclose_px',
      width:'100'
    },{
      tile:'开盘',
       key:'open_px',
      width:'100'
    },{
      tile:'最高',
       key:'high_px',
      width:'100'
    },{
      tile:'最低',
       key:'low_px',
      width:'100'
    },{
      tile:'成交额',
       key:'turnover_value',
      width:'100'
    },{
      tile:'总市值',
       key:'market_value'
    }],  
   tableData3: [],
   loadSign:'',
   page:1,
   pages:'',
   lastPage:'',
   px:'desc',
  timer:''
         
    }
  },
  created(){
  this.gethsdata();
     $('.feny').hide();
  },
  mounted(){
   let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
            this.timer = setInterval(() => {
                this.gethsdata();
           }, 10000)
           /* setInterval(function(){
              _this.gethsdata();
            },10000);*/
          }
     }
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods:{
    gethsdata(){
     /* $('.feny').hide();*/
      let url=_const.requestUrl+'/hcfshares/optional/foundQuotationList'
      let data={
        type:'hs_a',
        sorttyp:this.px,
        page:this.page,
        size:50
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.tableData3=res.data.date;
            _this.lastPage=res.data.pages;
            }else if(res.code==400){
               _this.$message.error(res.msg);
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    },
    gofirst(){
     this.page=1;
     this.gethsdata();
      
    },
    gopre(){
     this.page--;
      this.gethsdata();
     let _this=this;
    },
    gonext(){
      this.page++;
      this.gethsdata();
       let _this=this;
    },
    golast(){
      this.page=this.lastPage;
     this.gethsdata();
      let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
            setInterval(function(){
              _this.gethsdata();
            },10000);
          }
     }
    },
     loadMore () {
       $('.feny').fadeIn()
        },
      upload(){
      $('.feny').fadeOut()
      },  
    gok(row,event,column){
    this.$router.push({path:'/klines',query:{scode:row.prod_code}});
   
   },
   updown(column,event){  //排序
      if(column.label=='涨幅%'){
        console.log( this.px);
        this.px=='desc'?this.px='asc':this.px='desc'
        this.gethsdata();
      }
   },
   chooseitem(row){
      this.$router.push({path:'/index',query:{scode:row.prod_code}});
   },
    tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
     if(row.px_change_rate>0&&column.label=='涨幅%'){
       return "color:red"
     }else if(row.px_change_rate<0&&column.label=='涨幅%'){
       return "color:#00FF00"
     }
      if(row.px_change_rate>0&&column.label=='最新价'){
       return "color:red"
     }else if(row.px_change_rate<0 &&column.label=='最新价'){
       return "color:#00FF00"
     }
     if(row.px_change_rate>0&&column.label=='涨跌'){
       return "color:red"
     }else if(row.px_change_rate<0 &&column.label=='涨跌'){
       return "color:#00FF00"
     }
     if(row.open_px>row.preclose_px &&column.label=='开盘'){
       return "color:red"
     }else if(row.open_px<row.preclose_px &&column.label=='开盘'){
       return "color:#00FF00"
     }
     if(row.high_px>row.preclose_px &&column.label=='最高'){
       return "color:red"
     }else if(row.high_px<row.preclose_px &&column.label=='最高'){
       return "color:#00FF00"
     }
     if(row.low_px>row.preclose_px &&column.label=='最低'){
       return "color:red"
     }else if(row.low_px<row.preclose_px &&column.label=='最低'){
       return "color:#00FF00"
     }
   },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.num{
  width: 96%;
  background: #000;
 height: 55vh;
text-align: left;
float: left;
}
table{
  background: #000;
}
.el-table td, .el-table th{
    padding: 4px 0 !important;
}
.feny{
width: 16%;
margin: auto;
position: absolute;
bottom: 20px;
right: 0;
color: #fff;
display: none;
}
.feny div{
  display: inline-block;
}
.feny p{
  display: inline-block;
  font-size: 0.32rem;
    margin: 0 .2rem;
    position: relative;
    top: -0.05rem;
}
.fenrt,.fenlt{
  position: relative;
}
.d2,.d4{
   width: 0; 
 height: 0;
 border-width: 0.15rem;
 border-style: solid; 
}
.d4{
 
 border-color: transparent #fff transparent transparent;
}
.d2{
 border-color: transparent  transparent  transparent #fff;
}
</style>
