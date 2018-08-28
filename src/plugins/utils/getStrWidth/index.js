
//计算字符串长度
function getStrWidth(dom, data) {
    dom.innerHTML = data;
    return dom.offsetWidth;
}
export default getStrWidth;