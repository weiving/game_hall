//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

// 获取 LocalStorage
export function getLocalStorage(name) {
    return window.localStorage.getItem(name);
}

// 设置 LocalStorage
export function setLocalStorage(name, value) {
    return window.localStorage.setItem(name, value);
}

// 删除 LocalStorage
export function removeLocalStorage(name) {
    return window.localStorage.removeItem(name);
}

export function abc_WebSocket() {
  const url = 'ws://192.168.1.108:8402'
  let user_id = window.localStorage.getItem("user_id");
  const wsurl = url + "/ws?user_id=" + user_id;
  let webscoket = new WebSocket(wsurl);
  return webscoket;
}
