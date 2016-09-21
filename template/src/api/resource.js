/**
 * Created by  on 2016/4/1.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'

Vue.use(VueResource);
Vue.http.options.crossOrigin = true;

const isProd = process.env.NODE_ENV === 'production'

const pieUrl = API_ROOT + "getPieData";

// 饼图接口
export const getCircleData = (options) => isProd ? Vue.http.post(pieUrl , options) : Vue.http.get(pieUrl);
