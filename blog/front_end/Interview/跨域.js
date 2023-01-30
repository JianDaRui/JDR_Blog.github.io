var script = document.createElement("script");
script.type = "text/javascript";

// 传参并指定回调执行函数为onBack
script.src = "http://www.....:8080/login?user=admin&callback=onBack";
document.head.appendChild(script);

// 回调执行函数
function onBack(res) {
  alert(JSON.stringify(res));
}
// nginx代理跨域
// nodejs中间件代理跨域
// 后端在头部信息里面设置安全域名

const jsonp = ({ url, params, callbackName }) => {
    
  const generateURL = () => {
    let dataStr = "";
    for (let key in params) {
      dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url}?${dataStr}`;
  };

  return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace(",", "");
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement("script");
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
      resolve(data);
      // script 执行完了，成为无用元素，需要清除
      document.body.removeChild(scriptEle);
    };
  });
};
