import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import catagories from "./reducer";

const store = createStore(catagories, applyMiddleware(thunk));

export default store;
