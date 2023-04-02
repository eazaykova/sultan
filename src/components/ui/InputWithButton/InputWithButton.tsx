import styles from "./inputwithbutton.module.css";
import { useState } from "react";

interface InputWithButtonProps {
	classN: string;
	text: string;
	icon: string;
	alt: string;
	valueToParent?: (value: string) => void;
}

const InputWithButton = ({ classN, text, icon, alt, valueToParent }: InputWithButtonProps) => {
	const [value, setValue] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		valueToParent?.(value);
	};

	return (
		<div className={styles[classN]}>
			<input className={styles.input} type="text" placeholder={text} onChange={handleChange} value={value} />
			<button className={styles.button} onClick={handleClick}><img src={icon} alt={alt} /></button>
		</div>
	)
}

export default InputWithButton;
