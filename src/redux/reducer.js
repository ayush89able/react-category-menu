let initialState;
initialState = [
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
console.log(localStorage.getItem("state"));
if (localStorage.getItem("state") != null) {
  initialState = JSON.parse(localStorage.getItem("state"));
}

import * as actionTypes from "./actionTypes";

function catagories(state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case actionTypes.ADD_CATEGORY:
      return state.concat([action.payload]);
    case actionTypes.ADD_SUBCATEGORY:
      return [
        // part of the array before the specified index
        ...state.slice(0, action.index),
        // inserted item
        action.payload,
        // part of the array after the specified index
        ...state.slice(action.index + 1)
      ];
    case actionTypes.DELETE_CATEGORY:
      let stateCopy = [...state];
      stateCopy.splice(action.index, 1);
      return stateCopy;
    case actionTypes.EDIT_CATEGORY:
      console.log("aasda", action.payload);
      return [
        // part of the array before the specified index
        ...state.slice(0, action.index),
        // inserted item
        action.payload,
        // part of the array after the specified index
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

export default catagories;
