import styles from "./call.module.css";
interface CallProps {
	right?: boolean;
}


const Call = ({ right }: CallProps) => {
	let classN = 'info';
	right ? classN = 'infiR' : classN = 'info';

	return (

		<div className={styles[classN]}>
			<span className={styles.number}>+7 (777) 490-00-91</span>
			<span className={styles.time}>время работы: 9:00-20:00</span>
			<a className={styles.link} href="tel:+77774900091">Заказать звонок</a>
		</div>

	)
}

export default Call;