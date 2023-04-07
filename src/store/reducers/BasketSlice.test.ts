import reducer, { addToBasket, removeFromBasket, emptyBasket, BasketState } from './BasketSlice';
import { IBasket } from "../../models/IBasket";

describe('BasketSlice', () => {
	test('should return the initialState', () => {
		expect(reducer(undefined, { type: undefined })).toEqual(
			{
				basket: [],
				quantity: 0,
				fullprice: 0,
				isLoading: false,
				error: ''
			}
		)
	})

	test('testing adding an element to an empty basket', () => {
		const previousState: BasketState = {
			basket: [],
			quantity: 0,
			fullprice: 0,
			isLoading: false,
			error: ''
		};

		expect(reducer(previousState, addToBasket({ id: 1, value: 2, cost: 50 }))).toEqual(
			{
				basket: [{ id: 1, value: 2, cost: 50, price: 100 }],
				quantity: 2,
				fullprice: 100,
				isLoading: false,
				error: ''
			}
		)
	})

	test('adding an element to an empty BasketState', () => {
		const previousState: BasketState = {
			basket: [],
			quantity: 0,
			fullprice: 0,
			isLoading: false,
			error: ''
		};

		expect(reducer(previousState, addToBasket({ id: 1, value: 2, cost: 50 }))).toEqual(
			{
				basket: [{ id: 1, value: 2, cost: 50, price: 100 }],
				quantity: 2,
				fullprice: 100,
				isLoading: false,
				error: ''
			}
		)
	})

	test('add is not empty BasketState', () => {
		const previousState: BasketState = {
			basket: [{ id: 1, value: 2, cost: 50, price: 100 }],
			quantity: 2,
			fullprice: 100,
			isLoading: false,
			error: ''
		};

		expect(reducer(previousState, addToBasket({ id: 2, value: 3, cost: 10 }))).toEqual(
			{
				basket: [{ id: 1, value: 2, cost: 50, price: 100 }, { id: 2, value: 3, cost: 10, price: 30 }],
				quantity: 5,
				fullprice: 130,
				isLoading: false,
				error: ''
			}
		)
	})

	test('changing an existing value', () => {
		const previousState: BasketState = {
			basket: [{ id: 1, value: 2, cost: 50, price: 100 }, { id: 2, value: 3, cost: 10, price: 30 }],
			quantity: 5,
			fullprice: 130,
			isLoading: false,
			error: ''
		};

		expect(reducer(previousState, addToBasket({ id: 1, value: 1, cost: 150 }))).toEqual(
			{
				basket: [{ id: 1, value: 1, cost: 150, price: 150 }, { id: 2, value: 3, cost: 10, price: 30 }],
				quantity: 4,
				fullprice: 180,
				isLoading: false,
				error: ''
			}
		)
	})

	test('removing an element from BasketState', () => {
		const previousState: BasketState = {
			basket: [{ id: 1, value: 1, cost: 150, price: 150 }, { id: 2, value: 3, cost: 10, price: 30 }],
			quantity: 4,
			fullprice: 180,
			isLoading: false,
			error: ''
		};

		const id = 2;
		expect(reducer(previousState, removeFromBasket(id))).toEqual(
			{
				basket: [{ id: 1, value: 1, cost: 150, price: 150 }],
				quantity: 1,
				fullprice: 150,
				isLoading: false,
				error: ''
			}
		)
	})

	test('full cleanup', () => {
		const previousState: BasketState = {
			basket: [{ id: 1, value: 1, cost: 150, price: 150 }, { id: 2, value: 3, cost: 10, price: 30 }],
			quantity: 4,
			fullprice: 180,
			isLoading: false,
			error: ''
		};

		expect(reducer(previousState, emptyBasket())).toEqual(
			{
				basket: [],
				quantity: 0,
				fullprice: 0,
				isLoading: false,
				error: ''
			}
		)
	})

})
