import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre: string;
    // | "FICTION"
    // | "NON_FICTION"
    // | "SCIENCE"
    // | "HISTORY"
    // | "BIOGRAPHY"
    // | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}


export interface BookStaticMethod extends Model<IBook>{
  checkAndUpdateStock(bookId: string, quantity: number): Promise<IBook>;
}