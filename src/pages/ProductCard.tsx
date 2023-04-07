import { useEffect, useState, useMemo } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import TopHeader from "../components/TopHeader/TopHeader";
import Footer from "../components/Footer/Footer";
import BreadCrumbs from "../components/ui/BreadCrumbs/BreadCrumbs";
import Button from "../components/ui/Button/Button";
import ProductPrice from "../components/ui/ProductPrice/ProductPrice";
import ProductTitle from "../components/ui/ProductTitle/ProductTitle";
import ProductType from "../components/ui/ProductType/ProductType";
import ProductQuantity from "../components/ui/ProductQuantity/ProductQuantity";
import AdditionalFunctionality from "../components/ui/AdditionalFunctionality/AdditionalFunctionality";
import Share from "../components/ui/Share/Share";
import basketIcon from '../images/icon/basket.svg';
import closeIcon from "../images/icon/close.svg";

import HideReveal from "../components/ui/HideReveal/HideReveal";
import BriefCharacteristic from '../components/ui/BriefCharacteristic/BriefCharacteristic';

import { basketSlice } from '../store/reducers/BasketSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Modal from '../components/ui/Modal/Modal';

const ProductCard = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { products } = useAppSelector(state => state.productsReducer);

	const { valueParam } = useParams();
	let barcodeParam = valueParam?.split('-')[0];
	let idParam = Number(valueParam?.split('-')[1]);

	const [check, setCheck] = useState(true);

	const childToParent = (childcheck: boolean) => {
		setCheck(childcheck);
	}

	const { basket } = useAppSelector(state => state.basketReducer);
	const { addToBasket } = basketSlice.actions;
	const dispatch = useAppDispatch();

	let originallyСost = JSON.parse(window.localStorage.getItem("Cost") || '0');
	let originallyValue = 1;


	basket.filter(items => items.id === idParam).map(item => {
		originallyСost = item.price;
		originallyValue = item.value;
		return item;
	})


	const [cost, setCost] = useState(originallyСost);
	const [value, setValue] = useState(originallyValue);

	useMemo(() => {
		setValue(originallyValue);
	}, [originallyValue])

	const quantityToParent = (value: number) => {
		setValue(value);
	}

	useEffect(() => {
		basket.filter(items => items.id === idParam).map(item => {
			setCost(item.price);
			setValue(item.value);
			return item;
		});
	}, [basket, idParam]);

	const [modalActive, setModalActive] = useState(false);
	const [message, setMessage] = useState('');

	function addToBasketWithAMessage(id: number, price: number) {
		dispatch(addToBasket({ id: id, value: value, cost: price }))
		setMessage(`Товар добавлен в корзину! Общее количество данного товара в корзине ${value} шт.`);
		setModalActive(true);
	}

	return (
		<div className='product-card'>
			<div className='header'>
				<TopHeader />
				<Header />
			</div>

			<div className='main'>
				{products.filter(pro => (pro.barcode === barcodeParam && pro.id === idParam))
					.map(product =>
						<div className='product-card__container container' key={product.id}>
							<div className='product-card__breadcrumbs'>
								<BreadCrumbs title={product.title} />
							</div>
							<div className="product-card__info">
								<div className="product-card__img-body">
									<img className="product-card__img" src={product.image} alt={product.title} />
								</div>
								<div className="product-card__describe">
									<span className="product-card__available">В наличии</span>
									<div className="product-card__title">
										<ProductTitle classN="titleL" brand={product.brand} title={product.title} />
									</div>
									<div className="product-card__type">
										<ProductType type={product.type} size={product.size} />
									</div>
									<div className="product-card__addtocart">
										<div className="product-card__price"><ProductPrice classN="priceL" price={cost} /></div>
										<div className="product-card__quantity"><ProductQuantity amount={value} quantityToParent={quantityToParent} /></div>
										<div className="product-card__button"><Button classN='fourth' name='В корзину' icon={basketIcon} alt='Basket' onClick={() => addToBasketWithAMessage(product.id, product.price)} /></div>
										<div className="product-card__share"><Share /></div>
									</div>

									<div className="product-card__additionalfunt"><AdditionalFunctionality /></div>
									<div className="product-card__brief">
										<BriefCharacteristic product={product} isCheck={check} />
									</div>
									<div className="product-card__hidereveal">
										<HideReveal title="Описание" text={product.description} />
										<hr className="product-card__hr" />
										<HideReveal title="Характеристики" product={product} childToParent={childToParent} />
									</div>
								</div>
							</div>
						</div>)}

				<Modal active={modalActive} setActive={setModalActive} >
					<div className='product-card__modal'>
						<div className='product-card__close' onClick={() => setModalActive(false)}><img src={closeIcon} alt="Close" /></div>
						<div className='product-card__modal-title'>{message}</div>
					</div>
				</Modal>
			</div>

			<div className='footer'>
				<Footer />
			</div>
		</div>)
}

export default ProductCard;