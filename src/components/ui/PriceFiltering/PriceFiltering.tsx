import styles from "./pricefiltering.module.css";
import { useEffect, useState } from "react";

interface PriceFilteringProps {
	flag: boolean;
	clearFlag?: boolean;
	fromToPriceToParent?: (from: number, to: number) => void;
}

const PriceFiltering = ({ flag, fromToPriceToParent, clearFlag }: PriceFilteringProps) => {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');

	const handleFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFrom(event.target.value);
	};

	const handleTo = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTo(event.target.value);
	};

	useEffect(() => {
		fromToPriceToParent?.(Number(from), Number(to));
	}, [flag])

	useEffect(() => {
		setFrom('');
		setTo('');
	}, [clearFlag])

	return (
		<div className={styles.filter}>
			<div className={styles.filterPrice}>
				<input data-testid="value-from" className={styles.input} type="number" placeholder="0" onChange={handleFrom} min={0} value={from} />
				<span className={styles.dash}>-</span>
				<input data-testid="value-to" className={styles.input} type="number" placeholder="10 000" onChange={handleTo} min={0} value={to} />
			</div>
			<div data-testid="value-erorr" className={styles.filtererorr}>
				{Number(from) > Number(to) && <span className={styles.error}>! Цена «от» не может быть больше цены «до»</span>}
				{(Number(from) < 0 || Number(to) < 0) && <span className={styles.error}>! Цена не может быть отрицательной</span>}
			</div>
		</div>
	)
}

export default PriceFiltering;