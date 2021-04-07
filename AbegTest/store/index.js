import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./rootReducer";

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== "production") {
  middlewares = [...middlewares];
}

const composeEnhancers = compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
