import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '@/app/src/lib/features/slices/userslice'; 
import { productsApi } from '@/app/src/lib/services/products'; // Adjust import as needed

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    [productsApi.reducerPath]: productsApi.reducer, // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(productsApi.middleware), // Add RTK Query middleware
});

export const persistor = persistStore(store);
