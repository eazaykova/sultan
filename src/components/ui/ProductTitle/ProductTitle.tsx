import styles from "./producttitle.module.css";

interface ProductTitleProps {
	classN: string;
	brand: string;
	title: string;
}

const ProductTitle = ({ classN, brand, title }: ProductTitleProps) => {
	return (
		<p className={styles[classN]}><span>{brand}</span> {title}</p>
	)
}

export default ProductTitle;
