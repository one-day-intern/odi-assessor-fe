const timeParser = (hourString: string): Date => {
    const timeinList = hourString.split(":").map(time => parseInt(time));

    const [hours, minutes] = timeinList;
    
    let seconds: number = 0;

    if (timeinList.length > 2) seconds = timeinList[2];

    const date = new Date("2020-09-11");
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date;
}

export { timeParser }