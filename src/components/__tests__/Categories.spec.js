import React from 'react'
// import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import Categories from '../Categories'
import { render, screen, fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { deleteCategory, addSubCategory, editCategoryFunction } from '../../redux/action'
import catagories from '../../redux/reducer'
import * as ActionTypes from '../../redux/actionTypes'
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


 describe('Testing Reducer',()=>{
     let initialState = [{"id": 1, "subCategory": [{"id": 1, "subCategory": [], "value": "Trucks"}, {"id": 1, "subCategory": [], "value": "Cars"}], "value": "4 Wheelers"}, {"id": 2, "subCategory": [{"id": 1, "subCategory": [], "value": "Bikes"}], "value": "2 wheeleres"}, {"id": 3, "subCategory": [], "value": "Electronics"}]
    it('should return the initial state', () => {
        expect(catagories(undefined, {})).toEqual( [{"id": 1, "subCategory": [{"id": 1, "subCategory": [], "value": "Trucks"}, {"id": 1, "subCategory": [], "value": "Cars"}], "value": "4 Wheelers"}, {"id": 2, "subCategory": [{"id": 1, "subCategory": [], "value": "Bikes"}], "value": "2 wheeleres"}, {"id": 3, "subCategory": [], "value": "Electronics"}]);
      });

      it('should handle ADD_CATEGORY', () => {
        const action = {
          type: ActionTypes.ADD_CATEGORY,
          payload: {id:4, value: 'Acs', subCategory:[]}
        };
        expect(catagories(initialState, action)).toEqual([{"id": 1, "subCategory": [{"id": 1, "subCategory": [], "value": "Trucks"}, {"id": 1, "subCategory": [], "value": "Cars"}], "value": "4 Wheelers"}, {"id": 2, "subCategory": [{"id": 1, "subCategory": [], "value": "Bikes"}], "value": "2 wheeleres"}, {"id": 3, "subCategory": [], "value": "Electronics"}, {"id": 4, "subCategory": [], "value": "Acs"}]);
      });

      it('should handle DELETE_CATEGORY', () => {
        const action = {
          type: ActionTypes.DELETE_CATEGORY,
          payload: 0
        };
        expect(catagories(initialState, action)).toEqual([{"id": 2, "subCategory": [{"id": 1, "subCategory": [], "value": "Bikes"}], "value": "2 wheeleres"}, {"id": 3, "subCategory": [], "value": "Electronics"}])
      });

      it('should handle EDIT_CATEGORY', () => {
        const action = {
          type: ActionTypes.EDIT_CATEGORY,
          payload: {id:1, value: 'Acs', subCategory:[]},
          index: 0
        };
        expect(catagories(initialState, action)).toEqual([{"id": 1, "subCategory": [], "value": "Acs"}, {"id": 2, "subCategory": [{"id": 1, "subCategory": [], "value": "Bikes"}], "value": "2 wheeleres"}, {"id": 3, "subCategory": [], "value": "Electronics"}])
      });
 })