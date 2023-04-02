import styles from "./pagination.module.css";

interface PaginationProps {
	onClick: any;
	page: number;
	p: number;
}

const Pagination = ({ page, p, onClick }: PaginationProps) => {
	return (
		<div className={page === p ? styles.pageCurrent : styles.page} onClick={onClick}>{p}</div>
	)
}

export default Pagination;