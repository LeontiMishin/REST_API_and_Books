import type { Author, Book, Publisher, Review } from "../models/entities";

export const authors: Author[] = [
  { id: "author-1", name: "George Orwell", country: "United Kingdom" },
  { id: "author-2", name: "Jane Austen", country: "United Kingdom" },
  { id: "author-3", name: "Haruki Murakami", country: "Japan" },
  { id: "author-4", name: "Chimamanda Ngozi Adichie", country: "Nigeria" },
  { id: "author-5", name: "Jules Verne", country: "France" },
  { id: "author-6", name: "Andrus Kivirahk", country: "Estonia" }
];

export const publishers: Publisher[] = [
  { id: "publisher-1", name: "Penguin Books", country: "United Kingdom" },
  { id: "publisher-2", name: "Vintage", country: "United States" },
  { id: "publisher-3", name: "Varrak", country: "Estonia" },
  { id: "publisher-4", name: "HarperCollins", country: "United States" }
];

export const genres: string[] = [
  "Dystopian",
  "Romance",
  "Magical Realism",
  "Historical Fiction",
  "Science Fiction",
  "Satire"
];

const baseTimestamp = "2026-03-17T10:00:00.000Z";

export const books: Book[] = [
  {
    id: "book-1",
    title: "1984",
    isbn: "9780451524935",
    publishedYear: 1949,
    language: "English",
    genre: "Dystopian",
    description: "A surveillance state crushes freedom and individuality.",
    authorId: "author-1",
    publisherId: "publisher-1",
    pageCount: 328,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-2",
    title: "Animal Farm",
    isbn: "9780451526342",
    publishedYear: 1945,
    language: "English",
    genre: "Satire",
    description: "A political fable about revolution, power and corruption.",
    authorId: "author-1",
    publisherId: "publisher-1",
    pageCount: 112,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-3",
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    publishedYear: 1813,
    language: "English",
    genre: "Romance",
    description: "An iconic novel of manners, class and love.",
    authorId: "author-2",
    publisherId: "publisher-1",
    pageCount: 480,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-4",
    title: "Kafka on the Shore",
    isbn: "9781400079278",
    publishedYear: 2002,
    language: "Japanese",
    genre: "Magical Realism",
    description: "An enigmatic coming-of-age story with surreal threads.",
    authorId: "author-3",
    publisherId: "publisher-2",
    pageCount: 505,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-5",
    title: "Norwegian Wood",
    isbn: "9780375704024",
    publishedYear: 1987,
    language: "Japanese",
    genre: "Historical Fiction",
    description: "A nostalgic and emotional story of youth and loss.",
    authorId: "author-3",
    publisherId: "publisher-2",
    pageCount: 296,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-6",
    title: "Half of a Yellow Sun",
    isbn: "9781400095209",
    publishedYear: 2006,
    language: "English",
    genre: "Historical Fiction",
    description: "Lives collide during the Nigerian Civil War.",
    authorId: "author-4",
    publisherId: "publisher-4",
    pageCount: 448,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-7",
    title: "Purple Hibiscus",
    isbn: "9781616202415",
    publishedYear: 2003,
    language: "English",
    genre: "Historical Fiction",
    description: "A powerful family story shaped by silence and control.",
    authorId: "author-4",
    publisherId: "publisher-4",
    pageCount: 320,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-8",
    title: "Journey to the Center of the Earth",
    isbn: "9780486440880",
    publishedYear: 1864,
    language: "French",
    genre: "Science Fiction",
    description: "An expedition descends into a fantastic underground world.",
    authorId: "author-5",
    publisherId: "publisher-1",
    pageCount: 240,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-9",
    title: "Twenty Thousand Leagues Under the Seas",
    isbn: "9781503214132",
    publishedYear: 1870,
    language: "French",
    genre: "Science Fiction",
    description: "Captain Nemo and the Nautilus explore the oceans.",
    authorId: "author-5",
    publisherId: "publisher-1",
    pageCount: 426,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-10",
    title: "Mees, kes teadis ussisõnu",
    isbn: "9789985337141",
    publishedYear: 2007,
    language: "Estonian",
    genre: "Magical Realism",
    description: "A myth-rich tale about identity, memory and change.",
    authorId: "author-6",
    publisherId: "publisher-3",
    pageCount: 400,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-11",
    title: "Rehepapp",
    isbn: "9789985312766",
    publishedYear: 2000,
    language: "Estonian",
    genre: "Satire",
    description: "A darkly comic folk novel full of absurd village life.",
    authorId: "author-6",
    publisherId: "publisher-3",
    pageCount: 304,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  },
  {
    id: "book-12",
    title: "Emma",
    isbn: "9780141439587",
    publishedYear: 1815,
    language: "English",
    genre: "Romance",
    description: "A witty novel about matchmaking and self-discovery.",
    authorId: "author-2",
    publisherId: "publisher-1",
    pageCount: 474,
    createdAt: baseTimestamp,
    updatedAt: baseTimestamp
  }
];

export const reviews: Review[] = [
  { id: "review-1", bookId: "book-1", reviewerName: "Anna", rating: 5, comment: "Still frighteningly relevant.", createdAt: baseTimestamp },
  { id: "review-2", bookId: "book-1", reviewerName: "Mark", rating: 4, comment: "Bleak but brilliant.", createdAt: baseTimestamp },
  { id: "review-3", bookId: "book-2", reviewerName: "Sofia", rating: 5, comment: "Short, sharp and memorable.", createdAt: baseTimestamp },
  { id: "review-4", bookId: "book-3", reviewerName: "Liam", rating: 4, comment: "Classic for a reason.", createdAt: baseTimestamp },
  { id: "review-5", bookId: "book-4", reviewerName: "Noah", rating: 5, comment: "Dreamlike and unforgettable.", createdAt: baseTimestamp },
  { id: "review-6", bookId: "book-4", reviewerName: "Eva", rating: 4, comment: "Weird in the best way.", createdAt: baseTimestamp },
  { id: "review-7", bookId: "book-5", reviewerName: "Mia", rating: 4, comment: "Quietly heartbreaking.", createdAt: baseTimestamp },
  { id: "review-8", bookId: "book-6", reviewerName: "Daniel", rating: 5, comment: "Powerful and human.", createdAt: baseTimestamp },
  { id: "review-9", bookId: "book-7", reviewerName: "Helena", rating: 4, comment: "Strong voice and tension.", createdAt: baseTimestamp },
  { id: "review-10", bookId: "book-8", reviewerName: "Karl", rating: 3, comment: "Fun adventure, a little dated.", createdAt: baseTimestamp },
  { id: "review-11", bookId: "book-9", reviewerName: "Grete", rating: 5, comment: "Big imagination and scope.", createdAt: baseTimestamp },
  { id: "review-12", bookId: "book-10", reviewerName: "Rasmus", rating: 5, comment: "Very unique and atmospheric.", createdAt: baseTimestamp },
  { id: "review-13", bookId: "book-10", reviewerName: "Kati", rating: 4, comment: "A memorable Estonian fantasy.", createdAt: baseTimestamp },
  { id: "review-14", bookId: "book-11", reviewerName: "Tanel", rating: 4, comment: "Funny and unsettling.", createdAt: baseTimestamp }
];
