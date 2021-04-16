import * as actionTypes from "./actionTypes";

export function addCategory(payload) {
  return { type: actionTypes.ADD_CATEGORY, payload };
}

export function addCategorySync(payload) {
  return dispatch => {
    setTimeout(() => {
      dispatch(addCategory(payload));
    }, 5000);
  };
}

export function addSubCategory(payload, index) {
  return { type: actionTypes.ADD_SUBCATEGORY, payload, index };
}

export function deleteCategory(index) {
  return { type: actionTypes.DELETE_CATEGORY, index };
}

export function editCategoryFunction(payload, index) {
  return { type: actionTypes.EDIT_CATEGORY, payload, index };
}
