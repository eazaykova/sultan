import { render, screen, fireEvent } from '@testing-library/react';

import ProductQuantity from './ProductQuantity';


describe('ProductQuantity component', () => {
	test('ProductQuantity render', () => {
		render(<ProductQuantity amount={1} />);
		expect(screen.getByText(1)).toBeInTheDocument();
		expect(screen.getByText(1)).toMatchSnapshot();
	})

	test('ProductQuantity decrement', () => {
		render(<ProductQuantity amount={2} />);
		const btn = screen.getByText('-');
		fireEvent.click(btn);
		expect(screen.getByText(1)).toBeInTheDocument();
	})

	test('ProductQuantity increment', () => {
		render(<ProductQuantity amount={2} />);
		const btn = screen.getByText('+');
		fireEvent.click(btn);
		expect(screen.getByText(3)).toBeInTheDocument();
	})
})