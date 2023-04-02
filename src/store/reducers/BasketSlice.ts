import { IBasket } from "../../models/IBasket";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BasketState {
	basket: IBasket[];
	quantity: number;
	fullprice: number;
	isLoading: boolean;
	error: string;
}

const initialState: BasketState = {
	basket: [],
	quantity: 0,
	fullprice: 0,
	isLoading: false,
	error: ''
}

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addToBasket(state, action: PayloadAction<{ id: number; value: number; cost: number }>) {
			if (state.basket.find(items => items.id === action.payload.id)) {
				state.basket.filter(items => items.id === action.payload.id).map(item => {
					state.quantity -= item.value;
					state.fullprice -= item.value * item.cost;

					item.value = action.payload.value;
					item.cost = action.payload.cost;
					item.price = action.payload.value * action.payload.cost;

					state.quantity += action.payload.value;
					state.fullprice += action.payload.value * action.payload.cost;
					return item;
				});
			} else {
				state.basket.push({
					id: action.payload.id,
					value: action.payload.value,
					cost: action.payload.cost,
					price: action.payload.value * action.payload.cost
				});
				state.quantity += action.payload.value;
				state.fullprice += action.payload.value * action.payload.cost;
			}
			localStorage.setItem("Basket", JSON.stringify(state.basket));
			localStorage.setItem("Quantity", JSON.stringify(state.quantity));
			localStorage.setItem("Fullprice", JSON.stringify(state.fullprice));
		},

		removeFromBasket(state, action: PayloadAction<number>) {
			state.basket.filter(items => items.id === action.payload).map(item => {
				state.quantity -= item.value;
				state.fullprice -= item.value * item.cost;
				return item;
			});
			state.basket = state.basket.filter((item) => { return item.id !== action.payload });
			if (state.basket.length === 0) state.fullprice = 0;
			localStorage.setItem("Basket", JSON.stringify(state.basket));
			localStorage.setItem("Quantity", JSON.stringify(state.quantity));
			localStorage.setItem("Fullprice", JSON.stringify(state.fullprice));
		},

		emptyBasket(state) {
			state.basket.length = 0;
			state.quantity = 0;
			state.fullprice = 0;

			localStorage.removeItem("Basket");
			localStorage.removeItem("Quantity");
			localStorage.removeItem("Fullprice");
		},

		downloadFromLocalStorageToBasket(state) {
			if (state.basket.length === 0 && localStorage.getItem("Basket")) {
				state.basket = JSON.parse(localStorage.getItem("Basket") || '');
				state.quantity = JSON.parse(localStorage.getItem("Quantity") || '');
				state.fullprice = JSON.parse(localStorage.getItem("Fullprice") || '');
			}
		}
	}
})

export default basketSlice.reducer;