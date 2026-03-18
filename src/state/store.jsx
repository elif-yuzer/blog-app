import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import blogReducer from "../features/blogs/blogSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

const persistConfig = {
  key: "blog-app",
  storage,
  whitelist: ["auth"],  // SADECE auth persist edilir
                        // blog her seferinde API'den çekilir
}

// Tüm reducer'ları birleştir
const rootReducer = combineReducers({
  auth: authReducer,  // state.auth
  blog: blogReducer,  // state.blog
})

// rootReducer'ı persist ile sar
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

