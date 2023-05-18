import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsCookie from "js-cookie";


interface IResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface IStoreData {
  token: string
}

const initialState: Partial<IStoreData> = {
  token: undefined,
};


export const getCurrentSession = createAsyncThunk(
  "getCurrentSession",
  async (): Promise<IResponse> => {
    const accessToken = jsCookie.get('city_token');

    //
    if (accessToken) {
      return {
        success: true,
        message: "Successfully fetched the current session!",
        data: { accessToken },
      };
    }
    return {
      success: false,
      message: "Unable to fetch current session details!",
    };
  },
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setAuthToken: (state: any, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentSession.fulfilled, (state, action) => {
      if (!state.token && action.payload.success && action.payload.data) {
        state.token = action.payload.data.accessToken;
      }
    });

    //
    builder.addCase(getCurrentSession.rejected, (state) => {
      state.token = undefined;
    });

  }
})

export const { setAuthToken } = AuthSlice.actions;
export default AuthSlice.reducer;

