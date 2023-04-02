import styles from "./briefcharacteristic.module.css";
import StringForm from "../StringForm/StringForm";
import { IProduct } from "../../../models";


interface BriefCharacteristicProps {
	product: IProduct;
	isCheck: boolean;
}

const BriefCharacteristic = ({ product, isCheck }: BriefCharacteristicProps) => {
	let classCheck = 'reveal';
	isCheck ? classCheck = 'reveal' : classCheck = 'hide';

	return (
		<div>
			<StringForm str='Производитель:' value={product.manufacturer} />
			<StringForm str='Бренд:' value={product.brand} />
			<StringForm str='Артикул:' value='460404' />

			<div className={styles[classCheck]}><StringForm str='Кол-во в коробке:' value='5' /></div>

			<StringForm str='Штрихкод:' value={product.barcode} />
			<div className={styles[classCheck]}>
				<StringForm str='Размеры коробки' extrstr='(д*ш*в)' value='10x10x10' />
				<StringForm str='Вес в коробке:' value='1020 г' />
			</div>
		</div>
	)
}

export default BriefCharacteristic;