import styles from "./back.module.css";
import { Link, useNavigate } from "react-router-dom";
import backIcon from '../../../images/icon/back.svg';

interface BackProps {
	title: string;
}

const Back = ({ title }: BackProps) => {
	const navigate = useNavigate();

	return (
		<div className={styles.back} onClick={() => navigate(`/`)}>
			<div className={styles.button}>
				<img className={styles.icon} src={backIcon} alt="Back" />
			</div>
			<span className={styles.title}>{title}</span>
		</div>
	)
}

export default Back;