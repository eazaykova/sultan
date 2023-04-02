import { IFilter } from "../../../models";
import styles from "./cardfilter.module.css";

interface CardFilterProps {
	filter: IFilter;
	onClick?: any;
	classN?: boolean;
	id?: number;
}

const CardFilter = ({ filter, onClick, classN, id }: CardFilterProps) => {
	let newFilter = filter.name.split(' ');
	let endFilter = '';
	let startFilter = newFilter[0];
	for (let i = 1; i < newFilter.length; i++) {
		endFilter = endFilter + ' ' + newFilter[i];
	}

	return (
		<button className={classN && filter.id === id ? styles.cardActive : styles.card} onClick={onClick}>
			{startFilter} <br /> {endFilter}
		</button>
	)
}

export default CardFilter;

