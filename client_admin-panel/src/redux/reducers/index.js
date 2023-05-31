import { combineReducers } from "redux";

import auth from './auth';
// import settings from './settings';
import goods from './goods';
// import product from './product';
// import cart from './cart';
// import order from './order';


const rootReducer = combineReducers({
  auth, goods
});

export default rootReducer;