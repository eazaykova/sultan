import styles from "./menulist.module.css";

interface MenuListProps {
	title: string;
	items: string;
}

const MenuList = ({ title, items }: MenuListProps) => {
	let i = 0;

	return (
		<div className={styles.menu}>
			<span className={styles.title}>{title}</span>
			<ul className={styles.list}>
				{items.split(';').map((item) => <li className={styles.item} key={i++}><a href="#">{item}</a></li>)}
			</ul>
		</div>
	)
}

export default MenuList;