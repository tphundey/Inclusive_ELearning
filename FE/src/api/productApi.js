import instance from './instance';

export const getAll = () => {
    const url = "/products";
    return instance.get(url);
}
export const add = (product) => {
    const url = "/products";
    return instance.post(url, product);
}
export const get = (id) => {
    const url = "/products/" + id;
    return instance.get(url);
}