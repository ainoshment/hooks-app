import React, { useState, useEffect } from "react";
import "./App.css";
import { BookToRead } from "./BookToRead";
import BookRow from "./BookRow";
import Modal from "react-modal";
import BookSearchDialog from "./BookSearchDialog";
import { BookDescription } from "./BookDescription";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const APP_KEY = "react-hooks-tutorial";

function App() {
  const [books, setBooks] = useState<BookToRead[]>([] as BookToRead[]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storeBooks = localStorage.getItem(APP_KEY);
    if (storeBooks) {
      setBooks(JSON.parse(storeBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(books));
  }, [books]);

  const handleAddclick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = { ...book, id: Date.now(), memo: "" };
    const newBooks = [...books, newBook];
    setBooks(newBooks);
    setModalIsOpen(false);
  };

  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id); // trueを新たな配列として
    setBooks(newBooks);
  };

  const handleBookMemoChange = (id: number, memo: string) => {
    // const newBooks = books.map((b) => {
    //   return b.id === id ? { ...b, memo: memo } : b;
    // });
    const newBooks: BookToRead[] = [];
    for (const book of books) {
      if (book.id === id) {
        book.memo = memo;
      }
      newBooks.push({ ...book, memo: book.memo });
    }
    setBooks(newBooks);
  };

  const bookRows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id, memo) => handleBookMemoChange(id, memo)}
        onDelete={(id) => handleBookDelete(id)}
      />
    );
  });
  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddclick}>
          本を追加
        </div>
      </section>
      <section className="main">{bookRows}</section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog maxResults={20} onBookAdd={(b) => handleBookAdd(b)} />
      </Modal>
    </div>
  );
}

export default App;
