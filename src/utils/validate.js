/**
 * 过滤特殊字符的方法
 */

export function stripcsript(s) {
    var pattern= new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~ ！ @# ￥…… &* （ ） ;—|{} 【】 ‘ ； ： ” “ ' 。 ， 、 ？ ] " );
    var rs = "" ;
    for(var i=0;i<s.length;i++){
        rs=rs+s.substr(i,1).replace(pattern,'');
    } 
   return rs;
}

/**
 * 验证邮箱
 */
export function validateEmail(value){
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(value)? true : false ;
    // if(!reg.test(value)){+
    //     return false;
    // }else{
    //     return true;
    // }
}
/**
 * 验证密码6至20位 字母+数字
 */
export function validatePwd(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z)]+$)\S{6,20}/;
    return reg.test(value)? true : false ;
}

/**
 * 验证验证码
 */
export function validateCodes(value){
    let reg = /^[a-zA-Z0-9]{6}$/;
    return reg.test(value)? true : false ;
}
