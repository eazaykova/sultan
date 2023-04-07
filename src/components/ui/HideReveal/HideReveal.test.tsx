import { fireEvent, render, screen } from '@testing-library/react';
import HideReveal from './HideReveal';
import { IProduct } from "../../../models/IProduct";

export const product: IProduct = {
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

describe('HideReveal', () => {
	test('Hide and reveal element', () => {
		render(<HideReveal title='Характеристики' product={product} />);
		expect(screen.queryByTestId('hideorreveal-elem')).toBeNull();
		fireEvent.click(screen.getByTestId('hideorreveal-click'));
		expect(screen.queryByTestId('hideorreveal-elem')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('hideorreveal-click'));
		expect(screen.queryByTestId('hideorreveal-elem')).toBeNull();
		fireEvent.click(screen.getByTestId('hideorreveal-click'));
		expect(screen.queryByTestId('hideorreveal-elem')).toBeInTheDocument();
	})
})