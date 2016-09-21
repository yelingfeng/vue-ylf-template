/**
 * Created by yelingfeng on 2016/8/24.
 */

import lang from "lodash/lang"

/**
 * 检查op里是否有指定属性 没有返回一个默认键值
 * @param op
 * @param checkName
 * @returns {}
 */
function propsCheck(op, checkName) {
    let obj = Object.create(null);
    if (op == undefined) {
        obj[checkName] = {}
        op = obj;
    }
    if (!op[checkName]) {
        obj[checkName] = {}
    } else {
        obj = op;
    }
    return obj;
}

/**
 * 获取属性
 * @param op 属性对象
 * @param modal 模块名
 * @param key  属性名
 * @returns {*}
 */
function getProps(op, modal, key) {
    let mark = (prop, m, k) => {
        let opt = propsCheck(prop, m)
        let v = opt[m][k] !== undefined ? opt[m][k] : ""
        return v
    }

    if (lang.isArray(key)) {
        let obj = {}
        for (var k of key) {
            obj[k] = mark(op, modal, k)
        }
        return obj
    } else {
        let v = mark(op, modal, key)
        return v
    }
}


/**
 * 获取Special属性
 * @param op
 * @param key 属性名
 */
export function getSpecialProps(op, key) {
    let prop = getProps(op, 'specialProps', key)
    return prop
}

/**
 * 获取通用属性
 * @param op
 * @param key 属性名
 */
export function getCommonProps(op, key) {
    let prop = getProps(op, 'commonProps', key)
    return prop
}

/**
 * 获得图例属性
 * @param prop
 * @param {Array} keys
 */
export function getLegendProps(prop, keys) {
    let k = 'commonProps'
    return getProps(prop, k, keys);
}

/**
 * 获得地图属性
 * @param props
 * @param keys
 * @returns {*}
 */
export function getMapProps(props, keys) {
    let k = 'mapOption'
    return getProps(props, k, keys);
}