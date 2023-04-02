import { configureStore, combineReducers } from "@reduxjs/toolkit";
import basketReducer from './reducers/BasketSlice';
import productsReducer from './reducers/ProductsSlice';

const rootReducer = combineReducers({
	basketReducer, productsReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']