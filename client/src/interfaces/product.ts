export interface IProduct {
    id?: number | string,
    courseName: string,
    price: number,
    description : string,
    date : string,
    videoID : Number,
    categoryID  : Number,
    courseIMG : string,
    isDeleted: boolean,
}