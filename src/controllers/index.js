const { getHalfYearCalendar } = require('../utils/date');
const { getLeetCodeProfile } = require('../api');
const { createText, createSVG, createRect } = require('../utils/svg');
const { subRight } = require('../utils/string');
const { colorSchemes, getColorScheme } = require('../vars/colors');

const coord = (x, y) => ({
    x,
    y,
});

const getFrequencyColor = (frequency, color = colorSchemes.blue) => {
    const thresholds = [12, 9, 6, 3, 0, -Infinity];

    for (let i = 0; i < thresholds.length; i++) {
        if (frequency > thresholds[i]) return color[i];
    }
    return '#EEEEEE';
};

const makeCalendar = (calendar, submissionCalendar, colorScheme) => {
    let rects = '';

    const pad = 1;
    const size = coord(10, 10);
    const margin = coord(5, 25);
    const pos = coord(5, 5);

    rects += createText(
        'Leetcode submissions in 180days',
        coord(5, 16),
        '#333333',
        14
    );
    for (const { month, weeks } of calendar) {
        const monthPos = coord(
            pos.x + ((size.x + pad) * (weeks.length - 2)) / 2,
            (size.y + pad) * 9 + margin.y
        );
        rects += createText(month, monthPos, '#333333', 12);

        for (const week of weeks) {
            for (let j = 0; j < week.length; j++) {
                if (!week[j]) continue;
                const datetime = subRight(week[j], 3);

                pos.y = (size.y + pad) * j + margin.y;
                const color = getFrequencyColor(
                    submissionCalendar[datetime],
                    colorScheme
                );
                rects += createRect(size, pos, color);
            }
            pos.x += size.x + pad;
        }
        pos.x += size.x + pad;
    }

    return createSVG(rects);
};

exports.getSubmissionCalendar = async (req, res) => {
    const { userId } = req.params;
    const { color } = req.query;

    const { submissionCalendar } = await getLeetCodeProfile(userId);
    const calendar = getHalfYearCalendar();
    const colorScheme = getColorScheme(color);

    res.header({ 'Content-Type': 'image/svg+xml' }).send(
        makeCalendar(calendar, submissionCalendar, colorScheme)
    );
};
