import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: false,
  token: null,
  loading: false,
  userId: null,
  email: '',
  phone: null,
  userName: '',
  profilePic: null,
  cartTotal: 0,
  loginError: null,
  signupError: null,
  baseUrl: '',
  redirectUrl: 'Home',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSetup: (state, action) => {
      state.auth = true;
      // state.token = action.token;
      state.cartTotal = action.payload;
      // state.userId = action.userId;
      // state.phone = action.phone;
      // state.userName = action.name;
    },
    addCartTotal: (state) => {
      state.cartTotal = state.cartTotal + 1;
    },
    subCartTotal: (state) => {
      state.cartTotal = state.cartTotal - 1;
    },
    setToken: (state, action) => {
      state.auth = true;
      state.token = action.payload;
    },
    setRedirectUrl: (state, action) => {
      const {url, videoAudition = false} = action.payload;
      state.redirectUrl = url;
      state.videoAudition = videoAudition;
    },
    logout: (state) => {
      state.token = null;
      state.auth = false;
      state.userId = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { userSetup, setToken, addCartTotal, subCartTotal, setRedirectUrl, logout } = userSlice.actions;

export default userSlice.reducer;