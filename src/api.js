const fetch = require('node-fetch');

const BASE_URL = 'https://leetcode-stats-api.herokuapp.com/';

exports.getLeetCodeProfile = async (userId) => {
    const res = await fetch(BASE_URL + userId);
    return res.json();
};
