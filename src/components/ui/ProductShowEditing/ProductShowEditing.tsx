import stylesMod from "./productshowediting.module.css";
import styles from "../ProductEditingCreation/producteditingcreation.module.css";
import { useState } from 'react';
import { filters } from "../../../data/filter";
import { IProduct } from "../../../models/IProduct";

import penIcon from '../../../images/icon/pen.svg';
import likeIcon from '../../../images/icon/like.svg';
import Button from "../Button/Button";
import { productsSlice } from '../../../store/reducers/ProductsSlice';
import { useAppDispatch } from '../../../hooks/redux';
import RoundButton from "../RoundButton/RoundButton";
import Modal from "../Modal/Modal";
import closeIcon from "../../../images/icon/close.svg";
import closeWIcon from "../../../images/icon/closeW.svg";
import deleteIcon from "../../../images/icon/delete.svg";
import TitleHideOrReveal from "../TitleHideOrReveal/TitleHideOrReveal";

interface ProductShowEditingProps {
	product: IProduct;
}

const ProductShowEditing = ({ product }: ProductShowEditingProps) => {
	const { updateProducts, removeFromProducts } = productsSlice.actions;
	const dispatch = useAppDispatch();

	const [filter, setFilter] = useState(filters)

	const [title, setTitle] = useState(product.title);
	const [url, setUrl] = useState(product.image);
	const [brand, setBrand] = useState(product.brand);
	const [manuf, setManuf] = useState(product.manufacturer);
	const [barcode, setBarcode] = useState(product.barcode);
	const [price, setPrice] = useState(String(product.price));
	const [description, setDescription] = useState(product.description);
	const [size, setSize] = useState(product.size);
	const [type, setType] = useState(product.type);
	const [producttype, setProducttype] = useState<string[]>(product.typeproduct);
	const [disabled, setDisabled] = useState(true);

	const [modalActive, setModalActive] = useState(false);

	const [message, setMessage] = useState('');
	const [icon, setIcon] = useState(true);

	const updateProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
			let id = product.id;
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
			setMessage('Изменения внесены');
			setIcon(true);
			dispatch(updateProducts(temp));
			setDisabled(true);
			setModalActive(true);
		}
	}

	const [deleteModel, setDeleteModel] = useState(false);

	const deleteProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setDeleteModel(true);
		setModalActive(true);
	}

	const cancellDelete = () => {
		setDeleteModel(false);
		setModalActive(false);
	}

	const okDelete = () => {
		setModalActive(false);
		setDeleteModel(false);
		setTimeout(() => {
			dispatch(removeFromProducts(product.id));
		}, 1500);

		setMessage('Продукт удален!');
		setModalActive(true);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = event.target;

		if (checked) {
			setProducttype([...producttype, value]);
		}
		else {
			setProducttype(producttype.filter((event) => event !== value));
		}
	}

	const [checkTitle, setCheckTitle] = useState(true);

	const titleToParent = (checkTitle: boolean) => {
		setCheckTitle(checkTitle);
	}

	return (
		<div>
			<div className={styles.body}>
				<div className={stylesMod.producttitle}>
					<TitleHideOrReveal title1={product.title} classN="divM" hideOrRevealToParent={titleToParent} />
				</div>
				<div className={stylesMod[checkTitle ? 'addNoShow' : 'addShow']}>
					<div className={styles.title}>
						<div>
							<input className={styles.input} type="text" disabled={disabled} placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} />
							<input className={styles.input} type="text" disabled={disabled} placeholder="Url изображения" value={url} onChange={e => setUrl(e.target.value)} />
						</div>
						<div>
							<input className={styles.input} type="text" disabled={disabled} placeholder="Бренд" value={brand} onChange={e => setBrand(e.target.value)} />
							<input className={styles.input} type="text" disabled={disabled} placeholder="Производитель" value={manuf} onChange={e => setManuf(e.target.value)} />
						</div>
						<div>
							<input className={styles.input} type="number" disabled={disabled} placeholder="Штрихкод" value={barcode} onChange={e => setBarcode(e.target.value)} />
							<input className={styles.input} type="number" disabled={disabled} placeholder="Стоимость за 1 товар" value={price} onChange={e => setPrice(e.target.value)} />
						</div>
					</div>

					<div className={styles.sizetypedesc}>
						<textarea className={styles.description} disabled={disabled} placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)}></textarea>

						<div className={styles.sizetype}>
							<input className={styles.input} type="number" disabled={disabled} placeholder="Размер" value={size} onChange={e => setSize(e.target.value)} />
							<div className={styles.type}>
								<span>Тип</span>
								<select className={styles.select} disabled={disabled} value={type} onChange={e => setType(e.target.value)}>
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
									<input type="checkbox" checked={producttype.includes(filter.name) ? true : false} disabled={disabled} value={filter.name} onChange={handleChange} />
									<span>{filter.name}</span>
								</div>
							)}
							<div className={styles.button}><Button classN="first" name='Редактировать' disabled={!disabled} icon={penIcon} alt='Like' onClick={() => setDisabled(false)} /></div>

						</div>
					</div>
					<div className={stylesMod.buttons}>
						<div className={stylesMod.button}><Button classN="first" name='Удалить' icon={deleteIcon} alt='Сross' onClick={deleteProduct} /></div>
						<div className={stylesMod.button}><Button classN="first" name='Сохранить' disabled={disabled} icon={likeIcon} alt='Like' onClick={updateProduct} /></div>
					</div>

				</div>


			</div>
			<Modal active={modalActive} setActive={setModalActive} >
				<div className={stylesMod.modal}>
					{deleteModel ?
						<div className={stylesMod.modal_info}>
							<div className='basket-of-product__modal-subtitle'>Вы уверены что хотите удалить?</div>
							<div className={stylesMod.buttons_mod}>
								<div className={stylesMod.buttons_like}><RoundButton icon={likeIcon} alt='Like' onClick={okDelete} /></div>
								<RoundButton icon={closeWIcon} alt='Close' onClick={cancellDelete} />
							</div>
						</div>
						: <div>
							<div className='basket-of-product__close' onClick={() => setModalActive(false)}><img src={closeIcon} alt="Сross" /></div>
							<div className='basket-of-product__modal-info'>
								<div className='basket-of-product__icon'>
									<RoundButton icon={icon ? likeIcon : closeWIcon} alt='Tick' />
								</div>
								<div className='basket-of-product__modal-subtitle'>{message}</div>
							</div>
						</div>
					}
				</div>
			</Modal>
		</div>
	)
}

export default ProductShowEditing;