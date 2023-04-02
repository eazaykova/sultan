import { CardProduct } from "../components/CardProduct/CardProduct";
import Header from "../components/Header/Header";
import TopHeader from "../components/TopHeader/TopHeader";
import Footer from "../components/Footer/Footer";
import CardFilter from "../components/ui/CardFilter/CardFilter";
import { filters } from "../data/filter";
import { IProduct } from "../models";
import Sorting from "../components/ui/Sorting/Sorting";
import { useMemo, useState, useEffect } from 'react';
import InputWithButton from "../components/ui/InputWithButton/InputWithButton";
import searchImg from '../images/icon/search.svg';
import CheckBox from "../components/ui/CheckBox/CheckBox";
import PriceFiltering from "../components/ui/PriceFiltering/PriceFiltering";
import ListFilter from "../components/ui/ListFilter/ListFilter";
import BreadCrumbs from "../components/ui/BreadCrumbs/BreadCrumbs";
import TitleHideOrReveal from "../components/ui/TitleHideOrReveal/TitleHideOrReveal";
import RoundButton from "../components/ui/RoundButton/RoundButton";
import deleteIcon from '../images/icon/delete.svg';
import nextIcon from '../images/icon/next.svg';
import previousIcon from '../images/icon/previous.svg';
import Pagination from "../components/ui/Pagination/Pagination";
import backIcon from '../images/icon/back.svg';
import { useAppSelector } from '../hooks/redux';

interface IManufacturer {
	manufact: string | null;
	count: number;
}

const Catalog = () => {
	const { products } = useAppSelector(state => state.productsReducer);
	const [selectedSort, setSelectedSort] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [productsSort, setProductsSort] = useState<IProduct[]>(products);
	const [manufacturerProducts, setManufacturerProducts] = useState<IManufacturer[]>([]);

	useMemo(() => {
		setProductsSort(products);
	}, [products])

	useMemo(() => {
		let temp: string[] = [];
		let tempNew: IManufacturer[] = [];
		products.map(product => temp.push(product.manufacturer));
		temp.sort();

		let current = null;
		let cnt = 0;
		for (var i = 0; i < temp.length; i++) {
			if (temp[i] !== current) {
				if (cnt > 0) { tempNew.push({ manufact: current, count: cnt }); }
				current = temp[i];
				cnt = 1;
			} else {
				cnt++;
			}
		}
		if (cnt > 0) { tempNew.push({ manufact: current, count: cnt }); }

		setManufacturerProducts(tempNew);

	}, [products]);

	const valueToParent = (value: string) => {
		setSearchQuery(value);
	}

	const [checkManufact, setCheckManufact] = useState<string[]>([]);

	const manufactToParent = (value: string) => {
		let temp = value.split('~');

		if (temp[1] === 'true') {
			setCheckManufact([...checkManufact, temp[0]]);
		} else {
			let tempArr = [...checkManufact];
			const index = tempArr.indexOf(temp[0]);

			if (index !== -1) {
				tempArr.splice(index, 1);
			}
			setCheckManufact(tempArr);
		}
	}

	const [fromPrice, setFromPrice] = useState(0);
	const [toPrice, setToPrice] = useState(0);
	const [type, setType] = useState<string | null>('');

	const fromToPriceToParent = (from: number, to: number) => {
		setFromPrice(from);
		setToPrice(to);
	}

	useMemo(() => {
		if (selectedSort) {
			let sortSplit = selectedSort.split('-');

			if (sortSplit.length === 3) {
				if (sortSplit[0] === 'ASC') {
					setProductsSort([...products].sort((a, b) => {
						if (a[sortSplit[1] as keyof IProduct] === b[sortSplit[1] as keyof IProduct]) {
							return a[sortSplit[2] as keyof IProduct] < b[sortSplit[2] as keyof IProduct] ? -1 : 1
						} else {
							return a[sortSplit[1] as keyof IProduct] < b[sortSplit[1] as keyof IProduct] ? -1 : 1
						}
					}))
				} else {
					setProductsSort([...products].sort((a, b) => {
						if (a[sortSplit[1] as keyof IProduct] === b[sortSplit[1] as keyof IProduct]) {
							return a[sortSplit[2] as keyof IProduct] > b[sortSplit[2] as keyof IProduct] ? -1 : 1
						} else {
							return a[sortSplit[1] as keyof IProduct] > b[sortSplit[1] as keyof IProduct] ? -1 : 1
						}
					}))
				}
			} else {
				if (sortSplit[0] === 'ASC') {
					setProductsSort([...products].sort((a, b) => {
						return Number(a[sortSplit[1] as keyof IProduct]) - Number(b[sortSplit[1] as keyof IProduct]);
					}))
				} else {
					setProductsSort([...products].sort((a, b) => {
						return Number(b[sortSplit[1] as keyof IProduct]) - Number(a[sortSplit[1] as keyof IProduct]);
					}))
				}
			}

		}
		return products;

	}, [selectedSort, products]);

	const searchedManufect = useMemo(() => {
		return manufacturerProducts.filter(item => item.manufact?.includes(searchQuery));
	}, [manufacturerProducts, searchQuery])

	const sortProducts = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedSort(event.currentTarget.value);
	}

	const [flag, setFlag] = useState(false);
	const [clearflag, setClearFlag] = useState(false);

	const showFiltering = (event: React.FormEvent<HTMLButtonElement>) => {
		setFlag(!flag);
	}
	const [classFilter, setClassFilter] = useState(false);
	const [idFilter, setIdFilter] = useState(0);

	const sortedAndSearchedProducts = useMemo(() => {
		if (toPrice !== 0 && checkManufact.length === 0 && !type) {

			return productsSort.filter(product => {
				if (product.price >= fromPrice && product.price <= toPrice) return product;
				return false;
			});
		} else if (toPrice === 0 && checkManufact.length !== 0 && !type) {
			return productsSort.filter(product => checkManufact.includes(product.manufacturer));
		} else if (toPrice !== 0 && checkManufact.length !== 0 && !type) {
			return productsSort.filter(product => {
				if (product.price >= fromPrice && product.price <= toPrice && checkManufact.includes(product.manufacturer)) return product;
				return false;
			});
		} else if (type && toPrice === 0 && checkManufact.length === 0) {
			return productsSort.filter(product => product.typeproduct.includes(type));
		} else if (type && toPrice !== 0 && checkManufact.length === 0) {
			return productsSort.filter(product => {
				if (product.typeproduct.includes(type) && product.price >= fromPrice && product.price <= toPrice) return product;
				return false;
			});
		} else if (type && toPrice === 0 && checkManufact.length !== 0) {
			return productsSort.filter(product => {
				if (product.typeproduct.includes(type) && checkManufact.includes(product.manufacturer)) return product;
				return false;
			});
		} else if (type && toPrice !== 0 && checkManufact.length !== 0) {
			return productsSort.filter(product => {
				if (product.typeproduct.includes(type) && product.price >= fromPrice && product.price <= toPrice && checkManufact.includes(product.manufacturer)) return product;
				return false;
			});
		} else {
			return productsSort;
		}
	}, [toPrice, fromPrice, flag, type, productsSort, clearflag])

	const clearFiltering = (event: React.FormEvent<HTMLButtonElement>) => {
		checkManufact.length = 0;
		setFromPrice(0);
		setToPrice(0);
		setClearFlag(!clearflag);
	}

	const showProductByType = (id: number) => (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
		let type = event.currentTarget.textContent?.split('   ').join(' ')
		setType(type || '');
		setClassFilter(true);
		if (idFilter === id) {
			setType('');
			setClassFilter(!classFilter);
		}
		setIdFilter(id);
	}

	const [checkhideorreveal, setCheckHideOrReveal] = useState(true);

	const hideOrRevealToParent = (checkhideorreveal: boolean) => {
		setCheckHideOrReveal(checkhideorreveal);
	}

	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);
	const [countItem, setCountItem] = useState(0);

	let pagesArray = useMemo(() => {
		let result = [];
		for (let i = 0; i < totalPages; i++) {
			result.push(i + 1);
		}
		setCountItem((limit * 1) - limit);
		setPage(1);

		return result;

	}, [totalPages, limit])

	const getPageCount = (totalCount: number, limit: number) => {
		return Math.ceil(totalCount / limit);
	}

	useMemo(() => {
		let totalCount = sortedAndSearchedProducts.length;
		setTotalPages(getPageCount(totalCount, limit));
	}, [sortedAndSearchedProducts, limit])

	const changePage = (p: number) => {
		if (p !== 0 && p <= pagesArray.length) {
			setCountItem((limit * p) - limit);
			setPage(p);
		}
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const [isShowParam, setIsShowParam] = useState(false);

	return (
		<div className='wrapper'>
			<div className='header'>
				<TopHeader />
				<Header />
			</div>

			<div className='main'>
				<div className="catalog__container container" >
					<div className="catalog__breadcrumbs"><BreadCrumbs title="Каталог" /></div>
					<div className="catalog__titleandsort">
						<div className="catalog__title">Косметика и гигиена</div>
						<div className="catalog__sorting">
							<span className="catalog__sorting-title">Сортировка:</span>
							<Sorting
								value={selectedSort}
								onChange={sortProducts}
								options={[
									{ value: 'ASC-brand-title', name: 'Название ↑' },
									{ value: 'DES-brand-title', name: 'Название ↓' },
									{ value: 'ASC-price', name: 'Цена ↑' },
									{ value: 'DES-price', name: 'Цена ↓' },
								]}
							/>
						</div>
					</div>

					<div className='catalog__card-filter'>
						{filters.map(filter => <CardFilter classN={classFilter} id={idFilter} filter={filter} key={filter.id} onClick={showProductByType(filter.id)} />)}
					</div>

					<div className='catalog__body'>
						<aside className='catalog__filter'>
							<div className='catalog__filter-title-show' onClick={() => setIsShowParam(!isShowParam)}>
								<div className='catalog__filter-title'>ПОДБОР ПО ПАРАМЕТРАМ </div>
								<div className='catalog__filter-title-button'><img className={`catalog__filter-title-${isShowParam ? 'hide' : 'reveal'}`} src={backIcon} alt="Back" /></div>
							</div>

							<div className={`catalog__filter-param-${isShowParam ? 'show' : 'noshow'}`}>
								<div className='catalog__filter-price'>
									<div className='catalog__filter-price-title'>Цена <span>₸</span></div>
									<div><PriceFiltering flag={flag} fromToPriceToParent={fromToPriceToParent} clearFlag={clearflag} /></div>
								</div>
								<div className='catalog__filter-manufact'>
									<div className='catalog__filter-manufact-title'>Производитель</div>
									<div className='catalog__filter-manufact-search'>
										<InputWithButton
											valueToParent={valueToParent}
											classN="inputthird"
											text='Поиск...'
											icon={searchImg}
											alt='Search' />
									</div>
									<div className='catalog__filter-manufact-items'>
										<div className='catalog__filter-manufact-item'>
											{checkhideorreveal
												? searchedManufect.slice(0, 4).map(item => <CheckBox manufact={item.manufact || ''} count={item.count} key={item.manufact} manufactToParent={manufactToParent} clearFlag={clearflag} />)
												: searchedManufect.map(item => <CheckBox manufact={item.manufact || ''} count={item.count} key={item.manufact} manufactToParent={manufactToParent} clearFlag={clearflag} />)
											}
										</div>
										<div className={`catalog__filter-${searchedManufect.length > 4 ? 'show' : 'noshow'}${checkhideorreveal ? 'reveal' : 'hide'}`}>
											<TitleHideOrReveal title1={'Показать все'} title2={'Скрыть'} hideOrRevealToParent={hideOrRevealToParent} />
										</div>
									</div>
								</div>
								<div className='catalog__hr'></div>
								<div className='catalog__filter-button'>
									<button className='catalog__filter-show' onClick={showFiltering}>Показать</button>
									<RoundButton icon={deleteIcon} alt='Delete' onClick={clearFiltering} />
								</div>
							</div>
							<div className='catalog__filter-type'>
								<span className='catalog__filter-type-title'>Тип:</span>
								{filters.map(filter => <ListFilter classN={classFilter} id={idFilter} filter={filter} key={filter.id} onClick={showProductByType(filter.id)} />)}
							</div>

						</aside>

						<div className="catalog__sorting-mobile">
							<span className="catalog__sorting-title">Сортировка:</span>
							<Sorting
								value={selectedSort}
								onChange={sortProducts}
								options={[
									{ value: 'ASC-brand-title', name: 'Название ↑' },
									{ value: 'DES-brand-title', name: 'Название ↓' },
									{ value: 'ASC-price', name: 'Цена ↑' },
									{ value: 'DES-price', name: 'Цена ↓' },
								]}
							/>
						</div>

						<div>
							<div className="catalog__card-product">
								{sortedAndSearchedProducts.length === 0 && <div className="catalog__card-product-error">Товар соответствующий указанным параметрам не найден</div>}
								{sortedAndSearchedProducts.slice(countItem, limit * page).map(product => <CardProduct product={product} key={product.id} />)}
							</div>
							{sortedAndSearchedProducts.length !== 0 && <div className="catalog__pagination">
								<img className="catalog__pagination-previous" src={previousIcon} alt="Previous" onClick={() => changePage(page - 1)} />
								{pagesArray.map(p => <Pagination key={p} onClick={() => changePage(p)} p={p} page={page} />)}
								<img className="catalog__pagination-next" src={nextIcon} alt="Next" onClick={() => changePage(page + 1)} />
							</div>}
							<div className="catalog__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.</div>
						</div>

					</div>
				</div>
			</div>

			<div className='footer'>
				<Footer />
			</div>
		</div >
	)
}

export default Catalog;