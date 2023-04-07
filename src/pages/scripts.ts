import { IProduct } from "../models/IProduct";
import { IManufacturer } from '../models/IManufacturer'

export const sortProductsFunc = (
	selectedSort: string,
	setProductsSort: React.Dispatch<React.SetStateAction<IProduct[]>>,
	products: IProduct[]
) => {
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
}

export const sortedAndSearch = (
	toPrice: number,
	checkManufact: string[],
	type: string | null,
	productsSort: IProduct[],
	fromPrice: number,

) => {
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
}

export const getManufacturersAndQuantity = (
	products: IProduct[]
) => {
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

	return tempNew;
}

export const getPageCount = (totalCount: number, limit: number) => {
	return Math.ceil(totalCount / limit);
}