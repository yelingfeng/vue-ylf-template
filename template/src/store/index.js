/**
 * Created by yelingfeng on 2016/8/12.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import API from "../api"
import createLogger from 'vuex/logger'
Vue.use(Vuex)
const isProd = process.env.NODE_ENV === 'production'
const plugins = isProd ? [] : [createLogger];


const store = new Vuex.Store({
    plugins: plugins,
    state: {
        pieData:[],
        pieStyle:{},
    },
    actions: {
        INIT_RESOURCE:({commit , dispatch,state}) => {
            API.getCircleData(param).then((resp)=>{
                commit('INIT_PIE',resp.data.result)
            })
        },
        RESIZE_PIE:({commit,state},{size}) =>{
            commit('RESIZE_PIE',{size})
        }
    },
    mutations: {
        INIT_PIE:(state , d) =>{
            state.pieData = d ;
        },
        RESIZE_PIE:(state , { size })=> {
            state.pieStyle = size ;
        }
    },
    getters: {
        getPieData(state){
            return state.pieData
        },
        getPieStyle(state){
            return state.pieStyle
        }
    }
})

export default store