import styles from "./button.module.css";

interface ButtonProps {
	classN: string;
	name: string;
	icon?: string;
	alt?: string;
	onClick?: any;
	disabled?: boolean;
}

const Button = ({ classN, name, icon, alt, onClick, disabled }: ButtonProps) => {
	return (
		<button type='button' disabled={disabled} className={styles[classN]} onClick={onClick} > {name} <img src={icon} alt={alt} /> </button >
	)
}

export default Button;

