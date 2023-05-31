import { combineReducers } from "redux";

import filters from './filters';
import settings from './settings';
import goods from './goods';
import product from './product';
import cart from './cart';
import order from './order';


const rootReducer = combineReducers({
  filters, goods, product, cart, order, settings
});

export default rootReducer;