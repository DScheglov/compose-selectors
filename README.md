# COMPOSE-SELECTORS

**./books/reducers.js**

```js
import { manageable } from 'compose-selectors/src';
const books = createReducer(...);

export default { books };

export const domain = manageable(state => state.books);
```

**./books/selectors.js**
```js
import { selector, selectorFactory } from 'compose-selectors/src';

const DEFAULT_BOOK_LIST = [];
const DEFAULT_BOOK = {
  id: null,
  title: '',
  author: '',
};

export default selectorFactory(domain => {
  const booksLists = selector(domain, state => state.lists);

  const booksLookup = selector(domain, state => state.ids);

  const bookIdsList = selectorFactory(
    listId => selector(
      booksLists,
      lists => lists[listId] || DEFAULT_BOOK_LIST
    )
  );

  const bookList = selectorFactory(
    listId => selector(
      bookIdsList(listId), booksLookup,
      cacheLast(
        (ids, books) => ids.map(id => books[id] || DEFAULT_BOOK)
      )
    )
  );

  return { bookLists, booksLookup, bookIdsList, bookList };
}));
```

**./books/index.js**
```js
import reducers, { domain } from './reducers';
import selectors from './selectors';

export default { reducers, selectors, domain };
```

Usage:

**./my-app/selectors.js**
```js
import Books from '../books';

export const books = Books.domain.clone();
export default Books.selectors(books);
```

**./my-app/BookList.js**
```js
import React from 'react';
import { useSelector } from 'react-redux';
import BookSelectors from './selectors';

function BookList({ listId }) {
  const books = useSelector(
    BookSelectors.bookList(listId)
  );

  return (
    <ul>
      {books.map(
        book => <BookListItem key={book.id} book={book}>
      )}
    </ul>
  );
}
```