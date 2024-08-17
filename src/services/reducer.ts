import { combineReducers } from 'redux';
import ingredientReducer from './slices/ingredient-slice';
import burgerReducer from './slices/burger-slice';
import feedsReducer from './slices/feed-slice';
import orderReducer from './slices/order-slice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burger: burgerReducer,
  feeds: feedsReducer,
  order: orderReducer
});

export default rootReducer;
