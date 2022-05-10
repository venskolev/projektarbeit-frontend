import React from 'react';

const Table = ({
  queryCur,
  sortType,
  users,
  actAttr,
  activePage,
  activeUser,
  handleDelete,
  handleEdit,
  handleSort
}) => {
  const displayUser = (
    queryCur,
    sortType,
    users,
    actAttr,
    activePage
  ) => {
    return activeUser(queryCur, sortType, users, actAttr).slice(
      (activePage - 1)
    );
  };

  const showOrder = attr => {
    return (
      actAttr === attr &&
      (sortType === 1 ? (
        <i className='fas fa-arrow-up sort' />
      ) : (
        sortType === 2 && <i className='fas fa-arrow-down sort' />
      ))
    );
  };

  return (
    <div>
      <table className='table table-sm'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col' id='firstName' onClick={e => handleSort(e)}>
              First Name {showOrder('firstName')}
            </th>
            <th scope='col' id='lastName' onClick={e => handleSort(e)}>
              Last Name {showOrder('lastName')}
            </th>
            <th scope='col' id='sex' onClick={e => handleSort(e)}>
              Sex {showOrder('sex')}
            </th>
            <th scope='col' id='age' onClick={e => handleSort(e)}>
              Age {showOrder('age')}
            </th>
            <th scope='col' id='jobTitle' onClick={e => handleSort(e)}>
              Job Title {showOrder('jobTitle')}
            </th>
            <th scope='col' id='image' onClick={e => handleSort(e)}>
              Bild {showOrder('image')}
            </th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>

        <tbody>
          {displayUser(
            queryCur,
            sortType,
            users,
            actAttr,
            activePage,
            activeUser
          ).map(user => {
            console.log(user);
            return (
              <tr className='user' key={user._id}>
                
                <td>
                  <div className='table-data'>{user.firstName}</div>
                </td>
                <td>
                  <div className='table-data'>{user.lastName}</div>
                </td>
                <td>
                  <div className='table-data'>{user.sex}</div>
                </td>
                <td>
                  <div className='table-data'>{user.age}</div>
                </td>
                <td>
                  <div className='table-data'>{user.jobTitle}</div>
                </td>
                <td>
                  <div className='table-data'>
                    <img src='{user.image}' alt='Bild'></img></div>
                </td>
                <td>
                  <button
                    className='btn btn-outline-primary btn-sm'
                    onClick={e => handleEdit(user._id)}
                  >
                    <i className='fas fa-pen' /> Edit
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-outline-danger btn-sm'
                    onClick={e => handleDelete(user._id)}
                  >
                    <i className='fas fa-trash' /> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
