import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { update } from "../slices/auth";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    else {
      const id = currentUser.id;
      dispatch(update({ id }))
      .unwrap()
      .then(() => {
      });
    }
    // eslint-disable-next-line
  }, [currentUser]);

  

  return (
    <>
      {
        currentUser && <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          {!currentUser.roles.includes("ROLE_ADMIN") && <><strong>Balance:</strong> {currentUser.balance}</>}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>
      }
    </>
  );
};

export default Profile;
