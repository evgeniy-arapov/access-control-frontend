import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export default function configureStore (initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV !== "production" ? applyMiddleware(logger, thunk)
      : applyMiddleware(thunk)
  );
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("reducers");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}