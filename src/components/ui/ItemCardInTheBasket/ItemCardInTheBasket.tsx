import styles from "./itemcardinthebasket.module.css";
import { useState, useEffect } from 'react';
import ProductType from "../ProductType/ProductType";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import ProductPrice from "../ProductPrice/ProductPrice";
import RoundButton from "../RoundButton/RoundButton";
import deleteIcon from '../../../images/icon/delete.svg';
import { IProduct } from "../../../models";

import { basketSlice } from '../../../store/reducers/BasketSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';


interface ItemCardInTheBasketProps {
	product: IProduct;
}

const ItemCardInTheBasket = ({ product }: ItemCardInTheBasketProps) => {

	const { basket } = useAppSelector(state => state.basketReducer);
	const { addToBasket, removeFromBasket } = basketSlice.actions;
	const dispatch = useAppDispatch();

	let originallyValue = 1;
	let originallyСost = 0;

	basket.filter(items => items.id === product.id).map(item => {
		originallyValue = item.value;
		originallyСost = item.price;
		return item;
	});

	const [cost, setCost] = useState(originallyСost);
	const [value, setValue] = useState(originallyValue);

	useEffect(() => {
		basket.filter(items => items.id === product.id).map(item => {
			setCost(item.price);
			setValue(item.value);
			return item;
		})
	}, [basket, product.id]);

	const quantityToParent = (value: number) => {
		setValue(value);
	};

	useEffect(() => {
		dispatch(addToBasket({ id: product.id, value: value, cost: product.price }));
	}, [value, dispatch, addToBasket, product.id, product.price]);

	useEffect(() => {
		basket.filter(items => items.id === product.id).map(item => {
			setCost(item.price);
			return item;
		});
	}, [basket, product.id]);

	return (
		<div className={styles.card} >
			<div className={styles.img}>
				<img src={product.image} alt={product.title} />
			</div>
			<div className={styles.description}>
				<div className={styles.type}>
					<ProductType type={product.type} size={product.size} />
				</div>
				<div className={styles.title}>
					{product?.title}
				</div>
				<div className={styles.subtitle}>
					{product.description}
				</div>
			</div>
			<div className={styles.option}>
				<div className={styles.quantity}>
					<ProductQuantity amount={value} quantityToParent={quantityToParent} />
				</div>
				<div className={styles.price}>
					<ProductPrice classN="priceL" price={cost} />
				</div>
				<div className={styles.delete}>
					<RoundButton icon={deleteIcon} alt='Delete' onClick={() => dispatch(removeFromBasket(product.id))} />
				</div>
			</div>
		</div>
	)
}

export default ItemCardInTheBasket;