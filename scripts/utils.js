function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(num, min, max) {
    Math.min(Math.max(num, min), max);
}

function distance(x1, y1, x2, y2) {
    if(!x2) x2=0; 
    if(!y2) y2=0;
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
