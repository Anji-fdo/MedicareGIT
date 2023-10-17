<<<<<<< HEAD
import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import MemberForm from "./MemberForm";
import { GetAllMembers } from "../../../apicalls/members";
import { DeleteMember } from "../../../apicalls/members";
//import moment from "moment";
//import Issues from "./Issues";
//import IssueForm from "./IssueForm";

function Members() {
  const [formType, setFormType] = useState("add");
  const [selectedMember, setSelectedMember] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]); // Changed state name
  const [openMemberForm, setOpenMemberForm] = React.useState(false);
  const [openIssuesForm, setOpenIssuesForm] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = React.useState([]);
  const dispatch = useDispatch();
  

  const getMembers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMembers();
      dispatch(HideLoading());
      if (response.success) {
        setMembers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredMembers([...members]); // Set the filtered members to all members
    } else {
      const filtered = members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredMembers(filtered); // Set the filtered members based on the query
    }
  };

  const deleteMember = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMember(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getMembers();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Member",
      dataIndex: "image",
      render: (image) => <img src={image} alt="member" width="60" height="60" />,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <i
            class="ri-delete-bin-5-line"
            onClick={() => deleteMember(record._id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setFormType("edit");
              setSelectedMember(record);
              setOpenMemberForm(true);
            }}
          ></i>
    
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
      <div className="col-3">
        <form>
          <div className="p-1 bg-light d-flex shadow-sm mb-4">
            <div className="input-group">
              <input
                type="search"
                placeholder="Search"
                aria-describedby="button-addon1"
                className="form-control border-0 bg-light"
                style={{ width: '200px' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-dark"
              >
                Search
              </button>
              <Button
          title="Add member"
          onClick={() => {
            setFormType("add");
            setSelectedMember(null);
            setOpenMemberForm(true);
          }}
        />
            </div>
          </div>
        </form>
      </div>
        
      </div>

      <Table columns={columns} dataSource={members} className="mt-1" />

      {openMemberForm && (
        <MemberForm
          open={openMemberForm}
          setOpen={setOpenMemberForm}
          reloadMembers={getMembers}
          formType={formType}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      )}
    </div>
  );
}

export default Members;
=======
import React, { useEffect } from 'react';
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link , useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
// import { useDispatch} from "react-redux";


function Register() {

    const navigate = useNavigate();
    //const dispatch = useDispatch();
    const onFinish = async (values) => {
        //console.log("Success:",values);
        try {
            //dispatch(ShowLoading());
            const response = await RegisterUser(values);
            //dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
            }
            else {
                message.error(response.message);
            }

        } catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);
        }
    };

  useEffect(() => {
      const token = localStorage.getItem("token");
      if ( token ){
        window.location.href = "/";
      }
    }, []);

    return (
        <div className="h-screen bg-primary flex items-center justify-center">
            <div className="authentication-form bg-white p-3 rounded">
                <h1 className="text-secondary text-2xl font-bold mb-1">
                    REGISTER
                </h1>

                <Form layout="vertical" onFinish={onFinish} >
                    <Form.Item
                        label="Name"
                        name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                    >
                        <input type="text" placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                    >
                        <input type="email" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                    >
                        <input type="number" placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    >
                        <input type="password" placeholder="Password" />
                    </Form.Item>
                    <div className="text-center mt-2 flex flex-col gap-1">
                        <Button title="Register" type="submit" />
                        <Link to="/" className="text-primary text-sm underline">
                            Already have an account? Click Here To Login
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
>>>>>>> d8ce0ccf985fa86dfffc3a4deeb63f9ddf892d8e
