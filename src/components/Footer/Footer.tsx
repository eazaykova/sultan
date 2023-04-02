import InputWithButton from "../ui/InputWithButton/InputWithButton";
import MenuList from "../ui/MenuList/MenuList";
import styles from "./footer.module.css";
import Button from "../ui/Button/Button";
import subscribeIcon from '../../images/icon/subscribe.svg';
import whatsappIcon from '../../images/icon/whatsapp.svg';
import downloadIcon from '../../images/icon/download.svg';
import telegramIcon from '../../images/icon/telegram.svg';
import logoIcon from '../../images/icon/logoW.svg';

import visaIcon from '../../images/icon/visa.svg';
import mastercardIcon from '../../images/icon/mastercard.svg';

import Call from "../ui/Call/Call";
import { Link } from "react-router-dom";


const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__columns}>
					<div className={styles.footer__item}>
						<div className={styles.footer__logoprice}>
							<div className={styles.footer__logo}>
								<img src={logoIcon} alt="Султан лого" />
							</div>
							<div className={styles.footer__pricemobile}>
								<Button classN="fifth" name='Прайс-лист' icon={downloadIcon} alt='Download' />
							</div>
						</div>
						<p className={styles.footer__text}>Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве и Акмолинской области</p>
						<span className={styles.footer__subscribe}>Подпишись на скидки и акции</span>
						<div className={styles.footer__subscribeimput}>
							<InputWithButton classN="inputsecond" text='Введите ваш E-mail' icon={subscribeIcon} alt='Subscribe' />
						</div>
					</div>
					<div className={styles.footer__item} >
						<div className={styles.footer__menu}>
							<div className={styles.footer__menuitem}>
								<MenuList title="Меню сайта:" items="О компании;Доставка и оплата;Возврат;Контакты" />
								<ul className={styles.list}>
									<li className={styles.item} ><Link to='/adminpanel'>Панель администратора</Link></li>
								</ul>
							</div>
							<div className={styles.footer__menuitem}>
								<MenuList title="Категории:" items="Бытовая химия;Косметика и гигиена;Товары для дома;Товары для детей и мам;Посуда" />
							</div>
						</div>
					</div>
					<div className={styles.footer__item}>
						<div className={styles.footer__contact}>
							<div className={styles.footer__contactitem}>
								<span className={styles.footer__title}>Скачать прайс-лист:</span>
								<div className={styles.footer__price}>
									<Button classN="fifth" name='Прайс-лист' icon={downloadIcon} alt='Download' />
								</div>
								<span className={styles.footer__subtitle}>Связь в мессенджерах:</span>
								<div className={styles.footer__iconmessage}>
									<a href="#"><img src={whatsappIcon} alt="WhatsApp" /></a>
									<a href="#"><img src={telegramIcon} alt="Telegram" /></a>
								</div>
							</div>
							<div className={styles.footer__contactitem}>
								<span className={styles.footer__title}>Контакты:</span>
								<div className={styles.footer__call}>
									<Call />
								</div>
								<div className={styles.footer__email}>
									<a className={styles.footer__emaillink} href='mailto:opt.sultan@mail.ru'>opt.sultan@mail.ru</a>
									<span className={styles.footer__emailsubtitle}>На связи в любое время</span>
								</div>
								<div className={styles.footer__card}>
									<img src={visaIcon} alt="Visa" />
									<img src={mastercardIcon} alt="Mastercard" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer;