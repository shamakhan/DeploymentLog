import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import deployments from "./deployments/reducer";
import templates from "./templates/reducer";

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__ : any }
}

const rootReducer = combineReducers({
  deployments,
  templates,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;