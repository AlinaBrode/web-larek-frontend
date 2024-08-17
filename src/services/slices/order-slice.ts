import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';

interface OrderState {
  orderRequest: boolean;
  newOrderResponse: TNewOrderResponse | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  newOrderResponse: null,
  error: null
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (idsList: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(idsList);
      return data;
    } catch (err) {
      return rejectWithValue('Failed to fetch order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
        state.newOrderResponse = null;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.newOrderResponse = action.payload;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.newOrderResponse = null;
        state.error = action.payload as string;
      });
  }
});

export default orderSlice.reducer;
