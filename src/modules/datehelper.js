export function formatDate(datenow) {
    let date = new Date(datenow),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear(),
        hours = '' + date.getHours(),
        minutes = '' + date.getMinutes(),
        seconds = '' + date.getSeconds();

    var dateParts = [year, month, day];
    var timeParts = [hours, minutes, seconds];

    formatDoubleDigit(dateParts);
    formatDoubleDigit(timeParts);

    return dateParts.join('-') + ' ' + timeParts.join(':');
}

function formatDoubleDigit(dateArr) {
    for (let i = 0; i < dateArr.length; i++) {
        if (dateArr[i].length < 2) {
            dateArr[i] = '0' + dateArr[i];
        }
    }
}