import Header from "../components/Header/Header";
import TopHeader from "../components/TopHeader/TopHeader";
import Footer from "../components/Footer/Footer";
import BreadCrumbs from "../components/ui/BreadCrumbs/BreadCrumbs";
import ItemCardInTheBasket from "../components/ui/ItemCardInTheBasket/ItemCardInTheBasket";
import ProductPrice from "../components/ui/ProductPrice/ProductPrice";
import likeIcon from "../images/icon/like.svg"
import closeIcon from "../images/icon/close.svg"

import { basketSlice } from '../store/reducers/BasketSlice';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import Modal from "../components/ui/Modal/Modal";
import { useState, useEffect } from "react";
import RoundButton from "../components/ui/RoundButton/RoundButton";


const BasketOfProduct = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { products } = useAppSelector(state => state.productsReducer);

	const { basket, fullprice } = useAppSelector(state => state.basketReducer);
	let idLocal: number[] = [0];

	basket.map(item => idLocal.push(item.id));

	const [modalActive, setModalActive] = useState(false);
	const { emptyBasket } = basketSlice.actions;
	const dispatch = useAppDispatch();

	function makeAPurchase() {
		dispatch(emptyBasket());
		setModalActive(true);
	}

	return (
		<div className='wrapper'>
			<div className='header'>
				<TopHeader />
				<Header />
			</div>

			<div className='main'>
				<div className="basket-of-product__container container" >
					<div className='basket-of-product__breadcrumbs'>
						<BreadCrumbs title='Корзина' />
					</div>
					<div className='basket-of-product__title'>Корзина</div>
					<div className='basket-of-product__product'>
						{basket.length !== 0
							? products.filter(prod => idLocal.includes(prod.id)).map(product => <ItemCardInTheBasket product={product} key={product.id} />)
							: <div className='basket-of-product__empty'>Корзина пустая</div>
						}
					</div>
					{basket.length !== 0 &&
						<div className='basket-of-product__total'>
							<button className='basket-of-product__checkout' onClick={() => makeAPurchase()}>Оформить заказ</button>
							<ProductPrice classN="priceL" price={fullprice} />
						</div>}
				</div>
			</div>

			<Modal active={modalActive} setActive={setModalActive} >
				<div className='basket-of-product__modal'>
					<div className='basket-of-product__close' onClick={() => setModalActive(false)}><img src={closeIcon} alt="Close" /></div>
					<div className='basket-of-product__modal-info'>
						<div className='basket-of-product__icon'>
							<RoundButton icon={likeIcon} alt='Tick' />
						</div>
						<div className='basket-of-product__modal-title'>Спасибо за заказ</div>
						<div className='basket-of-product__modal-subtitle'>Наш менеджер свяжется с вами в ближайшее время</div>
					</div>
				</div>
			</Modal>

			<div className='footer'>
				<Footer />
			</div>
		</div >
	)
}

export default BasketOfProduct;

