/**
 * Created by yelingfeng on 2016/8/25.
 */

import {getLegendProps} from "../propsUtil"
import * as config from "../commonConfig"

/**
 * 位置属性常量
 * @type {{
 * L_T: string,
 * C_T: string,
 * R_T: string,
 * C_B: string,
 * R_C: string,
 * B_C: string
 * }}
 */
const LEGENDALIGN = {
    L_T: "1",
    C_T: "2",
    R_T: "3",
    C_B: "4",
    R_C: "5",
    B_C: "6",
}

/**
 * 图例设置
 * @param data
 * @param props
 * @returns {*}
 */
export function getLegend(data, props) {
    let legend = {
        orient:'vertical'
    };
    let lp = getLegendProps(props, ['showLegend', 'legendPositon']);
    legend.show = lp.showLegend ? lp.showLegend : false
    legend.textStyle = {
        color: config.legendColor,
        fontFamily: config.commonFontFamily
    }
    legend.x = 'top';
    legend.y = 'left';

    if (data && data.length) {
        legend.data = data;
    }

    return legend;
}