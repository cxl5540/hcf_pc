<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
          <el-table
           :cell-style="tablepading"
          v-loadmore='loadMore'
          :data="tableData3"  
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
      tile:'成交编号',
      key:'orderid',
      width:'160'
    },{
      tile:'股票代码',
      key:'scode',
      width:'80'
    },{
      tile:'股票名称',
       key:'sname',
        width:'80'
    },{
      tile:'交易方向',
       key:'type',
       width:'80'
    },{
      tile:'成交数量',
       key:'ccount',
       width:'80'
    },{
      tile:'成交时间',
       key:'ftime',
       width:'160'
    },{
      tile:'成交价格',
       key:'cprice',
        width:'80'
    },{
      tile:'成交金额',
       key:'amount',
       width:'80'
    },{
      tile:'佣金',
       key:'tax',
       width:'80'
    },{
      tile:'印花税',
       key:'duty',
       width:''
    }],  
   tableData3: [],
   loadSign:'',
   page:1,
   pages:''
      };
    },
    watch:{
      state(val){
         console.log(val);
        if(val=='drcj'){
          this.tableData3=[];
          this.page=1;
          this.getdatadrcj();
        }
          
      }
    },
    methods: {
       getdatadrcj(){
        let url=_const.requestUrl+'/hcfshares/codeinfo/entrustTranac'
      let data={
        token:_const.token,
        uid:_const.uid,
        startDate:this.initnowday(),
        endDate:this.initnowday(),
        page:this.page,
        size:20,
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
                _this.pages=res.data.pages;
              _this.loadSign=res.data.hasNextPage;
               for(var i=0;i< res.data.list.length;i++){               
                res.data.list[i].type=='0'?res.data.list[i].type='买入':res.data.list[i].type='卖出'
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
       this.getdatadrcj();
       if (this.page == this.pages) {
        this.loadSign = false;
         return;
       }
/*       setTimeout(() => {
         this.loadSign = true
       }, 1000)*/
     }
    },

      handleClick(tab, event) {
        
      },
      tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
          if(row.type=='买入'&&column.label=='交易方向'){
           return "color:red"
         }else if(row.type=='卖出'&&column.label=='交易方向'){
           return "color:#1a87ed"
         }
          
       },
    }
  };
</script>
<style scoped>
  
</style>