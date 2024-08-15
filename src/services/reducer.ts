import { combineReducers } from 'redux';
import ingredientReducer from './slices/ingredient-slice';

const rootReducer = combineReducers({
  ingredients: ingredientReducer
});

export default rootReducer;
