import styles from "./producttype.module.css";
import mlImg from '../../../images/icon/ml.svg';
import gImg from '../../../images/icon/g.svg';

interface ProductTypeProps {
	type: string;
	size: string;
}

const ProductType = ({ type, size }: ProductTypeProps) => {
	return (
		<div>
			{type === 'г'
				? <img className={styles.imgG} src={gImg} alt="icon" />
				: <img className={styles.imgML} src={mlImg} alt="icon" />}
			<span className={styles.span}>{size}</span>
			<span className={styles.span}>{type}</span>
		</div>
	)
}

export default ProductType;
