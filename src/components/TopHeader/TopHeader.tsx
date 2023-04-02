import ContactDetail from "../ui/ContactDetail/ContactDetail";
import location from '../../images/icon/location.svg';
import mail from '../../images/icon/mail.svg';
import TopNav from "../ui/TopNav/TopNav";
import styles from "./topheader.module.css";
import Logo from "../ui/Logo/Logo";
import BasketIcon from "../ui/BasketIcon/BasketIcon";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks/redux';

export function TopHeader() {
	const navigate = useNavigate();
	const { quantity } = useAppSelector(state => state.basketReducer);
	return (
		<div className={styles.topHeader}>
			<div className={styles.container}>
				<div className={styles.body}>
					<div className={styles.contact}>
						<ContactDetail img={location} titleimg='Location' str1='г. Кокчетав, ул. Ж. Ташенова 129Б' str2='(Рынок Восточный)' />
						<ContactDetail img={mail} titleimg='Mail' href='mailto:opt.sultan@mail.ru' str1='opt.sultan@mail.ru' str2='На связи в любое время' />
					</div>
					<div className={styles.nav}>
						<TopNav />
					</div>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div className={styles.basket}>
						<BasketIcon amount={quantity} onClick={() => navigate(`/basket`)} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TopHeader;