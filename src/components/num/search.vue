<template>
  <div class="search">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="当日委托" name="first">
       <el-tabs v-model="activeName">
        <div class="num" >
          <el-table
           :cell-style="tablepading"
          v-loadmore='loadMore'
          :data="tableData3" 
          :header-cell-style="{'background-color':'#1F232B','color':'#848fa3','width':'100%',}"
          height="100%"        
          style="width: 100%;background:#000">
          <el-table-column
          v-for="(item,index) in title"
           :label="item.tile" 
           :key="item.index" 
           :property="item.key"    
            :width="item.width" >
             <template slot-scope="scope">
                {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
              </template>
          </el-table-column> 
    </el-table>
    </div>
    </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="当日成交" name="second"><Drcj  v-bind:state='state'></Drcj></el-tab-pane>
    <el-tab-pane label="历史委托" name="third"><Lswt  v-bind:state='state'></Lswt></el-tab-pane>
    <el-tab-pane label="历史成交" name="fourth"><Lscj v-bind:state='state'></Lscj></el-tab-pane>
    <el-tab-pane label="资产" name="five"><Zc v-bind:state='state'></Zc></el-tab-pane>
    <el-tab-pane label="资金流水" name="six"><Liushui  v-bind:state='state'></Liushui></el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import Drcj from './drcj'
import Lswt from './lswt'
import Lscj from './lscj'
import Zc from './zc'
import Liushui from './liushui'
  export default {
    components:{
      Drcj,
      Lswt,
      Lscj,
      Zc,
      Liushui
  },
    data() {
      return {
        activeName:'first',
        state:'',
         title:[
    {
      tile:'股票代码',
       key:'scode',
       width:'100'
    },{
      tile:'股票名称',
       key:'sname',
       width:'80'
    },{
      tile:'委托编号',
      key:'orderid',
      width:'160'
    },{
      tile:'委托方向',
       key:'type',
        width:'80'
    },{
      tile:'下单类型',
       key:'ordertype',
       width:'100'
    },{
      tile:'委托价格',
       key:'price',
       width:'80'
    },{
      tile:'委托数量',
       key:'count',
       width:'80'
    },{
      tile:'成交数量',
       key:'ccount',
       width:'80'
    },{
      tile:'订单冻结总资金',
       key:'frzone',
       width:'120'
    },{
      tile:'订单状态',
       key:'status',
       width:'80'
    },{
      tile:'委托时间',
      key:'ftime',
      width:''
    }],  
   tableData3: [],
      loadSign:'',
     page:1,
     pages:''
    }
   }, 
   created(){
    this.getdata();
   },
   watch:{
    activeName(val){
      if(val=='second'){
        this.state='drcj'
      }else if(val=='third'){
        this.state='lswt'
       /*  this.$refs.lswt.getdatalswt();*/
      }else if(val=='fourth'){
       this.state='lscj'
        /*  this.$refs.mychild.getdatalsxj();*/
      }else if(val=='five'){
        this.state='zc'
      }else if(val=='six'){
         this.state='liushui'
      }else if(val=='first'){
        this.getdata();
      }
    }
   },
    methods: {
      getdata(){
        this.tableData3=[];
        let url=_const.requestUrl+'/hcfshares/codeinfo/entrustTranac'
      let data={
        token:_const.token,
        uid:_const.uid,
        startDate:this.initnowday(),
        endDate:this.initnowday(),
        page:this.page,
        size:20,
        status:'',
        type:'',
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
             _this.pages=res.data.pages;
              _this.loadSign=res.data.hasNextPage;
               for(var i=0;i< res.data.list.length;i++){               
                res.data.list[i].type=='0'?res.data.list[i].type='买入':res.data.list[i].type='卖出'
                res.data.list[i].status=='0'?res.data.list[i].status='委托中':res.data.list[i].status=='1'?res.data.list[i].status='成交':res.data.list[i].status='撤单'
              }
              if(this.page==1){
               _this.tableData3=res.data.list; 

              }else{
               for(var i=0;i<res.data.list.length;i++){               
                  _this.tableData3.push(res.data.list[i]);
                }
              } 

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
    loadMore () {
     if (this.loadSign) {
       this.page++
       this.getdata();
       if (this.page == this.pages) {
        this.loadSign = false;
         return;
       }
       setTimeout(() => {
         this.loadSign = true
       }, 1000)
     }
    },
    tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
          if(row.type=='买入'&&column.label=='委托方向'){
           return "color:red"
         }else if(row.type=='卖出'&&column.label=='委托方向'){
           return "color:#1a87ed"
         }
         if(row.ordertype=='市价'&&column.label=='下单类型'){
           return "color:rgb(255, 255, 0)"
         }else if(row.ordertype=='限价'&&column.label=='下单类型'){
           return "color:#fff"
         }
          
       },
     handleClick(){

     },
    }
  };
</script>
<style scoped>
.ul{
  width: 100%;
  background: #13151;
}
li{
  display: inline-block;
}
</style>