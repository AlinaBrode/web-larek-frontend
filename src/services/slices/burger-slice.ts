import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TBun = { price: number };
type TConstructorItems = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

const initialState: { constructorItems: TConstructorItems } = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {}
});

export default burgerSlice.reducer;
