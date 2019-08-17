<template>
  <div>
    <div class="head">
      <button @click='update'>刷新</button>
      <button @click='chedan'>撤单</button>
      <button style="margin-right:10px;"  @click='chedanall'>全撤</button>
    </div>
    <el-tabs v-model="activeName">
        <div class="num" >
      <el-table
       highlight-current-row 
        @row-click='chooseitem'
         :cell-style="tablepading"
      v-loadmore='loadMore'
      :data="tableData3" 
      height="100%" 
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
       width:'100'
    },{
      tile:'委托状态',
       key:'status',
       width:''
    }
    ],  
   tableData3: [],
   page:1,
   pages:'',
   loadSign:'',
   rowitem:'',
  token:localStorage.getItem('token'),
  uid:localStorage.getItem('uid'),
      };
    },
    created(){
      this.getdata();  
    },
    methods: {
      getdata(){
        let url=_const.requestUrl+'/hcfshares/codeinfo/entrustTranac'
      let data={
        token:this.token,
        uid:this.uid,
        startDate:'',
        endDate:'',
        page:this.page,
        size:20,
        status:0,
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
      update(){  //刷新
        this.tableData3=[];
        this.page=1;
        this.getdata();
      },
      chooseitem(row){  //选中某行
        this.rowitem=row;
        console.log(this.rowitem);
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
              _this.update();
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
          let url=_const.requestUrl+'/hcfshares/commionwith/reofTrustAll'
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
               _this.update();
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
        tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
          if(row.type=='买入'&&column.label=='委托方向'){
           return "color:red"
         }else if(row.type=='卖出'&&column.label=='委托方向'){
           return "color:#1a87ed"
         }
          
       },
      handleClick(tab, event) {
        
      },
    }
  };
</script>
<style scoped>
.head{
  background: rgb(31, 35, 43);
  text-align: right;
  margin-bottom: 2px;
  margin-top: 2px;
  padding: 4px 0;
}
 button{
  background: #3385ff;
  color: #fff;
  border: none;
  padding: 3px 8px;
  border-radius: 2px;
  margin-right: 20px;
 } 
</style>