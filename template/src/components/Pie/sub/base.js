/**
 * Created by yelingfeng on 2016/8/24.
 */
/**
 * 核心setting方法
 * @param option 分组处理后对象
 * @param props
 */
function setting(option, props) {
    if (props.pieOption) {
        let pieOption = props.pieOption;
        option.series[0].roseType = 'radius';
        option.series[0].radius = pieOption.radius
        option.series[0].avoidLabelOverlap = false
        option.series[0].label = {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                }
            }
        }
    }
    option.tooltip =  {
        trigger: 'item',
        formatter: "{b} :{d}%",
        textStyle : {
            fontSize :12,
            align : "left"
        }
    }

    return option;
}

export default {
    setting
}