export const base64ToFile = (base64, filename, type) => {
    return fetch(base64)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, { type }));
};
