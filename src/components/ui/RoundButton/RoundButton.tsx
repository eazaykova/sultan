import styles from "./roundbutton.module.css";

interface RoundButtonProps {
	icon: string;
	alt: string;
	onClick?: any;
}

const RoundButton = ({ icon, alt, onClick }: RoundButtonProps) => {
	return (
		<button className={styles.button} onClick={onClick}><img src={icon} alt={alt} /> </button >
	)
}

export default RoundButton;