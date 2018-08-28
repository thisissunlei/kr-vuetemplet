//根据天数差计算日期
function dateRange(date1, num) {
    var date = new Date(date1);
    var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + num);
    var year1 = date.getFullYear();
    var month1 = date.getMonth() + 1;
    var day1 = date.getDate();
    var year2 = newDate.getFullYear();
    var month2 = newDate.getMonth() + 1;
    var day2 = newDate.getDate();
    return year2 + '-' + month2 + '-' + day2;
};
export default dateRange;