import { combineReducers } from 'redux';
import ingredientReducer from './slices/ingredient-slice';
import burgerReducer from './slices/burger-slice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burger: burgerReducer
});

export default rootReducer;
