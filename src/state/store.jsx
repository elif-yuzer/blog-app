import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import blogReducer from '../features/blog/blogSlice'

const persistConfig = {
  key: "blog-app",
  storage,
  whitelist: ["auth"],  // SADECE auth persist edilir
                        // dıger degısen degerler cekılır
}


const rootReducer = combineReducers({
  auth: authReducer,  
  blog:blogReducer,
  
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store);

