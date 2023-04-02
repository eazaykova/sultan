import styles from "./additionalfunctionality.module.css";
import shareImg from '../../../images/icon/share.svg';
import downImg from '../../../images/icon/download-dark.svg';
import Share from "../Share/Share";

const AdditionalFunctionality = () => {
	return (
		<div className={styles.body}>
			<div className={styles.share}><Share /></div>
			<div className={styles.text}><p>	При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области</p></div>
			<div className={styles.list}><span>Прайс-лист</span><img src={downImg} alt="Download" /></div>
		</div>
	)
}

export default AdditionalFunctionality;