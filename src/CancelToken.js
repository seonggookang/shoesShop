import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";

function Scroll() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState("");

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    console.log(node);
  });
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  return (
    <div>
      <input type="text" onChange={handleSearch} value={query} />
      {books.map((book, index) => {
        if (book.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}
      <div>{loading && "loading..."}</div>
      <div>{error && "error..."}</div>
    </div>
  );
}

function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      //       당연히 리소스를 낭비한다. 요청을 여러개 보내며, 마지막 응답을 제외한 이전의 응답들은 쓸모가 없어진다.
      // 만약 두번째 요청의 응답이 첫번째 요청의 응답보다 일찍 온다면? 이상한 데이터가 화면에 표시되는 버그가 발생할 수도 있을 것이다.
      // axios 라이브러리는 요청을 취소하기 위해 CancelToken이라는 API를 제공해 준다.
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              // Set은 중복된 것들을 제거해주고, ... spread operator을 씀으로써 우리가 조작하기 쉽게 배열로 바꿔준다.
              ...prevBooks,
              ...res.data.docs.map((book) => book.title),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return setError(true);
        }
      });
    return () => cancel(); // 매번 cancel을 진행한다

    // 타이핑 할때마다 axios를 실행하는 것이 아니라, search 버튼 클릭을 했을 때 axios를 실행하라는 기능
    // 또는
    // cancelToken 이용.
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
}

export default Scroll;
