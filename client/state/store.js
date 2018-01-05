import 'regenerator-runtime/runtime'
import { applyMiddleware, createStore, compose } from "redux"
import {createLogger} from "redux-logger"
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(createLogger(), sagaMiddleware);

const enhancers = compose(
  middleware
);

const store = createStore(reducers, enhancers);
sagaMiddleware.run(rootSaga);

export default store;