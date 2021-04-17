import React from 'react'
// import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import Categories from '../Categories'
import { render, screen, fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteCategory, addSubCategory, editCategoryFunction } from '../../redux/action'
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

    it('should have three categories initially', () => {
        let cn = screen.getByTestId('categoriesNumber')
        expect(cn.innerHTML).toBe("3 Categories Present");
    });

    it('should dispatch an action on add sub category button click', () => {
        userEvent.click(screen.getByTestId('addSubCategoryOpenButton-0'))
        userEvent.click(screen.getByTestId('addSubCategoryButton-0'))
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch an action on edit category button click', () => {
        userEvent.click(screen.getByTestId('editCategoryOpenButton-0'))
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

    it('should dispatch an action on saveToLocalButton button click', () => {
        userEvent.click(screen.getByTestId('saveToLocalButton'))
        expect(component.firstChild).toMatchSnapshot();
    });

    it('should dispatch an action on expandAllButton button click', () => {
        userEvent.click(screen.getByTestId('expandAllButton'))
        expect(component.firstChild).toMatchSnapshot();
    });

    // it('should decrease number of categories on delete event', () => {
    //     userEvent.click(screen.getByTestId('deleteButton-0'))
    //     let cn = screen.getByTestId('categoriesNumber')
    //     expect(cn.innerHTML).toBe("2 Categories Present")       
    // });

    // it('should increase number of categories on add category event after 5000ms', () => {
    //     let input = screen.getByTestId('addCategoryInput')
    //     fireEvent.change(input, { target: { value: 'Acsss' } })
    //     userEvent.click(screen.getByTestId('addCategoryButton'))
    //     let cn = screen.getByTestId('categoriesNumber')
    //     expect(cn).toBe("4 Categories Present");
    // });

})

describe('Action Creators',()=>{
    test('delete action creator action',()=>{
       const expectedAction = {
          type:'DELETE_CATEGORY',
          index: 0 
       }
       expect(deleteCategory(0)).toEqual(expectedAction);
    })

    test('addSubCategory action creator action',()=>{
        const expectedAction = {
           type:'ADD_SUBCATEGORY',
           index: 0 ,
           payload: {}
        }
        expect(addSubCategory({},0)).toEqual(expectedAction);
     })

     test('editCategoryFunction action creator action',()=>{
        const expectedAction = {
           type:'EDIT_CATEGORY',
           index: 0 ,
           payload: {}
        }
        expect(editCategoryFunction({},0)).toEqual(expectedAction);
     })
 })