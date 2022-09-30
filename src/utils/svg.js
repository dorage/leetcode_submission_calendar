exports.createSVG = (children) =>
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svg" width="400" height="140">${children}</svg>`;
exports.createRect = (size, pos, color) =>
    `<rect width="${size.x}" height="${size.y}" fill="${color}" x="${pos.x}" y="${pos.y}" rx="2.5" ry="2.5"/>`;
exports.createText = (text, pos, color, fontSize) =>
    `<text fill="${color}" font-size="${fontSize}" x="${pos.x}" y="${pos.y}">${text}</text>`;
