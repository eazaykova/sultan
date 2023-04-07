import styles from "./basket.module.css";
import BasketIcon from "../BasketIcon/BasketIcon";

interface BasketProps {
	amount: number;
	total: number;
	onClick?: any;
}

const Basket = ({ amount, total, onClick }: BasketProps) => {
	return (
		<div data-testid="basket-click" className={styles.basket} onClick={onClick}>
			<BasketIcon amount={amount} />
			<div className={styles.info}>
				<span className={styles.title}>Корзина</span>
				<span className={styles.total}>{total} ₸</span>
			</div>
		</div>
	)
}

export default Basket;