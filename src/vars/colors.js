const GRAY = '#EEEEEE';

const BLUE = {
    500: '#2685BF',
    400: '#3D9DD9',
    300: '#5FB6D9',
    200: '#94D7F2',
    100: '#BBE8F2',
};
const GREEN = {
    500: '#047000',
    400: '#27A325',
    300: '#6CF06D',
    200: '#B1F8B6',
    100: '#E0FFE4',
};
const RED = {
    500: '#A20D1E',
    400: '#BC0D35',
    300: '#DE264C',
    200: '#F0788C',
    100: '#F6B1C3',
};
const PURPLE = {
    500: '#9560EB',
    400: '#AA79F5',
    300: '#BC9CF5',
    200: '#CBB7F2',
    100: '#E4DFF5',
};

exports.colorSchemes = {
    blue: [BLUE[500], BLUE[400], BLUE[300], BLUE[200], BLUE[100], GRAY],
    green: [GREEN[500], GREEN[400], GREEN[300], GREEN[200], GREEN[100], GRAY],
    red: [RED[500], RED[400], RED[300], RED[200], RED[100], GRAY],
    purple: [
        PURPLE[500],
        PURPLE[400],
        PURPLE[300],
        PURPLE[200],
        PURPLE[100],
        GRAY,
    ],
};

exports.getColorScheme = (color) => {
    color = String(color).toLowerCase();
    return color in this.colorSchemes
        ? this.colorSchemes[color]
        : this.colorSchemes.blue;
};
