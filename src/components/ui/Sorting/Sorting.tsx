import styles from "./sorting.module.css";

interface ISort {
	value: string;
	name: string;
}

interface SortingProps {
	options: ISort[];
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sorting = ({ options, value, onChange }: SortingProps) => {
	return (

		<div className={styles.select}>
			<select value={value} onChange={onChange}>
				<option>Сбросить</option>
				{options.map(option =>
					<option className={styles.test} key={option.value} value={option.value}>{option.name} </option>
				)}
			</select>
		</div>

	)
}

export default Sorting;
