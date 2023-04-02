import styles from "./contactdetail.module.css";

interface ContactDetailProps {
	img: string;
	titleimg: string;
	href?: string;
	str1: string;
	str2: string;
}

const ContactDetail = ({ img, titleimg, href, str1, str2 }: ContactDetailProps) => {
	return (
		<div className={styles.body}>
			<img src={img} alt={titleimg} />
			<p className={styles.contact}>
				{href
					? <a className={styles.link} href={href}>{str1}</a>
					: <span className={styles.title}>{str1}</span>}
				<span className={styles.subtitle}>{str2}</span>
			</p>
		</div>
	)
}

export default ContactDetail;