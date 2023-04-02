import { IProduct } from "../../models";
import Button from "../ui/Button/Button";
import StringForm from "../ui/StringForm/StringForm";
import styles from "./cardproduct.module.css";
import { useNavigate } from "react-router-dom";
import basketIcon from '../../images/icon/basket.svg';
import ProductType from "../ui/ProductType/ProductType";
import ProductTitle from "../ui/ProductTitle/ProductTitle";
import ProductPrice from "../ui/ProductPrice/ProductPrice";
import Modal from "../../components/ui/Modal/Modal";
import closeIcon from "../../images/icon/close.svg";

import { basketSlice } from '../../store/reducers/BasketSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState } from "react";

interface ProductProps {
	product: IProduct;
}

export function CardProduct({ product }: ProductProps) {
	let typeProd = '';
	for (let type of product.typeproduct) {
		typeProd = typeProd + ' / ' + type;
	}

	const navigate = useNavigate();

	function openCardAndPassValue() {
		localStorage.setItem("Cost", JSON.stringify(product.price));
		let value = product.barcode + '-' + product.id;
		navigate(`/productcard/${value}`);
	}

	const { addToBasket } = basketSlice.actions;
	const dispatch = useAppDispatch();
	const { basket } = useAppSelector(state => state.basketReducer);

	const [modalActive, setModalActive] = useState(false);
	const [message, setMessage] = useState('');

	function addToBasketWithAMessage() {
		if (basket.find(item => item.id === product.id)) {
			setModalActive(true);
			setMessage('Этот товар уже в корзине!');
		} else {
			dispatch(addToBasket({ id: product.id, value: 1, cost: product.price }));
			setMessage('Товар добавлен в корзину!');
			setModalActive(true);
		}
	}

	return (
		<div className={styles.container} key={product.id}>
			<div onClick={() => openCardAndPassValue()} className={styles.body}>
				<div className={styles.box}>
					<img src={product.image} alt={product.title} />
				</div>

				<div className={styles.boxSize} >
					<ProductType type={product.type} size={product.size} />
				</div>
				<div className={styles.title}>
					<ProductTitle classN='title' brand={product.brand} title={product.title} />
				</div>

				<div className={styles.string} >
					<StringForm str='Штрихкод:' value={product.barcode} />
					<StringForm str='Производитель:' value={product.manufacturer} />
					<StringForm str='Бренд:' value={product.brand} />
					<StringForm str='Тип:' value={typeProd.substring(2)} />
				</div>
			</div>

			<div className={styles.basic} >
				<div className={styles.price}>
					<ProductPrice classN='priceS' price={product.price} />
				</div>
				<div><Button onClick={() => addToBasketWithAMessage()} classN='first' name='В КОРЗИНУ' icon={basketIcon} alt='Basket' /></div>
			</div>

			<Modal active={modalActive} setActive={setModalActive} >
				<div className={styles.modal}>
					<div className={styles.close} onClick={() => setModalActive(false)}><img src={closeIcon} alt="Close" /></div>
					<div className={styles.modalTitle}>{message}</div>
				</div>
			</Modal>


		</div>
	)
}
