// src/services/slices/ingredientsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';

interface FeedState {
  feedsData: TFeedsResponse | null;
  error: string | null;
}

const initialState: FeedState = {
  feedsData: null,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (err) {
      return rejectWithValue('Failed to fetch feeds');
    }
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feedsData = null;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedsData = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.feedsData = null;
        state.error = action.payload as string;
      });
  }
});

export default feedsSlice.reducer;
