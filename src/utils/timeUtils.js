export function getDateObjFromMeasVars(timeMode, dateMode, year, month, day, hrs, mins, secs) {
    var todayDate = new Date();
    var resDate = todayDate;
    if (timeMode == 'absolute') {
        if (dateMode == 'absolute') {
            //new Date(year, month, day, hours, minutes, seconds, milliseconds)
            resDate = new Date(year, month - 1, day, hrs, mins, secs, 0);
        } else if (dateMode == 'variable') {
            resDate = new Date(todayDate.getFullYear() + year, todayDate.getMonth() + month, todayDate.getDate() + day, hrs, mins, secs, 0);
        }
    } else if (timeMode == 'variable') {
        resDate = new Date(todayDate.getFullYear() + year, todayDate.getMonth() + month, todayDate.getDate() + day, todayDate.getHours() + hrs, todayDate.getMinutes() + mins, todayDate.getSeconds() + secs, 0);
    }
    return resDate;
}