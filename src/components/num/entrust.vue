<template>
  <div>
  <div class="head">
    <button @click='update'>刷新</button>
    <!-- <button @click='chedan'>撤单</button>
    <button @click='chedanall'>全撤</button> -->
  </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
      v-loadmore='loadMore'
       @row-click='chooseitem'
      highlight-current-row 
      :data="tableData3" 
      height='100%' 
      :cell-style="tablepading"
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
        rowitem:'',
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
      tile:'冻结资金',
       key:'frzone',
       width:'100'
    },{
      tile:'撤单数量',
       key:'cdcount',
       width:'100'
    },{
      tile:'成交数量',
       key:'ccount',
       width:'100'
    },{
      tile:'委托状态',
       key:'status',
       width:''
    }
    ], 
   tableData3: [],
   currentRow:'',
   loadSign:'',
   page:1,
   pages:'',
    token:localStorage.getItem('token'),
   uid:localStorage.getItem('uid'),
      };
    },
   created(){
     
    },
    watch:{
     state(val){
        if(val=='weituo'){
          this.tableData3=[];
          this.page=1;
          this.getdata();
        }
      },
    },
    methods: {
      getdata(){  //委托列表
        let url=_const.requestUrl+'/hcfshares/codeinfo/entrustTranac'
      let data={
        token:this.token,
        uid:this.uid,
        startDate:'',
        endDate:'',
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
                 res.data.list[i].ordertype=='0'?res.data.list[i].ordertype='限价':res.data.list[i].ordertype='市价'
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
       console.log('到底了', this.page)
     }
    },

      update(row){  //刷新
        /* this.$refs.singleTable.setCurrentRow(row);*/
         this.tableData3=[];
        this.page=1;
      this.getdata();
      },
      handleCurrentChange(val){
         this.currentRow = val;
      },
      chooseitem(row){  //选中某行个股详情
        this.rowitem=row;
        console.log(this.rowitem);
         let url=_const.requestUrl+'/hcfshares/optional/singleScodeInfo'
      let data={
        token:this.token,
        uid:this.uid,
        scode:row.scode
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
             _this.singledata=res.data[0];
             _this.$emit('detail',res.data)
            }else if(res.code==400){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
      let url2=_const.requestUrl+'/hcfshares/commionwith/canBuyShares' //可买数量
      let data2={
        token:_this.token,
        uid:_this.uid,
        scode:row.scode,
        sharesprice:row.price,
      }
       $.ajax({
         url:url2, 
          dataType:"json",   
          data:data2,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
               _this.$emit('canbuynum',res.data)
            }else if(res.code==400){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
       let url3=_const.requestUrl+'/hcfshares/commionwith/canSellSharesNum' //可卖数量
      let data3={
        token:_this.token,
        uid:_this.uid,
        scode:row.scode,
      }
       $.ajax({
         url:url3, 
          dataType:"json",   
          data:data3,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
               _this.$emit('cansellnum',res.data)
            }else if(res.code==400){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });  
      },
      chedan(){  //撤单
        if(this.rowitem==''){
          this.$message.error('请选择');
          return;
        }
         this.$confirm('是否进行撤单操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=_const.requestUrl+'/hcfshares/commionwith/reofTrust'
      let data={
        token:this.token,
        uid:this.uid,
        orderid:this.rowitem.orderid,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.$message.success(res.msg);
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }else if(res.code==400){
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
            message: '已取消'
          });          
        });
      },
      chedanall(){ //全撤
        if(this.tableData3.length==0){
          this.$message.error('无数据');
          return;
        }
         this.$confirm('是否进行全部撤单操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=_const.requestUrl+'/hcfshares/commionwith/reofTrust'
      let data={
        token:this.token,
        uid:this.uid,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.$message.success(res.msg);
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }else if(res.code==400){
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
            message: '已取消'
          });          
        });
      },
      handleClick(tab, event) {
        
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


    }
  };
</script>
<style scoped>
 .head{
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 0.7rem;
 }
button{
   background: #3385ff;
  color: #fff;
  border: none;
  padding: 3px 8px;
  border-radius: 2px;
  margin-right: 20px; 
 }
 .model{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: rgba(255,255,255,0.2);
  display: none;
  color: #000;
  font-size: 14px;
}
.content{
  width: 500px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -255px;
} 
</style>