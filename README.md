# runhtml
把带有script标签的字符串插入到dom，全部插入完成后（如果有引用外部js文件，会等到所有外部js文件加载完成）回调
####demo:
```javascript
function success() {
    console.log('success');
}
function error() {
    console.log('error');
}
var html = '<div>abc</div><script>var a = 12;</script><script http://code.jquery.com/jquery-2.1.1.js></script>';
runHtmlWithScript(document.body, html, success, error);
```
