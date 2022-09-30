MONTHS = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
};
DATES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
DAY = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
};

exports.DATE_VARS = {
    MONTHS_KEY: Object.keys(MONTHS),
    MONTHS_ID: MONTHS,
    DAYS_OF_MONTHS: DATES,
    DAY_ID: DAY,
    DAY_KEY: Object.keys(DAY),
};
