// import { supabase } from "./createClient";
// import { useState, useEffect } from "react";
// import {
//   Modal,
//   Table,
//   ButtonGroup,
//   Form,
//   Button,
//   Navbar,
//   Container,
// } from "react-bootstrap";

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [formuser, setFormuser] = useState({
//     name: "",
//     mobile_no: "",
//     email: "",
//     address: "",
//   });
//   const [updateUser, setUpdateuser] = useState({
//     id: "",
//     name: "",
//     mobile_no: "",
//     email: "",
//     address: "",
//   });
//   const capitalizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };
//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [errors, setErrors] = useState({})

//   const handleClose = () => {
//     setShow(false);
//     setFormuser({
//       name: "",
//       email: "",
//       mobile_no: "",
//       address: "",
//     });
//   };
//   const handleClose1 = () => {
//     setShow1(false);
//   };

//   const handleShow = () => setShow(true);
//   const handleShow1 = () => setShow1(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   async function fetchUsers() {
//     const { data } = await supabase.from("users_info").select("*");
//     setUsers(data);
//     console.log(data);
//   }

//   let isUpdate = true;
//   const handleInputChange = (event, isUpdate) => {
//     const { id, value } = event.target;
//     if (isUpdate) {
//       setUpdateuser({ ...updateUser, [id]: value });
//     } else {
//       setFormuser({ ...formuser, [id]: value });
//     }
//   };
  
//   const handleSubmit=(event)=>{
//     event.preventDefault();
//     const newErrors = validateForm(formuser);
//     if(Object.keys(newErrors).length === 0){
//       createUsers()
//       console.log("Form submitted:",formuser)
//     }else{
//       setErrors(newErrors);
//     }
//   }

//   const validateForm = (data) =>{
//     let errors = {};
//     if(!data.name.trim()){
//       errors.name="Name is required";
//     }else if(!isValidname(data.name)){
//       errors.name= "Name is invalid";
//     }
//     if (!data.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!isValidEmail(data.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!data.mobile_no.trim()) {
//       errors.mobile_no = "Mobile no is required";
//     } else if (!isValidNumber(data.mobile_no)){
//       errors.mobile_no = "Mobile no is invalid";
//     }
//     if(!data.address.trim()){
//       errors.address = "Address is required"
//     }
//     return errors; 
//   }

//   const isValidEmail = (email) => {
//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const isValidname = (name)=>{
//     const nameRegex = /^[A-Za-z]+$/;
//     return nameRegex.test(name)

//   }
//   const isValidNumber =(mobile_no)=>{
//     const mobileRegex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
//     return mobileRegex.test(mobile_no)
//   }

//   async function createUsers() {
//     await supabase.from("users_info").insert({
//       name: formuser.name,
//       mobile_no: formuser.mobile_no,
//       email: formuser.email,
//       address: formuser.address,
//     });
//     handleClose();
//     fetchUsers();
//   }

//   async function deleteUsers(userID) {
//     const { data, error } = await supabase
//       .from("users_info")
//       .delete()
//       .eq("id", userID);
//     if (error) {
//       console.log(error);
//     }
//     if (data) {
//       console.log(data);
//     }
//     fetchUsers();
//   }

//   function displayUser(userID) {
//     users.map((user) => {
//       if (user.id == userID) {
//         setUpdateuser({
//           id: user.id,
//           name: user.name,
//           mobile_no: user.mobile_no,
//           email: user.email,
//           address: user.address,
//         });
//       }
//     });
//   }

//   async function updateInfo(userID) {
//     const { data, error } = await supabase
//       .from("users_info")
//       .update({
//         id: updateUser.id,
//         name: updateUser.name,
//         mobile_no: updateUser.mobile_no,
//         email: updateUser.email,
//         address: updateUser.address,
//       })
//       .eq("id", userID);
//     if (error) {
//       console.log(error);
//     }
//     if (data) {
//       console.log(data);
//     }
//     handleClose1();
//     fetchUsers();
//   }
//   return (
//     <>
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">CURD Operation</Navbar.Brand>
//           <Button variant="primary" onClick={handleShow}>
//             Create a New User
//           </Button>
//         </Container>
//       </Navbar>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter the Details to Save</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter a Name"
//                 value={capitalizeFirstLetter(formuser.name)}
//                 onChange={handleInputChange}
//                 autoFocus
//                 required
//               /> {errors.name && <span  className="text-danger">{errors.name}</span>}
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="name@example.com"
//                 value={formuser.email}
//                 onChange={handleInputChange}
//                 autoFocus
//               /> {errors.email && <span className="text-danger">{errors.email}</span>}
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="mobile_no">
//               <Form.Label>Mobile No.</Form.Label>
//               <Form.Control
//                 type="tel"
//                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//                 placeholder="Enter the mobile no."
//                 value={formuser.mobile_no}
//                 onChange={handleInputChange}
//                 required
//                 autoFocus
//               />{errors.mobile_no && <span className="text-danger">{errors.mobile_no}</span>}
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="address">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter the Address"
//                 value={formuser.address}
//                 onChange={handleInputChange}
//                 required
//               />{errors.address && <span className="text-danger">{errors.address}</span>}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button
//             type="button"
//             value="Submit"
//             variant="primary"
//             onClick={handleSubmit}
//           >
//             Create User
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Table bordered hover size="sm" responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Mobile</th>
//             <th>EmailID</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user.id}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.mobile_no}</td>
//               <td>{user.email}</td>
//               <td>{user.address}</td>
//               <td>
//                 <ButtonGroup>
//                   <Button
//                     variant="success"
//                     onClick={() => {
//                       handleShow1();
//                       displayUser(user.id);
//                     }}
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     variant="outline-danger"
//                     onClick={() => {
//                       deleteUsers(user.id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </ButtonGroup>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* {form 2} */}
//       <Modal show={show1} onHide={handleClose1}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit the Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//               required
//                 type="text"
//                 placeholder="Enter a Name"
//                 defaultValue={capitalizeFirstLetter(updateUser.name)}
//                 onChange={(e) => handleInputChange(e, isUpdate)}
//                 autoFocus
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 required
//                 placeholder="name@example.com"
//                 defaultValue={updateUser.email}
//                 onChange={(e) => handleInputChange(e, isUpdate)}
//                 autoFocus
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="mobile_no">
//               <Form.Label>Mobile No.</Form.Label>
//               <Form.Control
//                 type="tel"
//                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//                 required
//                 placeholder="Enter the mobile no."
//                 defaultValue={updateUser.mobile_no}
//                 onChange={(e) => handleInputChange(e, isUpdate)}
//                 autoFocus
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="address">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 required
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter the Address"
//                 defaultValue={updateUser.address}
//                 onChange={(e) => handleInputChange(e, isUpdate)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose1}>
//             Close
//           </Button>
//           <Button
//             type="button"
//             value="Submit"
//             variant="primary"
//             onClick={() => updateInfo(updateUser.id)}
//           >
//             Save Edit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default App;

import { supabase } from "./createClient";
import { useState, useEffect } from "react";
import {
  Modal,
  Table,
  ButtonGroup,
  Form,
  Button,
  Navbar,
  Container,
} from "react-bootstrap";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formuser, setFormuser] = useState({
    name: "",
    mobile_no: "",
    email: "",
    address: "",
  });
  const [updateUser, setUpdateuser] = useState({
    id: "",
    name: "",
    mobile_no: "",
    email: "",
    address: "",
  });
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setFormuser({
      name: "",
      email: "",
      mobile_no: "",
      address: "",
    });
  };
  const handleClose1 = () => {
    setShow1(false);
  };

  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users_info").select("*");
    setUsers(data);
    console.log(data);
  }

  let isUpdate = true;
  const handleInputChange = (event, isUpdate) => {
    const { id, value } = event.target;
    let newErrors = { ...errors };
    if (id === 'name') {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else {
        delete newErrors.name;
      }
    } else if (id === 'email') {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(value)) {
        newErrors.email = "Email is invalid";
      } else {
        delete newErrors.email;
      }
    } else if (id === 'mobile_no') {
      if (!value.trim()) {
        newErrors.mobile_no = "Mobile no is required";
      } else if (!isValidNumber(value)){
        newErrors.mobile_no = "Mobile no is invalid";
      } else {
        delete newErrors.mobile_no;
      }
    } else if (id === 'address') {
      if (!value.trim()) {
        newErrors.address = "Address is required";
      } else {
        delete newErrors.address;
      }
    }
    setErrors(newErrors);
    if (isUpdate) {
      setUpdateuser({ ...updateUser, [id]: value });
    } else {
      setFormuser({ ...formuser, [id]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm(formuser);
    if (Object.keys(newErrors).length === 0) {
      createUsers();
      console.log("Form submitted:", formuser);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = (data) =>{
    let errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (!isValidName(data.name)) {
      errors.name = "Name is invalid";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.mobile_no.trim()) {
      errors.mobile_no = "Mobile no is required";
    } else if (!isValidNumber(data.mobile_no)){
      errors.mobile_no = "Mobile no is invalid";
    }
    if (!data.address.trim()) {
      errors.address = "Address is required";
    }
    return errors; 
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const isValidNumber = (mobile_no) => {
    const mobileRegex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    return mobileRegex.test(mobile_no);
  };

  async function createUsers() {
    await supabase.from("users_info").insert({
      name: formuser.name,
      mobile_no: formuser.mobile_no,
      email: formuser.email,
      address: formuser.address,
    });
    handleClose();
    fetchUsers();
  }

  async function deleteUsers(userID) {
    const { data, error } = await supabase
      .from("users_info")
      .delete()
      .eq("id", userID);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
    fetchUsers();
  }

  function displayUser(userID) {
    users.map((user) => {
      if (user.id == userID) {
        setUpdateuser({
          id: user.id,
          name: user.name,
          mobile_no: user.mobile_no,
          email: user.email,
          address: user.address,
        });
      }
    });
  }
  async function updateInfo(userID) {
    const newErrors = validateForm(updateUser);
    if (Object.keys(newErrors).length === 0) {
      const { data, error } = await supabase
        .from("users_info")
        .update({
          id: updateUser.id,
          name: updateUser.name,
          mobile_no: updateUser.mobile_no,
          email: updateUser.email,
          address: updateUser.address,
        })
        .eq("id", userID);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
      handleClose1();
      fetchUsers();
    } else {
      setErrors(newErrors);
    }
  }
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">CURD Operation</Navbar.Brand>
          <Button variant="primary" onClick={handleShow}>
            Create a New User
          </Button>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the Details to Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Name"
                value={capitalizeFirstLetter(formuser.name)}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                required
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={formuser.email}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                required
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile_no">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter the mobile no."
                value={formuser.mobile_no}
                onChange={(e) => handleInputChange(e)}
                autoFocus
                required
              />
              {errors.mobile_no && <span className="text-danger">{errors.mobile_no}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the Address"
                value={formuser.address}
                onChange={(e) => handleInputChange(e)}
                required
              />
              {errors.address && <span className="text-danger">{errors.address}</span>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="button"
            value="Submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </Modal.Footer>
      </Modal>

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
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.mobile_no}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <ButtonGroup>
                  <Button
                    variant="success"
                    onClick={() => {
                      handleShow1();
                      displayUser(user.id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      deleteUsers(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit the Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a Name"
                defaultValue={capitalizeFirstLetter(updateUser.name)}
                onChange={(e) => handleInputChange(e, isUpdate)}
                autoFocus
                required
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={updateUser.email}
                onChange={(e) => handleInputChange(e, isUpdate)}
                autoFocus
                required
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile_no">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter the mobile no."
                defaultValue={updateUser.mobile_no}
                onChange={(e) => handleInputChange(e, isUpdate)}
                autoFocus
                required
              />
              {errors.mobile_no && <span className="text-danger">{errors.mobile_no}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the Address"
                defaultValue={updateUser.address}
                onChange={(e) => handleInputChange(e, isUpdate)}
                required
              />
              {errors.address && <span className="text-danger">{errors.address}</span>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose1}>
            Close
          </Button>
          <Button
            type="button"
            value="Submit"
            variant="primary"
            onClick={() => updateInfo(updateUser.id)}
          >
            Save Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
