<template>
  <div class="klines">
    <Header></Header>
    <Kelineleft></Kelineleft>
    <Kimg></Kimg>
    <Kelineright></Kelineright>
    <Bottom ref='child'></Bottom>
  </div>
</template>

<script>
import Header from '../components/navbar/Header'
import Bottom from '../components/num/numbottom'
import Kelineleft from '../components/kline/klineleft'
import Kimg from '../components/kline/kimg'
import Kelineright from '../components/kline/Klinesright'
export default {
  name: 'index',
  components:{
    Kelineleft,
    Kimg,
    Kelineright,
    Header,
    Bottom
  },

  data () {
    return {
     
    }
  },
  created(){
  
  },
  mounted(){
/*   this.$refs.child.getdatabuy();*/
  },
  methods:{
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.klines{
  width: 100%;
  display: inline-block;
  background: #000;
  height: 70vh;
  overflow: hidden;
}
</style>
