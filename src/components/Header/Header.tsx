import styles from "./header.module.css";
import catalogImg from '../../images/icon/catalog.svg';
import searchImg from '../../images/icon/search.svg';
import downloadImg from '../../images/icon/download.svg';
import Logo from "../ui/Logo/Logo";
import Button from "../ui/Button/Button";
import InputWithButton from "../ui/InputWithButton/InputWithButton";
import CallOrder from "../ui/CallOrder/CallOrder";
import Basket from "../ui/Basket/Basket";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks/redux';

export function Header() {
	const navigate = useNavigate();
	const { quantity, fullprice } = useAppSelector(state => state.basketReducer);
	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<div className={styles.body}>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div className={styles.catalog}>
						<Button classN="second" name='Каталог' icon={catalogImg} alt='Catalog' />
					</div>
					<div className={styles.search}>
						<InputWithButton classN="inputfirst" text='Поиск...' icon={searchImg} alt='Search' />
					</div>
					<div className={styles.call}>
						<CallOrder />
					</div>
					<div className={styles.pricelist}>
						<Button classN="third" name='Прайс-лист' icon={downloadImg} alt='Download' />
					</div>
					<div className={styles.basket}>
						<Basket amount={quantity} total={fullprice} onClick={() => navigate(`/basket`)} />
					</div>
					<div className={styles.vert}></div>
					<div className={styles.searchMobile}>
						<Button classN="second" name='Поискㅤ' icon={searchImg} alt='Search' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;