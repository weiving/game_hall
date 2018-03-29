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

//Date对象格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    // 'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    // 'S': this.getMilliseconds() //millisecond
  };

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o['' + k] : ('00' + o['' + k]).substr(('' + o['' + k]).length));
    }
  }
  return fmt;
}

