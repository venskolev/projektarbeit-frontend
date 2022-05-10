import React, { useState, useEffect } from 'react';
import { setUserList } from '../redux/action-creators/users';
import { connect } from 'react-redux';
import { initUser, initEdit, deleteUser } from '../redux/action-creators/users';
import { Loading, Alert } from './utils';
import Table from './table';

const Home = ({
  users,
  setUserList,
  history,
  initUser,
  initEdit,
  deleteUser,
  isLoading,
  error,
  deleteError
}) => {
  useEffect(() => {
    initUser();
    initEdit();
    setUserList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
 
  const [query, setQuery] = useState(''); 
  const [actAttr, setActAttr] = useState(''); 
  const [sortType, setSortType] = useState(0); 
  const [queryCur, setQueryCur] = useState(''); 
  const [activePage, setActivePage] = useState(1); 

  const handleChange = e => {
    if (e.target.id === 'search') {
      setQuery(e.target.value);
    }
  };

  const handleCreate = e => {
    history.push('/createuser');
  };

  const handleSearch = e => {
    e.preventDefault();
    setActivePage(1);
    setQueryCur(query);
  };

  const handleEdit = id => {
    history.push(`/edituser/${id}`);
  };

  const handleDelete = id => {
    deleteUser(id);
  };


  const handleSort = e => {
    if (e.target.id === actAttr) {
      setSortType((sortType + 1) % 3);
    } else {
      setSortType(1);
    }
    setActAttr(e.target.id);
  };

  const sortUserByAttr = (users, attribute) => {
    switch (attribute) {
      case 'firstName':
        return [...users].sort((a, b) =>
          a.firstName.toLowerCase() > b.firstName.toLowerCase()
            ? 1
            : a.firstName.toLowerCase() === b.firstName.toLowerCase()
            ? a.lastName.toLowerCase() > b.lastName.toLowerCase()
              ? 1
              : a.lastName.toLowerCase() === b.lastName.toLowerCase()
              ? a.age > b.age
                ? 1
                : a.age === b.age
                ? a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()
                ? 1
                : a.jobTitle.toLowerCase() === b.jobTitle.toLowerCase()
                ? a.sex.toLowerCase().slice(0, 1) >
                  b.sex.toLowerCase().slice(0, 1)
                  ? 1
                  : -1
                : -1
              : -1
            : -1
          : -1
        );

      case 'lastName':
        return [...users].sort((a, b) =>
          a.lastName.toLowerCase() > b.lastName.toLowerCase()
            ? 1
            : a.lastName.toLowerCase() === b.lastName.toLowerCase()
            ? a.firstName.toLowerCase() > b.firstName.toLowerCase()
              ? 1
              : a.firstName.toLowerCase() === b.firstName.toLowerCase()
              ? a.age > b.age
                ? 1
                : a.age === b.age
                ? a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()
                ? 1
                : a.jobTitle.toLowerCase() === b.jobTitle.toLowerCase()
                ? a.sex.toLowerCase().slice(0, 1) >
                  b.sex.toLowerCase().slice(0, 1)
                  ? 1
                  : -1
                : -1
              : -1
            : -1
          : -1
        );

      case 'sex':
        return [...users].sort((a, b) =>
          a.sex.toLowerCase().slice(0, 1) > b.sex.toLowerCase().slice(0, 1)
            ? 1
            : a.sex.toLowerCase().slice(0, 1) ===
              b.sex.toLowerCase().slice(0, 1)
            ? a.firstName.toLowerCase() > b.firstName.toLowerCase()
              ? 1
              : a.firstName.toLowerCase() === b.firstName.toLowerCase()
              ? a.lastName.toLowerCase() > b.lastName.toLowerCase()
                ? 1
                : a.lastName.toLowerCase() === b.lastName.toLowerCase()
                ? a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()
                ? 1
                : a.jobTitle.toLowerCase() === b.jobTitle.toLowerCase()
                ? a.age > b.age
                  ? 1
                  : -1
                : -1
              : -1
            : -1
          : -1
        );

      case 'age':
        return [...users].sort((a, b) =>
          a.age > b.age
            ? 1
            : a.age === b.age
            ? a.firstName.toLowerCase() > b.firstName.toLowerCase()
              ? 1
              : a.firstName.toLowerCase() === b.firstName.toLowerCase()
              ? a.lastName.toLowerCase() > b.lastName.toLowerCase()
                ? 1
                : a.lastName.toLowerCase() === b.lastName.toLowerCase()
                ? a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()
                ? 1
                : a.jobTitle.toLowerCase() === b.jobTitle.toLowerCase()
                ? a.sex.toLowerCase().slice(0, 1) >
                  b.sex.toLowerCase().slice(0, 1)
                  ? 1
                  : -1
                : -1
              : -1
            : -1
          : -1
        );
        case 'jobTitle':
          return [...users].sort((a, b) =>
            a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()
              ? 1
              : a.jobTitle.toLowerCase() === b.jobTitle.toLowerCase()
              ? a.firstName.toLowerCase() > b.firstName.toLowerCase()
              ? 1
              : a.firstName.toLowerCase() === b.firstName.toLowerCase()
              ? a.lastName.toLowerCase() > b.lastName.toLowerCase()
                ? 1
                : a.lastName.toLowerCase() === b.lastName.toLowerCase()
                ? a.age > b.age
                  ? 1
                  : a.age === b.age
                  ? a.sex.toLowerCase().slice(0, 1) >
                    b.sex.toLowerCase().slice(0, 1)
                    ? 1
                    : -1
                  : -1
                : -1
              : -1
            : -1
          );
        

      default:
        return [...users];
    }
  };


  const searchUser = (users, queryCur) => {
    return users.filter(
      user =>
        user.firstName
          .toLowerCase()
          .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
        user.lastName
          .toLowerCase()
          .indexOf(queryCur.toString().toLowerCase()) !== -1 ||
        user.sex.toLowerCase().indexOf(queryCur.toString().toLowerCase()) !==
          -1 ||
        user.age.toString().indexOf(queryCur.toString()) !== -1 ||
        user.jobTitle
          .toLowerCase()
          .indexOf(queryCur.toString().toLowerCase()) !== -1
    );
  };

  const selectSort = (sortType, users, actAttr) => {
    switch (sortType) {
      case 1:
        return sortUserByAttr(users, actAttr);
      case 2:
        return [...sortUserByAttr(users, actAttr)].reverse();
      default:
        return users;
    }
  };

  const activeUser = (queryCur, sortType, users, actAttr) => {
    if (queryCur) {
      const searchedUsers = searchUser(users, queryCur);
      return selectSort(sortType, searchedUsers, actAttr);
    } else {
      return selectSort(sortType, users, actAttr);
    }
  };

  if (
    activeUser(queryCur, sortType, users, actAttr).length > 0 &&
    activeUser(queryCur, sortType, users, actAttr).length ===
      (activePage - 1) 
  ) {
    // if it is this page's last user, after delete, back to prev page
    // empty list stay in 1st page
    setActivePage(activePage - 1);
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light mb-2'>
        <strong className='navbar-brand'><h1 className='display-3 danger'>PERSONAL RECRUITING</h1></strong>
      <div className='flex gap-3'>
        <form className='form-inline p-5' onSubmit={e => handleSearch(e)}>
          {' '}
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            id='search'
            value={query}
            onChange={e => handleChange(e)}
          />
          {/* <input type='submit' value='Search' /> */}
       

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> </form>

        <button
          className='btn btn-outline-success ml-5'
          onClick={e => handleCreate()}
        >
          <i className='fas fa-user' /> Create new User
        </button>
        </div>
      </nav>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <Table
              queryCur={queryCur}
              sortType={sortType}
              users={users}
              actAttr={actAttr}
              activeUser={activeUser}
              activePage={activePage}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleSort={handleSort}
            />
            {error && <Alert waring='server' item='get' />}
            {deleteError && <Alert waring='server' item='delete' />}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading,
    error: state.users.error,
    deleteError: state.users.deleteError
  };
};

const mapStateToDispatch = dispatch => {
  return {
    setUserList: () => dispatch(setUserList()),
    initUser: () => dispatch(initUser()),
    initEdit: () => dispatch(initEdit()),
    deleteUser: id => dispatch(deleteUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Home);