<template>
  <div> 
      <button @click='update'>刷新</button>
    <el-tabs v-model="activeName">
        <div class="num" >
      <el-table
       v-loadmore='loadMore'
         highlight-current-row 
      @row-click='chooseitem'
      :data="tableData3" 
      height='100%' 
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
      tile:'股票代码',
      key:'scode',
      width:'100'
    },{
      tile:'股票名称',
      key:'sname',
      width:'100'
    },{
      tile:'总持仓数',
       key:'count',
      width:'100'
    },{
      tile:'可卖数量',
       key:'bcount',
      width:'100'
    },{
      tile:'冻结数量',
       key:'fcount',
      width:'100'
    },{
      tile:'参考成本价',
       key:'price',
      width:'100'
    },{
      tile:'当前价',
       key:'nowPrice',
      width:'100'
    },{
      tile:'浮动盈亏',
       key:'fdyk',
      width:'100'
    },{
      tile:'持仓市值',
       key:'nowValue',
      width:''
    }],  
     tableData3: [],
     page:1,
     pages:'',
     loadSign:'',
     rowitem:'',
       timer:'',
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
              }, 5000)
              }
         }
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },
    methods: {
       getdata(){  //用户持仓
        console.log(1);
       let url=_const.requestUrl+'/hcfshares/codeinfo/holdPositionList'
      let data={
        token:_const.token,
        uid:_const.uid,
        page:this.page,
        size:10
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.tableData3=res.data.list;
               _this.pages=res.data.pages;
              _this.loadSign=res.data.hasNextPage;
            }else if(res.code==400){
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
    update(){ //刷新
      this.page=1;
      this.getdata();
    },
    chooseitem(row){  //选中某行个股详情
        this.rowitem=row;
        console.log(this.rowitem);
         let url=_const.requestUrl+'/hcfshares/optional/singleScodeInfo'
      let data={
        token:_const.token,
        uid:_const.uid,
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
        token:_const.token,
        uid:_const.uid,
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
        token:_const.token,
        uid:_const.uid,
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
       this.$router.push({path:'/klines',query:{scode:row.scode}})  
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
  position: absolute;
  right: 20px;top: 0.7rem;
 }  
</style>