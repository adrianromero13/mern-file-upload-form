import React from 'react';
import { useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux'

import {
  LOADED,
  INIT,
  PENDING,
  FILES_UPLOADED,
  UPLOAD_ERROR,
} from '../constants/uploadConstants'

const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'idle',
}

// set up reducer
const uploadReducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return { ...state, files: action.files, status: LOADED }
    default:
      return state;
  }
}

const useFileHandlers = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const onChange = (e) => {
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files);
      const files = arrFiles.map((file, index) => {
        const src = window.URL.createObjectURL(file);
        return {
          file,
          id: index,
          src
        }
      })
      dispatch({ type: 'load', files });
    }
  }
  return {}
}

const onSubmit = useCallback((e) => {
  e.preventDefault()
  if (state.files.length) {
    dispatch({ type: 'submit' });
  } else {
    window.alert('You do not have any files loaded');
  }
},
  [state.files.length],
)

export default useFileHandlers;
