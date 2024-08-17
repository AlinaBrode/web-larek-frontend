import { combineReducers } from 'redux';
import ingredientReducer from './slices/ingredient-slice';
import burgerReducer from './slices/burger-slice';
import feedsReducer from './slices/feed-slice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burger: burgerReducer,
  feeds: feedsReducer
});

export default rootReducer;
