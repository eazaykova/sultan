import { CardProduct } from './CardProduct';
import { render } from '@testing-library/react';
import * as reduxHooks from '../../hooks/redux';
import { IProduct } from "../../models/IProduct";
import { MemoryRouter } from 'react-router-dom';


const product: IProduct = {
	id: 1,
	image: 'https://emksp.ru/files/d48/d48a4d60b53c2d6b818caaa764927893-fit-400x400.jpg',
	title: 'Косметическое мыло',
	type: 'г',
	size: '540',
	barcode: '4604049097014',
	manufacturer: 'Colgate-Palmolive',
	brand: 'PALMOLIVE',
	description: 'Представляем Вашему вниманию восхитительный набор Косметического мыла от Palmolive. Разнообразие ароматов никого не оставит равнодушным. Освежающее с летним арбузом содержит увлажняющие компоненты и придает мягкость вашей коже.',
	price: 488,
	typeproduct: ['Уход за руками', 'Уход за телом']
}

jest.mock('../../hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');

describe('CardProduct', () => {
	test('Creating a product card', () => {
		mockedSelector.mockReturnValue(product);
		const component = render(
			<MemoryRouter>
				<CardProduct product={product} />
			</MemoryRouter>
		);
		expect(component).toMatchSnapshot();
	});
})