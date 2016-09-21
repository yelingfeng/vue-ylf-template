/**
 * Created by yelingfeng on 2016/8/16.
 */
/**
 * grid 配置
 */

export function getGirdOption(props) {

    let grid = {
        top: '10%',
        left: 'auto',
        right: '10%',
        bottom: '20%',
        containLabel: true
    }
    if (props.grid) {
        grid = Object.assign(grid, props.grid)
    }
    return grid;
}