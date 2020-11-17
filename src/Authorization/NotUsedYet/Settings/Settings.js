import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "../../Accounts/Accounts";
import ChangePassword from "../../ChangePassword/ChangePassword";
import ChangeEmail from "../../ChangeEmail/ChangeEmail";

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true);
    });
  }, [getSession]);

  return (
    <div>
      {loggedIn && (
        <>
          <h1>Settings</h1>
          <ChangeEmail />
          <ChangePassword />
        </>
      )}
    </div>
  );
};