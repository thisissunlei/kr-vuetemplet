//数组去重
function arrayNoRepeat(array) {
    for (var i = 0, temp = {}, result = [], ci; ci = array[i++];) {
        var id = ci.id;
        if (temp[id]) {
            continue;
        }
        temp[id] = true;
        result.push(ci);
    }
    return result;
}
export default arrayNoRepeat;