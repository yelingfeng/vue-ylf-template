<template>
    <pie-comp :pie-data="pieData"></pie-comp>
</template>
<script>
import pieComp from "views/pieView"
export default {
      name : "app",
      data(){
          return  {

          }
      },
     methods:{
        resizeWin(){
            let ww = $(window).width();
            let wh = $(window).height();

            let piew = ( ww * 0.9  ) - 10;
            let pieh = ( wh  - 50 );

            this.$store.dispatch('RESIZE_PIE',{
                size:{
                    width:piew + "px",
                    height : pieh +"px",
                }
            })
        }

    },
    beforeMount (){
        this.$store.dispatch('INIT_RESOURCE')
        this.resizeWin()
    },
    computed:{
        pieData(){
           return this.$store.getters.getPieData;
        }
    },
    mounted(){
      let me = this;
      $(window).resize(() => {
          this.resizeWin()
      })
    },
    components :{
       pieComp
    }
}
</script>

<style>
body {
    font-family: "Microsoft YaHei",Helvetica, sans-serif;
    /*background: url("./assets/images/bg.png") #0e1227 no-repeat;*/
    background-size:cover;
    width : 100%;
    height : 100%;
    overflow: hidden;
}

#app{
    position: relative;
}


</style>
