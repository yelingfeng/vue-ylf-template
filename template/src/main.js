import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import path from "path"
import $ from "jquery"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/reset.css"
import "./assets/lib/layer_mobile/need/layer.css"
import "./assets/lib/layer_mobile/layer"
import "bootstrap/dist/js/bootstrap.min"
import "./assets/lib/easyui/css/easyui_view.css"
import "./assets/lib/easyui/css/icon.css"
import "foundation-datepicker/js/foundation-datepicker.min"
import "foundation-datepicker/js/locales/foundation-datepicker.zh-CN"
import "foundation-datepicker/css/foundation-datepicker.min.css"
import "font-awesome/css/font-awesome.css"

if(process.env.NODE_ENV !== 'production'){
    console.log = (function(log){
        return function(obj){
            log.call(console,JSON.parse(JSON.stringify(obj)));
        }
    })(console.log);
}else{
    console.log = function(){
    }
}

new Vue({
  store,
  render: h => h(App)
}).$mount("#app")
