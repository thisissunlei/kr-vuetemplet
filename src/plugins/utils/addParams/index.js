//高级搜索时url上带参数
function addParams(params) {
    let path = window.location.href;
    let url = path.split('?')[0];
    var where = [];
    for (var field in params) {
        if (params.hasOwnProperty(field)) {
            where.push(`${field}=${params[field]}`);
        }
    }
    url = url + "?" + where.join('&');
    location.href = url;
}
export default addParams;