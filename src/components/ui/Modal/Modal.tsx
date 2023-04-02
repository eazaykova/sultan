import styles from "./modal.module.css";

interface ModalProps {
	active: boolean;
	setActive: any;
	children: React.ReactNode;
}

const Modal = ({ active, setActive, children }: ModalProps) => {
	return (
		<div className={styles[active ? 'modalActive' : 'modal']} onClick={() => setActive(false)}>
			<div className={styles[active ? 'contentActive' : 'content']} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default Modal;