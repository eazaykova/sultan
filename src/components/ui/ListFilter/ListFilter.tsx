import { IFilter } from "../../../models";
import styles from "./listfilter.module.css";

interface ListFilterProps {
	filter: IFilter;
	onClick?: any;
	classN?: boolean;
	id?: number;
}

const ListFilter = ({ filter, onClick, classN, id }: ListFilterProps) => {
	return (
		<div className={classN && filter.id === id ? styles.filterActive : styles.filter} onClick={onClick}>{filter.name}</div>
	)
}

export default ListFilter;