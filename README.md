# COMPOSE-SELECTORS

```js
import { pipe, selector, factory, managed } from 'compose-selectors/src';

export const bookDomain = managed(_ => _.books);

const DEFAULT_BOOK_LIST = [];
const DEFAULT_BOOK = {
  id: null,
  title: '',
  author: '',
};

const bookSelectors = domain => {
  const bookLists = pipe(domain, state => state.lists);

  const booksLookup = pipe(domain, state => state.ids);

  const bookIdsList = factory(
    listId => pipe(bookLists, lists => lists[listId] || DEFAULT_BOOK_LIST)
  );

  const bookList = factory(
    listId => selector(
      [bookIdsList(listId), booksLookup],
      (ids, books) => ids.map(id => books[id] || DEFAULT_BOOK),
      cacheLast,
    )
  );

  return { bookLists, booksLookup, bookIdsList, bookList };
});

export default factory(bookSelectors);

```