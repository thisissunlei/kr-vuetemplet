import thousand from './thousand';
import addEvent from './addEvent';
import dataType from './dataType';
import throttle from './throttle';
import dateCompatible from './dateCompatible';
import tableSort from './tableSort';
import smalltoBIG from './smalltoBIG';
import deepCopy from './deepCopy';
import clearForm from './clearForm';
import commonExport from './commonExport';
import timeRange from './timeRange';
import getRequest from './getRequest';
import addParams from './addParams';
import arrayNoRepeat from './arrayNoRepeat'
import down from './down';
import getScrollBarSize from './getScrollBarSize';
import getDaysInOneMonth from './getDaysInOneMonth';
import dateDiff from './dateDiff';
import createElement from './createElement';
import dateRange from './dateRange';

function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};
export default {
    smalltoBIG,
    clearForm,
    commonExport,
    getRequest,
    addParams,
    arrayNoRepeat,
    thousand,
    addEvent,
    dataType,
    getDaysInOneMonth,
    dateDiff,
    debounce,
    getScrollBarSize,
    dateCompatible,
    tableSort,
    dateRange,
    timeRange,
    smalltoBIG,
    deepCopy,
    createElement,
    ...down,
}


