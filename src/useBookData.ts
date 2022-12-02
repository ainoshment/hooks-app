import { useState, useEffect } from "react";
import { BookDescription } from "./BookDescription";

function buildSearchUrl(
  title: string,
  author: string,
  maxResults: number
): string {
  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const conditions: string[] = [];
  if (title) {
    conditions.push(`intitle:${title}`);
  }
  if (author) {
    conditions.push(`inauthor:${author}`);
  }
  return url + conditions.join("+") + `&maxResults=${maxResults}`;
}

function extractBooks(json: any): BookDescription[] {
  const items: any[] = json.items;
  return items.map((item: any) => {
    const volumeInfo: any = item.volumeInfo;
    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(", ") : "",
      thumbnail: volumeInfo.imageLinks
        ? volumeInfo.imageLinks.smallThumbnail
        : "",
    };
  });
}

const useBookData = (title: string, author: string, maxResults: number) => {
  const [books, setBooks] = useState<BookDescription[]>(
    [] as BookDescription[]
  );

  useEffect(() => {
    if (title || author) {
      const fetchData = async () => {
        try {
          const url = buildSearchUrl(title, author, maxResults);
          const res = await fetch(url);
          const data = await res.json();
          const books = extractBooks(data);
          setBooks(books);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [title, author, maxResults]);

  return [books];
};

export default useBookData;
