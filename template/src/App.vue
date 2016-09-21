<template>
  <div id="app" :style="centerStyle">
      <nav class="navbar navbar-default navbar-static-top">
          <div class="container-fluid">
              <div id="navbar-collapse" class="collapse navbar-collapse">
                  <ul class="nav navbar-nav navbar-left">
                      <div id="nav-container">
                          <h4 title="vue2.0 template">
                              vue2.0 template
                          </h4>
                        </div>
                  </ul>
                  <ul class="nav navbar-nav navbar-right">
                      <li>
                          <a href="https://github.com/yelingfeng">by yelingfeng</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <pie-comp :pie-data="pieData"></pie-comp>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import pieComp from "views/pieView"
export default {
      name : "app",
      data(){
          return  {
              "centerStyle":{

              }
          }
      },
     methods:{
        resizeWin(){
            let ww = $(window).width();
            let wh = $(window).height();

            let piew = ( ww * 0.9  ) - 10;
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
    /*background: url("./assets/images/bg.png") #0e1227 no-repeat;*/
    background-size:cover;
    width : 100%;
    height : 100%;
    overflow: hidden;
}

#app{
    position: relative;
}

.navbar.navbar-default {
    margin-bottom: 0;
    border: none;
    background-color: #293c55;
}
.navbar.navbar-default .navbar-nav >li> a {
    height: 50px;
    color: #efefef;
    padding: 15px 10px;
}
.navbar.navbar-default .navbar-nav>li>a:hover, .navbar.navbar-default .navbar-nav>li>a:focus {
    color: #f3f3f3;
    background-color: #0e151f;
}

#nav-container {
    position: absolute;
    left: 50px;
    right: 60px;
}
#nav-container h4 {
    color: #fff;
    font-family: "Arial";
    text-align: left;
    float: left;
    height: 30px;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 20px
}


</style>
