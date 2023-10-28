// export interface IProduct {
//     id?: number | string,
//     courseName: string,
//     price: number,
//     description : string,
//     date : string,
//     videoID : Number,
//     categoryID  : Number,
//     courseIMG : string,
//     isDeleted: boolean,
// }

export interface IProduct {
    id?: number;
    courseName: string;
    price: number;
    description: string;
    date: string;
    courseIMG: string;
    categoryID: number;
    isHidden: boolean; // Trường xác định khóa học có bị ẩn hay không
}
