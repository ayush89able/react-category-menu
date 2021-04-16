import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addCategorySync, addSubCategory, deleteCategory, editCategoryFunction } from '../redux/action'
import { FaPlus, FaMinus, FaPlusSquare, FaMinusSquare, FaTrash, FaRegEdit } from "react-icons/fa";

const Categories = () => {

  const [newCategory, setNewCategory] = useState('')
  const [newSubCategory, setNewSubCategory] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [expandAll, setExpandAll] = useState(false)
  const [expand, setExpand] = useState(false)
  const [indexNumber, setIndexNumber] = useState(null)
  const [editIndexNumber, setEditIndexNumber] = useState(null)

  const state = useSelector(state => state);
  // console.log('state',state)
  const dispatch = useDispatch()

  const addCategoryHandler = () => {
    console.log('Adding Category')
    console.log(newCategory)
    let payload = {
      id: state.length + 1,
      value: newCategory,
      subCategory: []
    }
    console.log(payload)
    dispatch(addCategorySync(payload))
    setNewCategory('')
  }

  const showAddSubCategory = (index, item) => {
    setIndexNumber(index)
    setExpand(!expand)
  }

  const showEditCategory = (index, item) => {
    setEditIndexNumber(index)
  }

  const deleteCategoryHandler = (index, item) => {
    console.log('Deleteing Category')
    console.log('index', index)
    console.log('item', item)
    dispatch(deleteCategory(index))
  }

  const addSubCategoryHandler = (index, item) => {
    console.log('index', index)
    console.log('item', item)
    let subCategoryLength = item.subCategory.length
    console.log(subCategoryLength)
    let payload = {
      id: subCategoryLength + 1,
      value: newSubCategory,
      subCategory: []
    }
    let subCategory = item.subCategory.concat(payload);
    console.log('subCategories', subCategory)
    let payloadTwo = {
      ...item,
      subCategory
    }
    console.log('payloadTwo', payloadTwo)
    dispatch(addSubCategory(payloadTwo, index))
    setIndexNumber(null)
    setNewSubCategory('')
  }

  const editCategoryHandler = (index, item) => {
    console.log('editCategory', editCategory)
    console.log('index', index)
    console.log('item', item)
    let payload = {
      ...item,
      value: editCategory
    }
    console.log('payload edit Category', payload)
    dispatch(editCategoryFunction(payload, index))
    setEditIndexNumber(null)
    setEditCategory('')
  }

  const saveHandler = () => {
    localStorage.setItem('state', JSON.stringify(state))
  }


  return (
    <div className="container">
      <h1>{`${state.length} Categories Present`}</h1>
      <div className="row" style={{ marginBottom: '1rem' }}>
        <div className="col">
        </div>
        <div className="col">
          <button onClick={() => setExpandAll(!expandAll)} data-testid='expandAllButton' className="btn btn-primary">{expandAll ? <FaMinusSquare /> : <FaPlusSquare />}</button>
        </div>
        <div className="col">
          <button onClick={saveHandler} data-testid='saveToLocalButton' className="btn btn-primary">Save to local</button>
        </div>
        <div className="col">
        </div>
      </div>
      {state.map((item, index) => {
        return (
          <div className="row" key={index} style={{ marginBottom: '1em' }}>
            <div className="col">
              {item.value}
              {item.subCategory.length > 0 && expandAll && (
                item.subCategory.map((subItem, index) => {
                  return (
                    <div className="row" key={index} style={{ marginLeft: '1em' }}>
                      <div className="col">
                        <div>{subItem.value}</div>
                      </div>
                    </div>
                  )
                })
              )}
              {item.subCategory.length > 0 && indexNumber === index && expand && (
                item.subCategory.map((subItem, index) => {
                  return (
                    <div className="row" key={index} style={{ marginLeft: '1em' }}>
                      <div className="col">
                        <div>{subItem.value}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div className="col">
              <button id={index} data-testid={`addSubCategoryOpenButton-${index}`} onClick={() => { showAddSubCategory(index, item) }} className="btn btn-primary">{expand && indexNumber === index ? <FaMinus /> : <FaPlus />}</button>
              {indexNumber === index && expand && (
                <div className="row" style={{ margin: '1em 0' }}>
                  <input type='text' value={newSubCategory} data-testid={`addSubCategoryInput-${index}`} placeholder='New Sub Category' onChange={(e) => setNewSubCategory(e.target.value)} />
                  <button id={index} data-testid={`addSubCategoryButton-${index}`} onClick={() => { addSubCategoryHandler(index, item) }} className="btn btn-primary" style={{ margin: '0.5em 0' }}>Add Sub Category</button>
                </div>
              )}
            </div>
            <div className="col">
              <button id={index} data-testid={`deleteButton-${index}`} onClick={() => { deleteCategoryHandler(index, item) }} className="btn btn-primary"><FaTrash /></button>
            </div>
            <div className="col">
              <button id={index} data-testid={`editCategoryOpenButton-${index}`} onClick={() => { showEditCategory(index, item) }} className="btn btn-primary"><FaRegEdit /></button>
              {editIndexNumber === index && (
                <div className="row" style={{ margin: '1em 0' }}>
                  <input placeholder='Edited Category Name' data-testid={`editCategoryInput-${index}`} type='text' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                  <button id={index} data-testid={`editCategoryButton-${index}`} onClick={() => { editCategoryHandler(index, item) }} className="btn btn-primary" style={{ margin: '0.5em 0' }}>Edit Category</button>
                </div>
              )}
            </div>
          </div>
        )
      })}
      <div className="row">
        <div className="col">
          <input type='text' placeholder='New Category' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </div>
        <div className="col">
          <button data-testid='addCategoryButton' onClick={addCategoryHandler} className="btn btn-primary">Add Category</button>
        </div>
      </div>
    </div>
  )
}
export default Categories