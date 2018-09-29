//https://www.w3schools.com/jsref/jsref_setdate.asp
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
export function convertDateObjToScadaApiTimeStr(dateObj) {
    var dateStr = makeTwoDigits(dateObj.getDate()) + "/" + makeTwoDigits(dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
    var timeStr = makeTwoDigits(dateObj.getHours()) + ":" + makeTwoDigits(dateObj.getMinutes()) + ":" + makeTwoDigits(dateObj.getSeconds());
    return dateStr + "/" + timeStr;
}

export function makeTwoDigits(num) {
    if (!isNaN(num) && num < 10) {
        return '0' + num;

    } else {
        return '' + num;
    }
}

export function createScadaFetchUrl(serverBaseAddress, pnt, historyType, strtime, endtime, periodSecs, fetchStrategy) {
    var url = "";
    if (historyType == "real") {
        url = serverBaseAddress + "/api/values/" + historyType + "?pnt=" + pnt;
    } else if (historyType == "history") {
        url = serverBaseAddress + "/api/values/" + historyType + "?pnt=" + pnt + "&strtime=" + strtime + "&endtime=" + endtime + "&secs=" + periodSecs + "&type=" + fetchStrategy;
    }
    //WriteLineConsole(url);
    return url;
}