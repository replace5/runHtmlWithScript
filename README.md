# runhtml
把带有script标签的字符串插入到dom，全部插入完成后回调
demo:
```javascript
function success() {
    console.log('success');
}
function success() {
    console.log('error');
}
var html = '<div>abc</div><script>var a = 12;</script>';
runHtmlWithScript(document.body, html, success, error);
```
