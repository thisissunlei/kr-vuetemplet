
//不要修改，修改找毅豪
function downImg(href, filename) {
    var a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    //a.download = filename;
    a.download = filename;
    a.click();

}
export default downImg;