import { configureStore } from "@reduxjs/toolkit";

import { emailReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: emailReducer,
  },
});

export default store;
