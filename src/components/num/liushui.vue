<template>
  <div>
    <div class="head">
     <span style='color:#fff'>起始时间：</span>
     <input type="date" v-model='startlsDate'>
     <span style='color:#fff'>终止时间：</span>
     <input type="date" v-model='endlsDate'>
      <button @click='searchlist'>查询</button>
    </div>
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
      tile:'订单号',
      key:'orderid',
      width:'160'
    },{
      tile:'金额',
      key:'amount',
      width:'80'
    },{
      tile:'流水方向',
       key:'type',
        width:'80'
    },{
      tile:'日期',
       key:'ftime',
       width:'160'
    },{
      tile:'备注',
       key:'remark',
        width:''
    }],  
   tableData3: [],
    loadSign:'',
    page:1,
    pages:'',
    startlsDate:'',
    endlsDate:'',
      };
    },
   watch:{
      state(val){
        if(val=='liushui'){
           this.tableData3=[];
          this.page=1;
          this.getdataliushui();
        }
         
      }
    }, 
    methods: {
      getdataliushui(){
        let url=_const.requestUrl+'/hcfshares/codeinfo/capitalFlow'
      let data={
        token:_const.token,
        uid:_const.uid,
        startDate:this.startlsDate,
        endDate:this.endlsDate,
        page:this.page,
        size:20,

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
                res.data.list[i].type=='1'?res.data.list[i].type='流出':res.data.list[i].type='流入';              
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
        console.log(this.loadSign);
         if (this.loadSign) {
           this.page++
           this.getdataliushui();
           if (this.page == this.pages) {
            this.loadSign = false;
             return;
           }
        /*   setTimeout(() => {
             this.loadSign = true
           }, 1000)*/
         }
        },
        searchlist(){  //查询
          this.tableData3=[];
          this.page=1;
          this.getdataliushui();
        },
        tablepading({row, column, rowIndex, columnIndex}){ //颜色判断
          if(row.type=='流入'&&column.label=='流水方向'){
           return "color:red"
         }else if(row.type=='流出'&&column.label=='流水方向'){
           return "color:#1a87ed"
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