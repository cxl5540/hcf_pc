<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      :data="tableData3"  
      :cell-style="tablepading"
      height='100%'
       :header-cell-style="{'background-color':'#1F232B','color':'#848fa3','width':'100%',}"
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
  </div>
</template>
<script>
  export default {
    props:['state'],
    data() {
      return {
        activeName: 'first',
         title:[
    {
      tile:'保证金余额',
      key:'bzjye',
      width:'100'
    },{
      tile:'预警线',
      key:'yjx',
      width:'80'
    },{
      tile:'平仓线',
       key:'pcx',
        width:'80'
    },{
      tile:'总资产',
       key:'totalAssets',
       width:'80'
    },{
      tile:'保证金',
       key:'blance',
        width:'100'
    },{
      tile:'自有资金',
       key:'curOwnFunds',
       width:'100'
    },{
      tile:'可用资金',
       key:'ableFunds',
       width:'100'
    },{
      tile:'可取资金',
       key:'ky',
       width:'100'
    },{
      tile:'冻结资金',
       key:'frozenMoney',
       width:'100'
    },{
      tile:'配资资金',
       key:'assets',
       width:'100'
    },{
      tile:'浮动盈亏',
       key:'fdyk',
       width:'100'
    },{
      tile:'平仓盈亏',
       key:'plus',
       width:'100'
    },{
      tile:'亏损比例',
       key:'fdykb',
       width:'100'
    },{
      tile:'累计盈亏',
       key:'curProfit',
       width:'100'
    },{
      tile:'保证金余额',
       key:'bzjye',
       width:'100'
    },{
      tile:'配资余额',
       key:'pzye',
       width:'100'
    },{
      tile:'开仓成本',
       key:'repCouPrice',
       width:'100'
    },{
      tile:'持仓市值',
       key:'repNowPrice',
       width:''
    }],  
   tableData3: [],
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
      };
    },
   watch:{
      state(val){
        if(val=='zc'){
           this.getdatazc();
        }
      
      }
    }, 
    methods: {
      getdatazc(){
         this.tableData3=[];
        let url=_const.requestUrl+'/hcfshares/codeinfo/userAssets'
      let data={
        token:this.token,
        uid:this.uid,
        startDate:'',
        endDate:'',
        page:'1',
        size:10,
        status:1,
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
            /*  _this.tableData3=res.data;*/
            _this.tableData3.push(res.data)
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
      handleClick(tab, event) {
        
      },

              //设置表头行的样式
     tablepading({row, column, rowIndex, columnIndex}){
      if(row.fdyk>0&&column.label=='浮动盈亏'){
           return "color:red"
         }else if(row.fdyk<0&&column.label=='浮动盈亏'){
           return "color:#00ff00"
         }
         if(row.plus>0&&column.label=='平仓盈亏'){
           return "color:red"
         }else if(row.plus<0&&column.label=='平仓盈亏'){
           return "color:#00ff00"
         }
         if(row.curProfit>0&&column.label=='累计盈亏'){
           return "color:red"
         }else if(row.curProfit<0&&column.label=='累计盈亏'){
           return "color:#00ff00"
         }
          if(row.fdykb>0&&column.label=='亏损比例'){
           return "color:red"
         }else if(row.fdykb<0&&column.label=='亏损比例'){
           return "color:#00ff00"
         }   
     },
    }
  };
</script>
<style scoped>
  
</style>