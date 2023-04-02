import styles from "./share.module.css";
import shareImg from '../../../images/icon/share.svg';

const AdditionalFunctionality = () => {
	return (
		<div className={styles.share}><img src={shareImg} alt="Поделиться" /></div>
	)
}

export default AdditionalFunctionality;