import { IProduct } from "../../models/IProduct";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products } from "../../data/products";

interface ProductsState {
	products: IProduct[];
	isLoading: boolean;
	error: string;
}

const initialState: ProductsState = {
	products: [],
	isLoading: false,
	error: ''
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts(state) {
			if (!localStorage.getItem('Products')) {
				state.products = products;
				localStorage.setItem("Products", JSON.stringify(products));
			} else {
				state.products = JSON.parse(localStorage.getItem("Products") || '');
			}
		},

		addToProducts(state, action: PayloadAction<IProduct>) {
			state.products.push(action.payload);
			localStorage.setItem("Products", JSON.stringify(state.products));
		},

		updateProducts(state, action: PayloadAction<IProduct>) {
			state.products.filter(items => items.id === action.payload.id).map(item => {
				item.image = action.payload.image;
				item.title = action.payload.title;
				item.type = action.payload.type;
				item.size = action.payload.size;
				item.barcode = action.payload.barcode;
				item.manufacturer = action.payload.manufacturer;
				item.brand = action.payload.brand;
				item.description = action.payload.description;
				item.price = action.payload.price;
				item.typeproduct = action.payload.typeproduct;
				return item;
			});
			localStorage.setItem("Products", JSON.stringify(state.products));
		},

		removeFromProducts(state, action: PayloadAction<number>) {
			state.products = state.products.filter((item) => { return item.id !== action.payload });
			localStorage.setItem("Products", JSON.stringify(state.products));
		}
	}
})

export default productsSlice.reducer;