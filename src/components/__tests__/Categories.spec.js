import React from 'react'
// import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import Categories from '../Categories'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteCategory } from '../../redux/action'

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
        store.dispatch = jest.fn();

        // component = renderer.create(
        //     <Provider store={store}>
        //         <Categories />
        //     </Provider>
        // );
        const { container } = render(
            <Provider store={store}>
                <Categories />
            </Provider>
        );
        component = container
    });

    it('should render with given state from Redux store', () => {
        // expect(component.toJSON()).toMatchSnapshot();
        expect(component.firstChild).toMatchSnapshot();
    });

    it('should dispatch an action on add sub category button click', () => {
        userEvent.click(screen.getByTestId('addSubCategoryButton-0'))
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action on edit category button click', () => {
        userEvent.click(screen.getByTestId('editCategoryButton-0'))
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action on delete button click', () => {
        userEvent.click(screen.getByTestId('deleteButton-0'))
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action on add category button click', () => {
        userEvent.click(screen.getByTestId('addCategoryButton'))
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });


})