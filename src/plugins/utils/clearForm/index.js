/*清空表单*/
function clearForm(originParams) {
    for (var item in originParams) {
        originParams[item] = '';
    }
    return Object.assign({},originParams);
}
export default clearForm;