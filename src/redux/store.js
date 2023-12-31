import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import userReducer from './features/userSlice';
import { CoreApi } from './services/CoreApi';
//tạo store quản lý trạng thái 
export const store = configureStore({
  reducer: {
    [CoreApi.reducerPath]: CoreApi.reducer,
    user: userReducer,
  },
  //các chức năng trung gian được thực hiện khi các actions
  //được gửi đến store trước khi chuusng đến reducer
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(CoreApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {} // Có thể thêm các tham số bổ sung vào middleware
      },
    }).concat(CoreApi.middleware),
});