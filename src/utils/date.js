const { DATE_VARS } = require('../vars/date');

const dayToNumber = (n) => n * 24 * 60 * 60 * 1000;

/**
 * UTC 기준 자정의 시각을 구합니다.
 * @returns
 */
const getTodayDate = () => {
    const now = new Date(Date.now());
    // GMT-0 기준 시간 => GMT+9으로 나옴
    const gmt0 = new Date(
        `${now.getYear() + 1900}-${
            now.getMonth() + 1
        }-${now.getDate()} 00:00:00 GMT+00:00`
    );
    // 따라서 현재 시간 (GMT+9) 이 GMT-0 기준 오늘보다 작다면 하루를 빼는 방식으로 계산.
    return now < gmt0 ? Number(gmt0 - dayToNumber(1)) : Number(gmt0);
};

/**
 * @typedef {{
 *  day: number,
 *  date: number,
 *  month: number,
 *  time:{
 *      hour: number,
 *      min: number,
 *      sec: number,
 *  }
 * }} UTCDate
 */

/**
 * Date를 UTC로 변경한 후에 객체로 반환합니다.
 * @param {Date} dateObj
 * @returns
 */
const getUTCDate = (dateObj) => {
    const string = dateObj.toUTCString();
    const [day, date, month, time] = string.split(' ');
    const [hour, min, sec] = time.split(':');
    return {
        day: DATE_VARS.DAY_ID[day.slice(0, 3)],
        date: Number(date),
        month: DATE_VARS.MONTHS_ID[month],
        time: { hour: Number(hour), mn: Number(min), sec: Number(sec) },
    };
};

/**
 * get days of months from startMonth to endMonth
 * @param {Number} startMonth
 * @param {Number} endMonth
 * @returns
 */
const getDaysOfMonths = (startMonth, endMonth) =>
    startMonth < endMonth
        ? DATE_VARS.DAYS_OF_MONTHS.slice(startMonth, endMonth + 1)
        : [
              DATE_VARS.DAYS_OF_MONTHS.slice(startMonth, 12),
              ...DATE_VARS.DAYS_OF_MONTHS.slice(0, endMonth + 1),
          ];

const getCalendar = (startDate, endDate) => {
    const { day: sdy, date: sdt, month: sm } = getUTCDate(startDate);
    const { day: edy, date: edt, month: em } = getUTCDate(endDate);
    const calendar = [];

    const daysOfMonth = getDaysOfMonths(sm, em).reduce((a, c, i) => {
        if (!i) c -= sdt;
        if (!a.length) a.push(c);
        else a.push(a[a.length - 1] + c);
        return a;
    }, []);

    let day = sdy; // 시작 요일
    let date = 0; // 시작 일자

    for (let i = 0; i < daysOfMonth.length; i++) {
        const month = { month: DATE_VARS.MONTHS_KEY[sm + i], weeks: [] };
        let endMonth = false;

        while (!endMonth) {
            const week = Array(day).fill(undefined);
            month.weeks.push(week);

            for (let j = day; j < 7; j++) {
                week.push(Number(startDate) + dayToNumber(date));
                date++;

                if (date > daysOfMonth[i]) {
                    day = j + 1;
                    if (day >= 7) day = 0;
                    endMonth = true;
                    break;
                }
            }

            if (!endMonth) day = 0;
        }

        calendar.push(month);
    }

    return calendar;
};

exports.getHalfYearCalendar = () => {
    const HALF = 180;

    const endDate = new Date(getTodayDate());
    const startDate = new Date(endDate - dayToNumber(HALF));

    return getCalendar(startDate, endDate);
};
