import styles from "./titlehideorreveal.module.css";
import { useState } from 'react';
import hideIcon from '../../../images/icon/hide.svg';
import revealIcon from '../../../images/icon/reveal.svg';


interface CheckBoxProps {
	hideOrRevealToParent?: (checkhideorreveal: boolean) => void;
	classN?: string;
	title1: string;
	title2?: string;
}

const TitleHideOrReveal = ({ hideOrRevealToParent, classN, title1, title2 }: CheckBoxProps) => {
	const [check, setCheck] = useState(false);
	const [icon, setIcon] = useState(revealIcon);
	const [text, setText] = useState(title1);

	function stateFun() {
		check ? (setText(title1)) : setText(title2 || title1);
		check ? (setCheck(false)) : setCheck(true);
		check ? (setIcon(revealIcon)) : setIcon(hideIcon);

		hideOrRevealToParent?.(check);
	}

	classN = classN ? classN : 'div';

	return (
		<div className={styles[classN]} onClick={stateFun} >{text} <img src={icon} alt="Hide or reveal" /></div>
	)
}

export default TitleHideOrReveal;