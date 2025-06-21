export interface IBook {
  title: string;
  author: string;
  genre:
    | "fiction"
    | "non_fiction"
    | "science"
    | "history"
    | "biography"
    | "fantasy";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
