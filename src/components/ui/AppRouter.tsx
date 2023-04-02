import { Route, Routes } from "react-router-dom";
import ProductCard from "../../pages/ProductCard";
import Catalog from "../../pages/Сatalog";
import BasketOfProduct from "../../pages/BasketOfProduct";
import AdminPanel from "../../pages/AdminPanel/AdminPanel";

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Catalog />} />
			<Route path="/productcard/:valueParam" element={<ProductCard />} />
			<Route path="/basket" element={<BasketOfProduct />} />
			<Route path="/adminpanel" element={<AdminPanel />} />
		</Routes>

	)
}

export default AppRouter;