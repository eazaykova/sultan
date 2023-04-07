import { fireEvent, render, screen } from '@testing-library/react';
import * as reduxHooks from '../../hooks/redux';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import Basket from '../ui/Basket/Basket';

jest.mock('../../hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const quantity = 1;
const fullprice = 50;

describe('Header', () => {
	test('Creating a product card', () => {
		mockedSelector.mockReturnValue({ quantity, fullprice });
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);

		fireEvent.click(screen.getByTestId('basket-click'));

		expect(
			render(
				<MemoryRouter>
					<Basket amount={quantity} total={fullprice} />
				</MemoryRouter>
			)
		);
	});
})