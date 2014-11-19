# runhtml
把带有script标签的字符串插入到dom，全部插入完成后回调
demo:
```javascript
runHtmlWithScript(document.body, '<div>abc</div><script>var a = 12;</script>', function() {console.log('success')}, function() {console.log('error')});
```