import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export default function configureStore (initialState) {
  const logger = createLogger();
  let middleware;

  switch (process.env.NODE_ENV) {
    case "production":
      middleware = [thunk]; break;
    case "test":
      middleware = [thunk]; break;

    default:
      middleware = [logger, thunk];
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
