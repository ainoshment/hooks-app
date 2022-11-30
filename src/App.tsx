import React from "react";
import logo from "./logo.svg";
import "./App.css";

type BookToRead = {
  id: number;
  title: string;
  author: string;
  memo: string;
};

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    author: "ダミー",
    memo: "",
  },
  {
    id: 2,
    title: "React Hooks入門",
    author: "ダミー",
    memo: "",
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    author: "ダミー",
    memo: "",
  },
];

function App() {
  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like">本を追加</div>
      </section>
      <section className="main">
        <h1>チュートリアルを始めましょう</h1>
      </section>
    </div>
  );
}

export default App;
