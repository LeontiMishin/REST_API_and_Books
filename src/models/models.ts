export interface Book {
  id: number;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string;
  authorId: number;
  publisherId: number;
  genres: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
  nationality: string;
  biography?: string;
  createdAt: Date;
}

export interface Publisher {
  id: number;
  name: string;
  country: string;
  foundedYear: number;
  website?: string;
  createdAt: Date;
}

export interface Review {
  id: number;
  bookId: number;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: Date;
}

export interface Genre {
  id: number;
  name: string;
}
