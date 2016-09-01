I had a web application that parsed CSV files. After parsing, the CSV would be downloadable in a `href` tag. Small CSV files were fine. Once I started parsing large ones, downloading it resulted in `Failed - Network error`. I suspected that it is because of `href`'s length limit.

The solution is to use a [Blob](https://developer.mozilla.org/en/docs/Web/API/Blob).

#### Before

```javascript
var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(unparsed);
$('#download').attr('href', csvData);
```

#### After using Blob

```javascript
var csvData = new Blob([unparsed], { type: 'text/csv' });
$('#download').attr('href', URL.createObjectURL(csvData));
```