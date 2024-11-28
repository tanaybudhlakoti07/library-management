import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    allBooks: [],
    allBooksAdmin: [],
    singleBook: null,
    searchBookByText: "",
    allPurchasedBook: [],
    searchedQuery: "",
  },
  reducers: {
    // actions
    setAllBooks: (state, action) => {
      state.allBooks = action.payload; // Corrected the field name from allJobs to allBooks
    },
    setSingleBook: (state, action) => {
      state.singleBook = action.payload; // Corrected the field name from singleJob to singleBook
    },
    setAdminBooks: (state, action) => {
      state.allBooksAdmin = action.payload;
    },
    setSearchBookByText: (state, action) => {
      state.searchBookByText = action.payload;
    },
    setAllPurchasedBook: (state, action) => {
      state.allPurchasedBook = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllBooks,
  setSingleBook,
  setAdminBooks,
  setSearchBookByText,
  setAllPurchasedBook,
  setSearchedQuery,
} = bookSlice.actions;

export default bookSlice.reducer;
