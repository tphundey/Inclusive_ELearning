import categoryApi, { categoryReducer } from "@/api/category";
import productApi, { productReducer } from "@/api/courses";
import PaymentApi, { PaymentReducer } from "@/api/payment";
import postpageApi, { PostpageReducer } from "@/api/postpage";
import reviewApi, { reviewReducer } from "@/api/review";
import roleApi, { RoleReducer } from "@/api/role";
import userApi, { UserReducer } from "@/api/user";
import videoApi, { videoReducer } from "@/api/video";
import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    [productApi.reducerPath]: productReducer,
    [categoryApi.reducerPath]: categoryReducer,
    [videoApi.reducerPath]: videoReducer,
    [userApi.reducerPath]: UserReducer,
    [roleApi.reducerPath]: RoleReducer,
    [postpageApi.reducerPath]: PostpageReducer,
    [PaymentApi.reducerPath]: PaymentReducer,
    [reviewApi.reducerPath]: reviewReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).
        concat( productApi.middleware,
                categoryApi.middleware, 
                videoApi.middleware, 
                userApi.middleware,
                roleApi.middleware,
                postpageApi.middleware,
                PaymentApi.middleware,
                reviewApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default persistStore(store);
