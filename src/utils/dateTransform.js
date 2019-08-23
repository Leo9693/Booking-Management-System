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

export const getDateAndTime = date => {
    const newDateAndTime = date.slice(0, 16).replace('T', ' ');
    return newDateAndTime
}