import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "../apicalls/users";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      validateUserToken();
    }
  }, []);

  // useEffect(() => {
  //   console.log("login")
  //   if (user) {
      
  //     if (user.role === "manager") {
  //       navigate("/manager"); 
  //     } else if (user.role === "member") {
  //       navigate("/memberHr");
  //     } else if( user.role === "sal") {
  //       navigate("/salaryHR")
  //     } else if( user.role === "salv") {
  //       navigate("/salaryV")
  //     }
  //   }
  // }, [user, navigate]);

  return (
    <div>
      {user && (
        <div className="p-1">
          <div className="header p-2 bg-primary flex justify-between rounded items-center">
            <h1
              className="text-2xl text-white font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              MediCare
            </h1>

            <div className="flex items-center gap-1 bg-white p-1 rounded ml">
              <i className="ri-shield-user-line "></i>
              <span
                className="text-sm underline"
                onClick={() => navigate("/profile")}
              >
                {user.name.toUpperCase()}
              </span>
              <i
                className="ri-logout-box-r-line ml-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              ></i>
            </div>
          </div>

          <div className="content mt-1">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ProtectedRoute;