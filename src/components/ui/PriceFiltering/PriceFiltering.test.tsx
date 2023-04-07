import { fireEvent, render, screen } from '@testing-library/react';
import PriceFiltering from './PriceFiltering';

describe('PriceFiltering', () => {
	test('Empty inputs on first run', () => {
		render(<PriceFiltering flag={true} />);

		const inputFrom = screen.getByTestId('value-from');
		const inputTo = screen.getByTestId('value-to');

		expect(inputFrom).toContainHTML('');
		expect(inputTo).toContainHTML('');
	});

	test('Error: Price from greater than price to', () => {
		render(<PriceFiltering flag={true} />);

		const inputFrom = screen.getByTestId('value-from');
		const inputError = screen.getByTestId('value-erorr');

		fireEvent.input(inputFrom, {
			target: { value: 1 }
		});

		expect(inputError).toContainHTML('! Цена «от» не может быть больше цены «до»');
	});

	test('Correct: Price from less than price to', () => {
		render(<PriceFiltering flag={true} />);

		const inputFrom = screen.getByTestId('value-from');
		const inputTo = screen.getByTestId('value-to');
		const inputError = screen.getByTestId('value-erorr');

		fireEvent.input(inputFrom, {
			target: { value: 10 }
		});

		fireEvent.input(inputTo, {
			target: { value: 100 }
		});

		expect(inputError).toContainHTML('')
		expect(inputFrom).toContainHTML('10');
		expect(inputTo).toContainHTML('100');
	});

	test('Error: Negative price', () => {
		render(<PriceFiltering flag={true} />);

		const inputFrom = screen.getByTestId('value-from');
		const inputTo = screen.getByTestId('value-to');
		const inputError = screen.getByTestId('value-erorr');

		fireEvent.input(inputFrom, {
			target: { value: -10 }
		});

		fireEvent.input(inputTo, {
			target: { value: -5 }
		});

		expect(inputError).toContainHTML('! Цена не может быть отрицательной')
	});

	test('Error: Negative price and Price from greater than price to', () => {
		render(<PriceFiltering flag={true} />);

		const inputFrom = screen.getByTestId('value-from');
		const inputTo = screen.getByTestId('value-to');
		const inputError = screen.getByTestId('value-erorr');

		fireEvent.input(inputFrom, {
			target: { value: 1 }
		});

		fireEvent.input(inputTo, {
			target: { value: -100 }
		});

		expect(inputError).toContainHTML('<span class="error">! Цена «от» не может быть больше цены «до»</span><span class="error">! Цена не может быть отрицательной</span>');
	});
})