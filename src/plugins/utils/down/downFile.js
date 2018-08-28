//文件下载的流式下载
function downFile(href, filename) {
    var a = document.createElement('a');
    a.href = href;
    // a.target = '_blank';
    //a.download = filename;
    a.download = filename;
    console.log('a--', a, href, filename);
    a.click();
}
export default downFile;