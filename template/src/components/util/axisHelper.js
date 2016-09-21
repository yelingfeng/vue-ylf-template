/**
 * Created by yelingfeng on 2016/8/16.
 */

import * as config from "../commonConfig"
import {getSpecialProps,getCommonProps} from "../propsUtil"
import _ from "lodash"

/**
 * 获取label样式
 * @param op
 * @returns {{textStyle: {color: string, fontFamily: string}}}
 */
export function getAxisLabel(op, isRotate = false) {
    let obj = {
        textStyle: {
            color: config.axisLabelColor,
            fontFamily: config.commonFontFamily
        },
        formatter: function (value) {
            if (_.isNumber(value)) {
                return Math.abs(value).toFixed(0)
            }
            return value
        }
    };

    if (isRotate) {
        let rotate = getCommonProps(op, "rotate")
        let interval = getCommonProps(op, "interval")

        if (rotate != "") {
            obj.rotate = rotate
        }
        if (interval !== "") {
            obj.interval = interval
        } else {
            obj.interval = 'auto'
        }
    }


    return obj
}


export function getAxisLine() {
    return {
        lineStyle: {
            color: "rgba(255,255,255,0.5)",
            width: 1
        }
    }
}

export function getSplitLine() {
    return {
        lineStyle: {
            color: config.yAxisSplitColor,
            width: 2,
            type: 'solid'
        }
    }
}


export function getAxisName(props, name, unit) {
    return getSpecialProps(props, name) + getSpecialProps(props, unit);
}


/**
 * 计算最大最小值问题
 * @param data
 * @param type  1: 数据自适应 , 2: 固定值
 * @param param {max , min }
 */
export function axisMaxmin(data, type, param) {
    let maxmin = {
        max: 100,
        min: 0
    };
    if (type == "1") {
        maxmin = getMaxMin(data);
    }
    else if (type == "2") {
        maxmin = {
            max: param.max,
            min: param.min
        }
    }
    return maxmin;
}

function getMaxMin(data) {
    let arr = [];
    let max;
    let min;
    if (data && data.length) {
        data.forEach((it) => {
            if (it.value) {
                arr.push(parseFloat(it.value, 10));
            }
        });
    }

    if (arr.length > 0) {
        max = _.max(arr);
        min = _.min(arr);
    } else {
        max = 100;
        min = 0;
    }
    if (arr.length == 1 && arr[0] <= 100) {
        max = 100;
        min = 0;
    }

    min = min - ( max - min) * 0.05;
    max = max + ( max - min) * 0.05;
    max = max == 0 ? 100 : max;
    min = min < 0 ? 0 : min;
    return {
        max,
        min
    }
}
