/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import ModalDialog from "./Components/ModalDialog";
import UserTable from "./Components/Table";
import { supabase } from "./createClient";

const App = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    mobile_no: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState("create");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase.from("users_info").select("*");
    setUsers(data);
  };

  async function handleDelete(userID) {
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
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
    setErrors(newErrors)
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formValues);
    if (Object.keys(newErrors).length === 0) {
      if (mode === "create") {
        createUser();
      } else {
        updateUser();
      }
      setShowModal(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCreate = () => {
    setFormValues({
      id: "",
      name: "",
      mobile_no: "",
      email: "",
      address: "",
    });
    setMode("create");
    setShowModal(true);
  };

  const createUser = async () => {
    await supabase.from("users_info").insert({
       mobile_no: formValues.mobile_no,
      email: formValues.email,
      address: formValues.address,
    });
    fetchUsers();
  };

  const updateUser = async () => {
    await supabase.from("users_info").update(formValues).eq("id", formValues.id);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormValues(user);
    setMode("update");
    setShowModal(true);
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
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">CURD Operation</Navbar.Brand>
          <Button variant="primary"  onClick={handleCreate}>
            Create a New User
          </Button>
        </Container>
      </Navbar>

      <ModalDialog
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        formValues={formValues}
        handleInputChange={handleInputChange}
        errors={errors}
        mode={mode}
      />

      <UserTable
        allusers={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default App;
