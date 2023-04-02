import styles from "./breadcrumbs.module.css";
import { Link } from "react-router-dom";
import Back from "../Back/Back";

interface BreadCrumbsProps {
	title: string;
}


const BreadCrumbs = ({ title }: BreadCrumbsProps) => {

	return (
		<div>
			<div className={styles.bread}>
				<span className={styles.noactive}>Главная</span>
				{title !== 'Каталог' && <Link className={styles.active} to='/'>Каталог</Link>}
				<span className={styles.noactive}>{title}</span>
			</div>
			<div className={styles.short}>
				<Back title='Назад' />
			</div>
		</div>
	)
}

export default BreadCrumbs;

