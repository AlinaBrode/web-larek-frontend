import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorItems } from '@utils-types';

const initialState: { constructorItems: TConstructorItems } = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type == 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const ind = action.payload;
      const prevInd = ind - 1;
      const eng = state.constructorItems.ingredients;

      const temp = eng[ind];
      eng[ind] = eng[prevInd];
      eng[prevInd] = temp;
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const ind = action.payload;
      const nextInd = ind + 1;
      const eng = state.constructorItems.ingredients;

      const temp = eng[ind];
      eng[ind] = eng[nextInd];
      eng[nextInd] = temp;
    },
    deleteIngredient(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    }
  }
});

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  deleteIngredient
} = burgerSlice.actions;
export default burgerSlice.reducer;
