import { useState } from 'react';
import styles from "./productquantity.module.css";

interface ProductQuantityProps {
	amount: number;
	quantityToParent?: (quantity: number) => void;
}

const ProductQuantity = ({ amount, quantityToParent }: ProductQuantityProps) => {
	const [quantity, setQuantity] = useState(amount);

	function increment() {
		setQuantity(quantity + 1);
		quantityToParent?.(quantity + 1);
	}

	function decrement() {
		if (quantity !== 1) {
			setQuantity(quantity - 1);
			quantityToParent?.(quantity - 1);
		}
	}

	return (
		<div>
			<button className={styles.button} onClick={decrement}>-</button>
			<span className={styles.quantity}>{quantity}</span>
			<button className={styles.button} onClick={increment}>+</button>
		</div>
	)
}

export default ProductQuantity;