import styles from "./checkbox.module.css";
import { useState, useEffect } from 'react';

interface CheckBoxProps {
	manufact: string;
	count: number;
	clearFlag?: boolean;
	manufactToParent?: (value: string) => void;
}

const CheckBox = ({ manufact, count, manufactToParent, clearFlag }: CheckBoxProps) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(false);
	}, [clearFlag])

	const chengeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(!checked);
		if (!checked) {
			manufactToParent?.(`${event.target.value}~true`);
		} else {
			manufactToParent?.(`${event.target.value}~false`);
		}
	}

	return (
		<div className={styles.items}>
			<input type="checkbox" checked={checked} onChange={chengeCheckbox} value={manufact} />
			<span>{manufact} <span className={styles.count}>({count})</span></span>
		</div>
	)
}

export default CheckBox;