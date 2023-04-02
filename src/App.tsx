import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/ui/AppRouter';
import { basketSlice } from './store/reducers/BasketSlice';
import { productsSlice } from './store/reducers/ProductsSlice';
import { useAppDispatch } from './hooks/redux';
import { useEffect } from 'react';

function App() {
	const { downloadFromLocalStorageToBasket } = basketSlice.actions;
	const { getProducts } = productsSlice.actions;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(downloadFromLocalStorageToBasket());
		dispatch(getProducts());
	}, [dispatch, downloadFromLocalStorageToBasket, getProducts]);

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App;
