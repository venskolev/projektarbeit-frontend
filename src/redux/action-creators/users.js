import axios from 'axios';
require('dotenv').config()

const apiConection = process.env.REACT_APP_API_CONNECT;
// const apiConection = "https://projekt-backend.herokuapp.com";
console.log(apiConection);

const setUserListStart = () => {
  return {
    type: 'SET_USER_LIST_START',
    payload: { error: null, deleteError: null } 
  };
};

const setUserListSuccess = data => {

  return {
    type: 'SET_USER_LIST_SUCCESS',
    payload: { users: data }
  };
};

const setUserListError = err => {
  return {
    type: 'SET_USER_LIST_ERROR',
    payload: { error: err }
  };
};
export const setUserList = () => dispatch => {
  
  dispatch(setUserListStart());
  axios
    .get(apiConection + "/api/users")
    .then(res => dispatch(setUserListSuccess(res.data)))
    .catch(err => dispatch(setUserListError(err)));
};

const createUserStart = () => {
  return {
    type: 'CREATE_USER_START',
    payload: {}
  };
};

const createUserSuccess = userData => {
  return {
    type: 'CREATE_USER_SUCCESS',
    payload: userData
  };
};

const createUserError = err => {
  return {
    type: 'CREATE_USER_ERROR',
    payload: { error: err }
  };
};

export const createUser = userData => dispatch => {
  dispatch(createUserStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .post(`${apiConection}/api/users`, userData, config)
    .then(res => dispatch(createUserSuccess(res.data)))
    .catch(err => dispatch(createUserError(err)));
};

export const initUser = () => dispatch => {
  dispatch({
    type: 'INIT_USER',
    payload: {
      firstName: '',
      lastName: '',
      sex: '',
      age: '',
      jobTitle: '',
      image: '',
      createSuccess: false,
      error: null
    }
  });
};

const editUserStart = () => {
  return {
    type: 'EDIT_USER_START',
    payload: {}
  };
};

const editUserSuccess = userData => {
  return {
    type: 'EDIT_USER_SUCCESS',
    payload: userData
  };
};

const editUserError = err => {
  return {
    type: 'EDIT_USER_ERROR',
    payload: { error: err }
  };
};

export const editUser = (userData, history, initEdit) => dispatch => {
  dispatch(editUserStart());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios
    .put(`${apiConection}/api/users${userData.id}`, userData, config)
    .then(res => {
      dispatch(editUserSuccess(res.data));
      history.push('/');
      initEdit();
    })
    .catch(err => dispatch(editUserError(err)));
};

export const initEdit = () => dispatch => {
  dispatch({
    type: 'INIT_EDIT',
    payload: {
      firstName: '',
      lastName: '',
      sex: '',
      age: '',
      jobTitle: '',
      image: '',
      editSuccess: false,
      error: null
    }
  });
};

const deleteUserStart = () => {
  return {
    type: 'DELETE_USER_START',
    payload: {}
  };
};

const deleteUserSuccess = () => {
  return {
    type: 'DELETE_USER_SUCCESS'
  };
};

const deleteUserError = err => {
  return {
    type: 'DELETE_USER_ERROR',
    payload: { deleteError: err }
  };
};

export const deleteUser = id => dispatch => {
  dispatch(deleteUserStart());
  axios
    .delete(`${apiConection}/api/users${id}`)
    .then(() => {
      dispatch(deleteUserSuccess());
      dispatch(setUserList());
    })
    .catch(err => dispatch(deleteUserError(err)));
};

const getUserStart = () => {
  return {
    type: 'GET_USER_START',
    payload: {}
  };
};

const getUserSuccess = userData => {
   console.log(userData);
  return {
    type: 'GET_USER_SUCCESS',
    payload: { user: userData }
  };
};

const getUserError = err => {
  return {
    type: 'GET_USER_ERROR',
    payload: { error: err }
  };
};

export const getUser = (id, setUserData) => dispatch => {
  dispatch(getUserStart());
  axios
    .get(`${apiConection}/api/users${id}`)
    .then(res => {
      const { firstName, lastName, sex, age, jobTitle, image } = res.data;
      const userData = { firstName, lastName, sex, age, jobTitle, image };
      dispatch(getUserSuccess(userData));
      setUserData(userData);
    })
    .catch(err => dispatch(getUserError(err)));
};