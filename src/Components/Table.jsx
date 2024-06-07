/* eslint-disable react/prop-types */

import { Table, Button } from "react-bootstrap";

const UserTable = ({ allusers, handleEdit, handleDelete }) => {
  return (
    <Table bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Mobile</th>
          <th>EmailID</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allusers.map((user, index) => (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.mobile_no}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>
              <Button variant="success" onClick={() => handleEdit(user)}>
                Update
              </Button>
              <Button variant="danger" onClick={() => handleDelete(user.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
