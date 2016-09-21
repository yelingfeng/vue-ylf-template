/**
 * Created by yelingfeng on 2016/9/8.
 */
export const API_ROOT = (process.env.NODE_ENV === 'production')
    ?"http://localhost:8080/"
    :'http://localhost:8400/';
