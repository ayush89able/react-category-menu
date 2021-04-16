import React from 'react'
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import Categories from '../Categories'

import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Categories Component', () => {

    let store;
    let component;
    beforeEach(() => {
        let initialState = [
            {
                id: 1,
                value: "4 Wheelers",
                subCategory: [
                    {
                        id: 1,
                        value: "Trucks",
                        subCategory: []
                    },
                    {
                        id: 1,
                        value: "Cars",
                        subCategory: []
                    }
                ]
            },
            {
                id: 2,
                value: "2 wheeleres",
                subCategory: [
                    {
                        id: 1,
                        value: "Bikes",
                        subCategory: []
                    }
                ]
            },
            {
                id: 3,
                value: "Electronics",
                subCategory: []
            }
        ];

        store = mockStore(initialState);

        component = renderer.create(
            <Provider store={store}>
                <Categories />
            </Provider>
        );
    });

    it('should render with given state from Redux store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
})