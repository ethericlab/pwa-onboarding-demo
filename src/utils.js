/**
 * Generates a sequence with length <to - from> and item starting from <from> abd ending with <to>
 * @param from From what number to generate the sequence
 * @param to To what number to generate the sequence
 * @param inclusive Whether to include the last number in the sequence. Also changes the length of the array to +1
 * @return {Array}
 */
export const range = (from, to, inclusive = false) => {
    const result = [];
    for (let i = from; inclusive ? i <= to : i < to; i++) {
        result.push(i);
    }
    return result;
};

/**
 * Limits the <num> to <min> and <max> boundaries
 * @param num Number to clamp
 * @param min Minimum boundary
 * @param max Maximum boundary
 * @return {number}
 */
export const clamp = (num, min, max) => {
    return Math.min(max, Math.max(min, num));
};
