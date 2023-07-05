function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(num, min, max) {
    Math.min(Math.max(num, min), max);
}
