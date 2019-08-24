export const getDateAsYMD = date => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day >= 0 && day <= 9) {
        day = '0' + day;
    }
    const newDate = `${year}-${month}-${day}`;
    return newDate;
}

export const getTimeAsHM = date => {
    let hour = date.getHours();
    if (hour >= 0 && hour <= 9) {
        hour = '0' + hour;
    }
    let minute = date.getMinutes();
    if (minute >= 0 && minute <= 9) {
        minute = '0' + minute;
    }
    const newTime = `${hour}:${minute}`;
    return newTime;
}

export const getLocalDateAndTime = date => {
    const dateAndTime = new Date(date);
    const newDate = getDateAsYMD(dateAndTime);
    const newTime = getTimeAsHM(dateAndTime);
    return `${newDate} ${newTime}`;
}