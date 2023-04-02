import styles from "./callorder.module.css";
import lady from '../../../images/image/lady.jpg';
import Call from "../Call/Call";

const CallOrder = () => {
	return (
		<div className={styles.callorder}>
			<div className={styles.info}>
				<Call right={true} />
			</div>
			<div className={styles.img}>
				<img src={lady} alt="Lady" />
			</div>
		</div>
	)
}

export default CallOrder;