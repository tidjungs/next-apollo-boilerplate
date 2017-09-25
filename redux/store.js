import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './modules/reducer';

const initStore = () => (
  createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
);

export default initStore;
