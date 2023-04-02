import styles from "./adminpanel.module.css"
import BreadCrumbs from "../../components/ui/BreadCrumbs/BreadCrumbs";
import { useAppSelector } from '../../hooks/redux';
import { useState, useEffect, useMemo } from "react";
import TitleHideOrReveal from "../../components/ui/TitleHideOrReveal/TitleHideOrReveal";
import ProductEditingCreation from "../../components/ui/ProductEditingCreation/ProductEditingCreation";
import ProductShowEditing from "../../components/ui/ProductShowEditing/ProductShowEditing";
import nextIcon from '../../images/icon/next.svg';
import previousIcon from '../../images/icon/previous.svg';
import Pagination from "../../components/ui/Pagination/Pagination";


const AdminPanel = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { products } = useAppSelector(state => state.productsReducer);

	const [checkAddProduct, setCheckAddProduct] = useState(true);
	const [checkShowProduct, setCheckShowProduct] = useState(true);

	const addProducthideOrRevealToParent = (checkAddProduct: boolean) => {
		setCheckAddProduct(checkAddProduct);
	}

	const showProducthideOrRevealToParent = (checkShowProduct: boolean) => {
		setCheckShowProduct(checkShowProduct);
	}

	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const [countItem, setCountItem] = useState(0);

	let pagesArray = useMemo(() => {
		let result = [];
		for (let i = 0; i < totalPages; i++) {
			result.push(i + 1);
		}
		return result;

	}, [totalPages])

	const getPageCount = (totalCount: number, limit: number) => {
		return Math.ceil(totalCount / limit);
	}

	useMemo(() => {
		let totalCount = products.length;
		setTotalPages(getPageCount(totalCount, limit));
	}, [products, limit])

	const changePage = (p: number) => {
		if (p !== 0 && p <= pagesArray.length) {
			setCountItem((limit * p) - limit);
			setPage(p);
		}
	}

	return (
		<div className='wrapper'>
			<div className='main'>
				<div className="container" >
					<div className={styles.breadcrumbs}>
						<BreadCrumbs title='Панель администратора' />
					</div>
					<div className={styles.title}>Панель администратора</div>
					<div >
						<div className={styles.product}>
							<div className={styles.producttitle}>
								<TitleHideOrReveal title1='Добавить товар' classN="divBig" hideOrRevealToParent={addProducthideOrRevealToParent} />
							</div>
							<div className={styles[checkAddProduct ? 'addNoShow' : 'addShow']}>
								<ProductEditingCreation />
							</div>
						</div>
						<div className={styles.product}>
							<div className={styles.producttitle}>
								<TitleHideOrReveal title1='Товары' classN="divBig" hideOrRevealToParent={showProducthideOrRevealToParent} />
							</div>
							<div className={styles[checkShowProduct ? 'addNoShow' : 'addShow']}>
								{products.slice(countItem, limit * page).map(product => <div key={product.id}><ProductShowEditing product={product} /></div>)}
								{products.length !== 0 && <div className={styles.pagination}>
									<img className={styles.paginationprevious} src={previousIcon} alt="Previous" onClick={() => changePage(page - 1)} />
									{pagesArray.map(p => <Pagination key={p} onClick={() => changePage(p)} p={p} page={page} />)}
									<img className={styles.paginationnext} src={nextIcon} alt="Next" onClick={() => changePage(page + 1)} />
								</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}
export default AdminPanel;