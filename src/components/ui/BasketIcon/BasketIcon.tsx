import styles from "./basketicon.module.css";
import basketImg from '../../../images/icon/basket-main.svg';

interface BasketProps {
	amount: number;
	onClick?: any;
}

const BasketIcon = ({ amount, onClick }: BasketProps) => {

	return (
		<div className={styles.icon} onClick={onClick}>
			<img src={basketImg} alt="Basket" />
			{(amount > 0) && <div className={styles.circle}>{amount}</div>}
		</div>
	)
}

export default BasketIcon;