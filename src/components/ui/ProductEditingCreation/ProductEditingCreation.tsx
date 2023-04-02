import styles from "./producteditingcreation.module.css";
import { useState, useEffect, useMemo } from 'react';
import { filters } from "../../../data/filter";
import likeIcon from '../../../images/icon/like.svg';
import Button from "../Button/Button";
import { productsSlice } from '../../../store/reducers/ProductsSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { IProduct } from "../../../models/IProduct";
import RoundButton from "../RoundButton/RoundButton";
import Modal from "../Modal/Modal";
import closeIcon from "../../../images/icon/close.svg"
import closeWIcon from "../../../images/icon/closeW.svg"

const ProductEditingCreation = () => {
	const { products } = useAppSelector(state => state.productsReducer);
	const { addToProducts } = productsSlice.actions;
	const dispatch = useAppDispatch();

	let arrId: number[] = [];
	useMemo(() => {
		products.map(product => arrId.push(product.id));
	}, [products, arrId])

	const [filter, setFilter] = useState(filters)
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [brand, setBrand] = useState('');
	const [manuf, setManuf] = useState('');
	const [barcode, setBarcode] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [size, setSize] = useState('');
	const [type, setType] = useState('');
	const [producttype, setProducttype] = useState<string[]>([]);
	const [modalActive, setModalActive] = useState(false);
	const [message, setMessage] = useState('');
	const [icon, setIcon] = useState(true);

	const addProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!url ||
			!title ||
			!brand ||
			!manuf ||
			!barcode ||
			!price ||
			!description ||
			!size ||
			!type ||
			!producttype.length) {
			setMessage('НЕОБХОДИМО ЗАПОЛНИТЬ ВСЕ ПОЛЯ!');
			setModalActive(true);
			setIcon(false);
		} else {
			let id = Math.max(...arrId) + 1;
			let temp: IProduct = {
				id: id,
				image: url,
				title: title,
				type: type,
				size: size,
				barcode: barcode,
				manufacturer: manuf,
				brand: brand,
				description: description,
				price: Number(price),
				typeproduct: producttype
			};

			setMessage('Товар добален');
			setIcon(true);
			dispatch(addToProducts(temp));
			setTitle('');
			setUrl('');
			setBrand('');
			setManuf('');
			setBarcode('');
			setPrice('');
			setDescription('');
			setSize('');
			setType('');
			setProducttype([]);
			setFilter([]);
			setModalActive(true);
		}
	}

	useEffect(() => {
		setFilter(filters);
	}, [filter])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;
		if (checked) {
			setProducttype([...producttype, value]);
		}
		else {
			setProducttype(producttype.filter((event) => event !== value));
		}
	}

	return (
		<div>
			<div className={styles.body}>
				<div className={styles.title}>
					<div>
						<input className={styles.input} type="text" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} />
						<input className={styles.input} type="text" placeholder="Url изображения" value={url} onChange={e => setUrl(e.target.value)} />
					</div>
					<div>
						<input className={styles.input} type="text" placeholder="Бренд" value={brand} onChange={e => setBrand(e.target.value)} />
						<input className={styles.input} type="text" placeholder="Производитель" value={manuf} onChange={e => setManuf(e.target.value)} />
					</div>
					<div>
						<input className={styles.input} type="number" placeholder="Штрихкод" value={barcode} onChange={e => setBarcode(e.target.value)} />
						<input className={styles.input} type="number" placeholder="Стоимость за 1 товар" value={price} onChange={e => setPrice(e.target.value)} />
					</div>
				</div>

				<div className={styles.sizetypedesc}>
					<textarea className={styles.description} placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)}></textarea>

					<div className={styles.sizetype}>
						<input className={styles.input} type="number" placeholder="Размер" value={size} onChange={e => setSize(e.target.value)} />
						<div className={styles.type}>
							<span>Тип</span>
							<select className={styles.select} value={type} onChange={e => setType(e.target.value)}>
								<option ></option>
								<option value="г">г</option>
								<option value="мл">мл</option>
							</select>
						</div>
					</div>
				</div>

				<div className={styles.typeproduct}>
					<span className={styles.typeproducttitle}>Тип товара: </span>
					<div className={styles.typeitems}>
						{filter.map(filter =>
							<div key={filter.id} className={styles.items}>
								<input type="checkbox" value={filter.name} onChange={handleChange} />
								<span>{filter.name}</span>
							</div>
						)}
						<div className={styles.button}><Button classN="first" name='Создать' icon={likeIcon} alt='Like' onClick={addProduct} /></div>

					</div>
				</div>
			</div>
			<Modal active={modalActive} setActive={setModalActive} >
				<div className='basket-of-product__modal'>
					<div className='basket-of-product__close' onClick={() => setModalActive(false)}><img src={closeIcon} alt="Close" /></div>
					<div className='basket-of-product__modal-info'>
						<div className='basket-of-product__icon'>
							<RoundButton icon={icon ? likeIcon : closeWIcon} alt='Tick' />
						</div>
						<div className='basket-of-product__modal-subtitle'>{message}</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default ProductEditingCreation;