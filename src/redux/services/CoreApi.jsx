import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";





export const CoreApi = createApi({
  // DatabaseApi là store: nơi lưu trữ state
  reducerPath: "DatabaseApi",
  //baseQuery: là 1 hàm để thực hiện các cuộc gọi api cơ bản
  // hàm để call api từ BE

  baseQuery: fetchBaseQuery({
    baseUrl: "", // Adjust the base URL for your local API
    prepareHeaders: (headers) => {
      // No need for the X-RapidAPI-Key header for local development

      // const token = btoa('Admin:Acccuaadmin'); // Encode the username and password
      // headers.set('Authorization', `Basic ${token}`);

      return headers;
    },
   
    credentials: "same-origin",

  }),
  endpoints: (builder) => ({
    // Define your API endpoints here
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
    // ... other endpoints
  }),
 
});
export const {
  
} = CoreApi;