import styles from "./productprice.module.css";

interface ProductPriceProps {
	classN: string;
	price: number;
}

const ProductPrice = ({ classN, price }: ProductPriceProps) => {
	return (
		<span className={styles[classN]}>{new Intl.NumberFormat("ru").format(price)} &#8376;</span>
	)
}

export default ProductPrice;