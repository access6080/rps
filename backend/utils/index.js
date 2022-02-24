export const choose = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

export const encode = (num) => {
    const encoding = num.toString(2);
    const padding = '0'.repeat(4 - encoding.length)
    const encoded =  padding + encoding
    return encoded
}