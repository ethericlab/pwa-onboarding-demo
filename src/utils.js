export const range = (from, to, inclusive = false) => {
    const result = [];
    for (let i = from; inclusive ? i <= to : i < to; i++) {
        result.push(i);
    }
    return result;
};

export const clamp = (num, min, max) => {
    return Math.min(max, Math.max(min, num));
};
