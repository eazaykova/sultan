import styles from "./stringform.module.css";

interface StringProps {
	str: string;
	extrstr?: string;
	value?: string;
}

const StringForm = ({ str, extrstr, value }: StringProps) => {
	return (
		<p className={styles.string}>{str}
			{extrstr && <span className={styles.extrstr}>{extrstr}<span>:</span></span>}
			<span className={styles.value}>{value}</span>
		</p>
	)
}

export default StringForm;

