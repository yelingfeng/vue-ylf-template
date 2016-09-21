<template>
  <div id="app" :style="centerStyle">
        <div class="container-fluid">
            <div class="row">
                <pieComp></pieComp>
            </div>
        </div>
  </div>
</template>

<script>
import pieComp from "views/pieView"
export default {
      name : "app",
      data(){
          const opData = {
              "centerStyle":{

              },
          }
          return opData;
      },
    methods:{
        resizeWin(){
            let ww = $(window).width();
            let wh = $(window).height();

            let piew = ( ww * 0.6  ) - 10;
            let pieh = ( wh  - 50 );

            this.centerStyle.width = ww +"px";
            this.centerStyle.height = wh +"px";

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
    background: url("./assets/images/bg.png") #0e1227 no-repeat;
    background-size:cover;
    width : 100%;
    height : 100%;
    overflow: hidden;
}

#app{
    position: relative;
}

</style>
