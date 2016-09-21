/**
 * Created by yelingfeng on 2016/8/11.
 */
import ChartClass from "../BaseChart"
import subComps from './sub'

// sub模块构建方法名
const _settingMethod_ = "setting"

const moduleName = {
    'base': 1,
}
/**
 * 饼图封装类
 */
export default  class Pie extends ChartClass {
    constructor(op) {
        super(op);
        this.registerModule('pie', moduleName)
    }

    create() {
        this.checkModule();

        // 二级模块名
        const sub = this.option.sub
        const inner = this.option.inner || false;
        let props = this.option.props || {};

        let config = [this.option.data];
        if (sub == "base") {
            config[0] = this.singleChartSetting(this.noGroupData(), props)
        }
        config[1] = props;
        let option = subComps[sub][_settingMethod_](...config);

        this.build(option);
    }

}