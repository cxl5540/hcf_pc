<template>
  <div class="num" >
    <el-table
    ref="tablehs"
     highlight-current-row 
    :data="tableData3"
    height="100%"
    :cell-style="tablepading"
     @row-click='chooseitem'
      @row-dblclick='gok'
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
     <el-table-column
      highlight-current-row 
       label="操作"
       fixed="right"
      width="200">
      <template slot-scope="scope">
         <el-button @click="delown(scope.row)" type="text" size="small" >取消自选股</el-button>
      </template>
    </el-table-column>
  
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
       key:'market_value',
        width:'360'
    }
    ],  
   tableData3: [],
      getIndex:'',
      timer:'',
      token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
         
    }
  },
  created(){
  this.getdata();
  },
  mounted(){
    let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
             this.timer = setInterval(() => {
                this.getdata();
           }, 3000)
            /*setInterval(function(){
              _this.getdata();
            },3000);*/
          }
    }
  },
 beforeDestroy(){
    clearInterval(this.timer);
  },
  methods:{
    getdata(){
      let url=_const.requestUrl+'/hcfshares/optional/queryOptionalQuotation'
      let data={
        fields:'prod_name,prod_code,px_change_rate,px_change,last_px,open_px,high_px,low_px,turnover_value,turnover_volume,preclose_px,market_value,preclose_px',
        uid:this.uid,
        token:this.token,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){           
             for(var i=0;i<res.data.length;i++){
              res.data[i].px_change= Number(res.data[i].px_change).toFixed(2);
              res.data[i].px_change_rate= Number(res.data[i].px_change_rate).toFixed(2);
              res.data[i].last_px= Number(res.data[i].last_px).toFixed(2);
              res.data[i].open_px= Number(res.data[i].open_px).toFixed(2);
              res.data[i].high_px= Number(res.data[i].high_px).toFixed(2);
              res.data[i].low_px= Number(res.data[i].low_px).toFixed(2);
              res.data[i].preclose_px= Number(res.data[i].preclose_px).toFixed(2);
              if(res.data[i].turnover_volume>10000&&res.data[i].turnover_volume<10000000){
                res.data[i].turnover_volume=Number(res.data[i].turnover_volume/10000).toFixed(2)+'万'
              }else if(res.data[i].turnover_volume>10000000&&res.data[i].turnover_volume<100000000){
                  res.data[i].turnover_volume=Number(res.data[i].turnover_volume/10000000).toFixed(2)+'千万'
              }else if(res.data[i].turnover_volume>=100000000){
                 res.data[i].turnover_volume=Number(res.data[i].turnover_volume/100000000).toFixed(2)+'亿'
              }
              if(res.data[i].turnover_value>10000&&res.data[i].turnover_value<10000000){
                res.data[i].turnover_value=Number(res.data[i].turnover_value/10000).toFixed(2)+'万'
              }else if(res.data[i].turnover_value>10000000&&res.data[i].turnover_value<100000000){
                  res.data[i].turnover_value=Number(res.data[i].turnover_value/10000000).toFixed(2)+'千万'
              }else if(res.data[i].turnover_value>=100000000){
                 res.data[i].turnover_value=Number(res.data[i].turnover_value/100000000).toFixed(2)+'亿'
              }
             }
              _this.tableData3=res.data;

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
  gok(row,event,column){
    this.$router.push({path:'/klines',query:{scode:row.prod_code}});
   
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
    delown(row){
       this.$confirm('是否删除此条自选股?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {                  
            let url=_const.requestUrl+'/hcfshares/optional/userDelOptional'
            let data={
              token:_const.token,
              uid:_const.uid,
              scode:row.prod_code,
            }
            let _this=this;
             $.ajax({
               url:url, 
                dataType:"json",   
                data:data,    //参数值
                type:"POST",   //请求方式
                success:function(res){
                  if(res.code==0){
                    _this.$message.success('删除成功');
                   /* _this.tableData3*/
                   _this.getdata();
                 /*  _this.tableData3.splice(_this.chooseitem.index, 1);*/
                 }
                 if(res.code==402){
                    _this.$message.error(res.msg);
                 }
                },         
                error:function(){
                   _this.$message.error(res.msg);
                }
            });        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
   },
   

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.num{
  width: 96%;
  background: #000;
 height: 60vh;
text-align: left;
float: left;
}
table{
  background: #000;
}
.el-table td, .el-table th{
    padding: 4px 0 !important;
}
</style>
