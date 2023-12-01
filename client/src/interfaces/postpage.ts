export interface IPostpage{
    id?: number | string;
    title: string;
    content: string;
    image: string;
    author: string;
    photoURL:string;
    date: string;
    likes: number;
    likedBy: string;
    comments: string;
}