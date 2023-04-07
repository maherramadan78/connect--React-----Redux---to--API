import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://randomuser.me/api/?results=10';

export const fetchData = createAsyncThunk(
    'users/fetchData',
    async( Response, { rejectWithValue }) => {
        try {
            response = await axios(url);
            return response.data;
        } catch (error){
            return rejectWithValue(error.message)
        }

   }
)

const initialState = {
    users: [
        {
            name: {
                First: 'Maher',
                Last: 'Ramadan',
            }
        },
        {
            name: {
                First: 'Rami',
                Last: 'Ramadan',
            }

        },

        {
            name: {
                First: 'Karla',
                Last: 'banda Davila',
            }
        },
    ],

    isloading: false,
    error: undefined,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
          })
          builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload.results;
          })
          builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          })
        },
      })
      
      export default usersSlice.reducer;