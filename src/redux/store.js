import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./reducers";

const logger = createLogger({
  duration: true,
  timestamp: true,
  logErrors: true
});

export default createStore(reducer, applyMiddleware(logger));
