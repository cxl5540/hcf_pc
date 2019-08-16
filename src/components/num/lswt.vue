<template>
  <div>
  <div class="head">
   <span style='color:#fff'>起始时间：</span>
   <input type="date" v-model='startDate'>
   <span style='color:#fff'>终止时间：</span>
   <input type="date" v-model='endDate'>
    <button @click='searchlist'>查询</button>
  </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loadmore='loadMore'
      :cell-style="tablepading"
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
      tile:'委托编号',
      key:'orderid',
      width:'160'
    },{
      tile:'股票代码',
       key:'scode',
       width:'100'
    },{
      tile:'股票名称',
       key:'sname',
       width:'100'
    },{
      tile:'委托方向',
       key:'type',
       width:'100'
    },{
      tile:'下单类型',
       key:'ordertype',
       width:'100'
    },{
      tile:'委托时间',
      key:'ctime',
      width:'160'
    },{
      tile:'委托价格',
       key:'price',
       width:'100'
    },{
      tile:'委托数量',
       key:'count',
       width:'100'
    },{
      tile:'成交数量',
       key:'ccount',
       width:'100',
    },{
      tile:'委托状态',
       key:'status',
       width:''
    }
    ],   
   tableData3: [],
   loadSign:'',
   page:1,
   pages:'',
   startDate:'',
   endDate:'',
      };
    },
    watch:{
      state(val){
        if(val=='lswt'){
          this.tableData3=[];
          this.page=1;
          this.getdatalswt();
        }
       
      }
    },
    methods: {
       getdatalswt(){
        let url=_const.requestUrl+'/hcfshares/codeinfo/entrustTranac'
      let data={
        token:_const.token,
        uid:_const.uid,
        startDate:this.startDate,
        endDate:this.endDate,
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
           this.getdatalswt();
           if (this.page == this.pages) {
            this.loadSign = false;
             return;
           }
       /*    setTimeout(() => {
             this.loadSign = true
           }, 1000)*/
         }
        },
        searchlist(){  //查询
          this.tableData3=[];
          this.page=1;
          this.getdatalswt();
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
      handleClick(tab, event) {
        
      },


    }
  };
</script>
<style scoped>
 button{
  background: #3385ff;
  color: #fff;
  border: none;
  padding: 3px 8px;
  border-radius: 2px;
  margin-right: 20px;
 }
.head{
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 0.7rem;
 } 
</style>