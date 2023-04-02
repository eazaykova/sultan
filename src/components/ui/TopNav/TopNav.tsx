import styles from "./topnav.module.css";
import menuImg from '../../../images/icon/menu.svg';

const TopNav = () => {
	return (
		<nav>
			<div className={styles.burger}>
				<div className={styles.circle}>
					<img src={menuImg} alt="menu" />
				</div>
			</div>
			<ul className={styles.ul}>
				<li className={styles.li}><a href="#">О компании</a></li>
				<li className={styles.li}><a href="#">Доставка и оплата</a></li>
				<li className={styles.li}><a href="#">Возврат</a></li>
				<li className={styles.li}><a href="#">Контакты</a></li>
			</ul>
		</nav>
	)
}

export default TopNav;