/**
 * Created by yelingfeng on 2016/8/11.
 */
import echarts from "echarts"
import lodash from "lodash"
import * as config from "./commonConfig"
import {
    getTooltip,
    getAxisLabel,
    getAxisLine,
    getAxisName,
    axisMaxmin,
    getLegend,
    getSplitLine,
    getGirdOption,
    getLinearGradient
} from "./util"


const XAXIS = config.xAxis;
const axisLabelColor = config.axisLabelColor;


/**
 * 图表基类
 */
export default class ChartClass {
    constructor(op){
        this.option = op
        this.init()
    }
    init(){
        if (this.option.el == undefined) {
            throw new Error("el not found. 请配置dom")
        }
        this.EC = echarts.init(this.option.el)
    }
    build(option){
        this.EC.setOption(option)
    }
    resize(){
        this.EC.resize()
    }

    render(data) {
        this.option.data = data
        this.create()
    }

    /**
     * 注册模块名称
     * @param module 一级模块
     * @param subModule 二级模块
     */
    registerModule(module, subModule) {
        this.__chartName__ = module
        this.subModuleName = subModule
    }

    /**
     * 检查模块
     */
    checkModule() {
        const sub = this.option.sub;
        if (!this.subModuleName[sub]) {
            throw new Error("the sub module is undefined , " +
                "cur module has [" + Object.keys(this.subModuleName).join(",") + "] 无效的二级模块名称,请使用当前已经定义的模块 [" + Object.keys(this.subModuleName).join(",") + "]")
        }
        if (this.option.data == null) {
            throw new Error("data is null ,看看你的data 为啥是空的");
        }
    }

    /**
     * 非分组集合遍历
     */
    noGroupData() {
        let categories = []
        let datas = []
        if (this.option.data) {
            this.option.data.forEach((item) => {
                categories.push(item.name || "")
                datas.push({name: item.name, value: item.value || 0, info: item.info, dataObj: item})
            })
        }
        var seriesOjb = {}
        // 折线图统一处理
        if (this.__chartName__ == 'line') {
            seriesOjb = {
                type: this.__chartName__,
                stack: this.option.stack || false ? "总量" : null,
                smooth: true,
                symbol: 'emptyCircle',
                symbolSize: 3,
            }
        }
        // 饼图统一处理
        else if (this.__chartName__ == 'pie') {
            seriesOjb = {
                type: this.__chartName__,
                radius: ['60', '100'],
                center: ['40%', '50%'],
                roseType: 'angle',
            }
        }
        else if(this.__chartName__ =='bar'){
            seriesOjb = {
                type: this.__chartName__,
                stack: this.option.stack || false ? "总量" : null,
            }
        }

        seriesOjb.data = datas

        return {category: categories, series: seriesOjb}
    }

    /**
     * 分组data 处理方法
     * @param data
     * @returns {{category: Array, xAxis: Array, series: Array}}
     */
    groupData(){
        let me = this;
        // 是否堆积
        const stack = this.option.stack || false;
        let data = this.option.data || [];
        let xAxis = [];
        let group = [];
        let series = [];
        let emptyData = {category: [], xAxis: [],series:[]};
        let chainsData = lodash.chain(data) ;
        if(data == null || (data.length== 1 && data[0].name == "" )){
            return emptyData;
        }
        // 取分组
        group = chainsData.filter((it) => {
            return it.category != "" && it.category != null && it.category != XAXIS;
                })
                .map((it) => {
                    return it.category;
                })
                .uniq()
                .value();
        let legend = [];

        group.forEach((it)=>{
            legend.push({name : it})
        })

        // 去横轴坐标名
        xAxis = chainsData.map((it) => {
                    return it.name;
                })
                .uniq()
                .value();
        // 拼装series
        group.forEach((g) => {
            let seriesTemp = [];
            data.forEach((d) => {
                if(d.category == g){
                    seriesTemp.push({
                        name: d.name,
                        value: d.value,
                        dataObj: d ,
                        tooltip : {
                            formatter: d.info
                        }
                    })
                }
            })
            let seriesOjb = {
                name : g,
                type: me.__chartName__,
                data: seriesTemp,
                stack: "总量" ,
                areaStyle: {
                    normal: {
                        opacity:0.2
                    }
                },
            }

            if (me.__chartName__ == 'line') {
                seriesOjb.smooth = true
                seriesOjb.symbol = 'emptyCircle'
                seriesOjb.symbolSize = 4
            }

            series.push(seriesOjb)
        })
        return {category: legend, xAxis: xAxis, series: series, data: data};
    }


    /**
     * 单图表通用设置 用于单图 饼图 等
     * @param seriesObj
     * @param props
     */
    singleChartSetting(seriesObj, props) {
        let legend = getLegend(seriesObj.category, props);
        let color = config.commonColorList;
        let option = {
            color: color,
            legend: legend,
            series: [seriesObj.series]
        }

        if (/line|bar/.test(this.__chartName__ )) {
            let maxMin = axisMaxmin(seriesObj.series.data, "1", {})
            let tooltips = getTooltip({trigger: "axis"}, props)
            let splitLine = getSplitLine()
            let grid = getGirdOption(props);
            let xName = getAxisName(props, 'xName', 'xUnit')
            let yName = getAxisName(props, 'ylName', 'ylUnit')
            option.tooltip = tooltips;
            option.grid = grid
            option.xAxis = [{
                name: xName,
                type: 'category',
                nameTextStyle: {
                    color: axisLabelColor
                },
                data: seriesObj.category,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: getAxisLabel(props, true),
                splitLine: false,
                axisLine: false
            }];
            option.yAxis = [
                {
                    //max : 80000,
                    //min : maxMin.min,
                    name: yName,
                    nameTextStyle: {
                        color: axisLabelColor
                    },
                    type: 'value',
                    axisLabel: getAxisLabel(props),
                    splitLine: splitLine,
                    axisLine: false,
                }
            ];
        }
        return option
    }

    /**
     *  坐标系图表通用处理
     *  整合柱图和折线图 通用配置 包括属性 多分组 堆积等
     *
     * @param seriesObj groupData处理后的数据
     * @param props  属性对象
     * @returns {{color: string[], tooltip: *, grid: *, xAxis: *[], yAxis: *[], series: *}}
     */
    axisChartSetting(seriesObj, props) {
        let tooltips = getTooltip({trigger: "axis"}, props)
        let splitLine = getSplitLine()
        let axisLabel = getAxisLabel(props)
        let legend = getLegend(seriesObj.category, props);
        let grid = getGirdOption(props);
        let xName = getAxisName(props, 'xName', 'xUnit')
        let yName = getAxisName(props, 'ylName', 'ylUnit')
        let maxMin = axisMaxmin(seriesObj.data, "1", {})
        let option = {
            legend: legend,
            color: config.commonColorList,
            tooltip: tooltips,
            grid: grid,
            xAxis: [
                {
                    name: xName,
                    type: 'category',
                    nameTextStyle: {
                        color: axisLabelColor
                    },
                    data: seriesObj.xAxis,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: getAxisLabel(props, true),
                    splitLine: false,
                    axisLine: false
                }
            ],
            yAxis: [
                {
                    //max : maxmin.max,
                    //min : maxmin.min,
                    name: yName,
                    nameTextStyle: {
                        color: axisLabelColor
                    },
                    type: 'value',
                    axisLabel: getAxisLabel(props),
                    splitLine: splitLine,
                    axisLine: false,
                }
            ],
            series: seriesObj.series
        }
        return option
    }
}