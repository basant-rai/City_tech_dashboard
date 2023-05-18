import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsCookie from "js-cookie";


interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface IStoreData {
  token: string;
  // user: IApiUserMe;
  // activeProfile?: IApiUserProfile;
}

//
// interface ILoginOptions {
//   email: string;
//   password: string;
// }

const initialState: Partial<IStoreData> = {
  // user: undefined,
  token: undefined,
  // activeProfile: undefined,
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
    // setUser: (state, action: PayloadAction<any>) => {
    //   state.user = action.payload;
    // },
    setAuthToken: (state: any, action: PayloadAction<IStoreData>) => {
      state.token = action.payload;
    },
    // removeUser: (state) => {
    //   state.user = undefined;
    // },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentSession.fulfilled, (state: any, action: any) => {
      if (!state.token && action.payload.success && action.payload.data) {
        state.token = action.payload.data.accessToken;
      }
    });

    //
    builder.addCase(getCurrentSession.rejected, (state:any) => {
      state.token = undefined;
      state.user = undefined;
    });

  }
})

export const { setAuthToken } = AuthSlice.actions;
export default AuthSlice.reducer;

