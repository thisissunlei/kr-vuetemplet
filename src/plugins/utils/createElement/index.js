//创建dom
function createElement() {
    var dom = document.createElement('span');
    dom.style.visibility = 'hidden';
    document.body.appendChild(dom);
    return dom;
}
export default createElement;