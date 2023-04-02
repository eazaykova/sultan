import { useState } from 'react';
import styles from "./hidereveal.module.css";
import revealIcon from '../../../images/icon/reveal.svg';
import hideIcon from '../../../images/icon/hide.svg';
import { IProduct } from "../../../models";
import StringForm from '../StringForm/StringForm';

interface HideRevealProps {
	title: string;
	text?: string;
	product?: IProduct;
	childToParent?: (check: boolean) => void;
}

const HideReveal = ({ title, text, product, childToParent }: HideRevealProps) => {

	const [check, setCheck] = useState(false);
	const [icon, setIcon] = useState(revealIcon);

	function stateFun() {
		check ? (setCheck(false)) : setCheck(true);
		check ? (setIcon(revealIcon)) : setIcon(hideIcon);
		childToParent?.(check);
	}

	let typeProd = '';
	for (let type of product?.typeproduct ?? "") {
		typeProd = typeProd + ' / ' + type;
	}

	return (
		<div className={styles.body}>
			<div className={styles.hideorreveal} onClick={stateFun} >{title} <img src={icon} alt="Hide or reveal" /></div>
			{
				check && (
					text
						? <div className={styles.data}><span className={styles.text}>{text}</span></div>
						: <div className={styles.data}>
							<div>
								<StringForm str='Назначение:' value='Домашнее использование' />
								<StringForm str='Тип:' value={typeProd.substring(2)} />
								<StringForm str='Производитель:' value={product?.manufacturer} />
								<StringForm str='Бренд:' value={product?.brand} />
								<StringForm str='Артикул:' value={product?.barcode.slice(product?.barcode.length - 5)} />
								<StringForm str='Штрихкод:' value={product?.barcode} />
								<StringForm str='Вес:' value={`${product?.size} ${product?.type}`} />
								<StringForm str='Объем:' value={`${product?.size} ${product?.type}`} />
								<StringForm str='Кол-во в коробке:' value='5' />
							</div>
						</div>
				)
			}
		</div>
	)
}

export default HideReveal;