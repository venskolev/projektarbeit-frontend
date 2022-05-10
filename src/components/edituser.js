import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { getUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import { Loading, Alert } from './utils';
// import axios from 'axios';

const EditUser = ({
  setAlert,
  editUser,
  alertContent,
  history,
  match,
  isLoading,
  isGetting,
  initEdit,
  getUser,
  user,
  error,
  getError
}) => {
  const id = match.params.userId;
  const stdSex = ['f', 'm', 'female', 'male'];

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    age: '',
    jobTitle: ''
  });


  useEffect(() => {
    getUser(id, setUserData);

  }, [getUser, id]);

  const { firstName, lastName, sex, age, jobTitle } = userData;

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
    if (firstName === 0) {
      setAlert('firstName pls!');
    } else {
      editUser(
        { id, firstName, lastName, sex, age, jobTitle },
        history,
        initEdit
      ); 
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  const disableEdit = (
    firstName,
    lastName,
    sex,
    age,
    jobTitle,
    user
  ) => {
    return (
      !(
        firstName &&
        lastName &&
        sex &&
        age &&
        jobTitle &&
        /^[a-zA-Z]+$/.test(firstName) &&
        /^[a-zA-Z]+$/.test(lastName) &&
        stdSex.indexOf(sex.toLowerCase()) !== -1 &&
        !isNaN(age) &&
        Math.abs(parseInt(age)).toString() === age.toString()
      ) ||
      (user.firstName === firstName &&
        user.lastName === lastName  &&
        user.sex === sex &&
        user.age === age &&
        user.jobTitle === jobTitle)
    );
  };
  return (
    <div>
      {
      isLoading || isGetting ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Edit User</div>
          <div className='container'>
            <form onSubmit={e => handleEdit(e)}>
              <small className='form-text text-muted'>
                Blank with * is reuiqred
              </small>
              <div className='form-group'>
                * First Name:{' '}
                <input
                  className='form-control'
                  name='firstName'
                  value={firstName}
                  onChange={e => handleChange(e)}
                  placeholder='firstName'
                />
                {!firstName && <Alert warning='empty' item='firstName' />}
                {firstName && !/^[a-zA-Z]+$/.test(firstName) && (
                  <Alert warning='invalid' item='firstName' />
                )}
              </div>
              <div className='form-group'>
                * Last Name:{' '}
                <input
                  className='form-control'
                  name='lastName'
                  value={lastName}
                  onChange={e => handleChange(e)}
                  placeholder='lastName'
                />
                {!lastName && <Alert warning='empty' item='lastName' />}
                {lastName && !/^[a-zA-Z]+$/.test(lastName) && (
                  <Alert warning='invalid' item='lastName' />
                )}
              </div>
              <div className='form-group'>
                * Sex:{' '}
                <input
                  className='form-control'
                  name='sex'
                  value={sex}
                  onChange={e => handleChange(e)}
                  placeholder='sex'
                />
                <small className='form-text text-muted'>
                  Valid inputs are f, m, female, or male, not case sensitive
                </small>
                {!sex && <Alert warning='empty' item='sex' />}
                {sex && stdSex.indexOf(sex.toLowerCase()) === -1 && (
                  <Alert warning='invalid' item='sex' />
                )}
              </div>
              <div className='form-group'>
                * Age:{' '}
                <input
                  className='form-control'
                  name='age'
                  value={age}
                  onChange={e => handleChange(e)}
                  placeholder='age'
                />
                {!age && <Alert warning='empty' item='age' />}
                {age &&
                  (isNaN(age) ||
                    Math.abs(parseInt(age)).toString() !== age.toString()) && (
                    <Alert warning='invalid' item='age' />
                  )}
              </div>
              <div className='form-group'>
                * Job Title:{' '}
                <input
                  className='form-control'
                  name='jobTitle'
                  value={jobTitle}
                  onChange={e => handleChange(e)}
                  placeholder='jobTitle'
                />
                <small className='form-text text-muted'>
                  Valid Office position
                </small>
                {!jobTitle && <Alert warning='empty' item='jobTitle' />}
              </div>
              {error && <Alert warning='server' item='edit' />}
              {getError && <Alert warning='server' item='get' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableEdit(
                        firstName,
                        lastName,
                        sex,
                        age,
                        jobTitle,
                        user
                      )
                    }
                  >
                    <i className='fas fa-arrow-down' /> Save Changes
                  </button>
                </div>
                <div className='btn-middle' />

                <div className='btn-right'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <i className='fas fa-arrow-left' /> Back
                  </button>
                </div>
              </div>
            </form>
            <div className='alert-text'>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    editSuccess: state.editUser.editSuccess,
    isLoading: state.editUser.isLoading,
    isGetting: state.getUser.isLoading,
    user: state.getUser.user,
    error: state.editUser.error,
    getError: state.getUser.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: (data, history) => dispatch(editUser(data, history)),
    initEdit: () => dispatch(initEdit()),
    getUser: (id, setUserData) => dispatch(getUser(id, setUserData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
