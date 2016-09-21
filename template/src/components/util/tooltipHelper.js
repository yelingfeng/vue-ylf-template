/**
 * Created by yelingfeng on 2016/8/16.
 */
import _ from "lodash"

import {getSpecialProps} from "../propsUtil"


// tip 通用格式
export function getTooltip(config, props) {

    let ylUnit = getSpecialProps(props, 'ylUnit');
    let trigger = config && config.trigger || 'item';

    let tipObj =  {
        trigger: trigger,
        textStyle:{
            fontSize : 12,
            align : "left"
        },
        axisPointer: {
            type: "shadow",
            lineStyle: {
                color: "#fff"
            }
        },
        formatter: function (params) {
            let content = "";
            // 横轴类型
            if(trigger == "axis"){
                content = params[0].name + '<br/>';
                let nv = _.chain(params).sortBy((o) => { return parseFloat(o.value,10); }).reverse().value();
                nv.forEach((it) => {
                    var name = it.seriesName;
                    if (/\-/.test(it.seriesName))name = it.name;
                    content += name + "：" + (it.data.value == undefined ? 0 : it.data.value) + ylUnit + '<br/>';
                })
            }else{
                content = params.data.info;
                if(content == undefined || content == ""){
                    content = params.name + "<br/>" + params.value;
                }
            }
            return content
        }
    }
    return tipObj;
}