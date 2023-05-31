import './Auth.scss';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuthLogin, fetchAuthOfCookies, setToken, setAuthData } from '../../redux/actions/auth';
import { MyInput } from '../../Components/UI';

export default function Auth() {

  const dispatch = useDispatch();






  const { login, userId, loaded, pass } = useSelector(({ auth }) => auth);
  const setLogin = (login) => dispatch(setAuthData({ login }));
  const setPass = (pass) => dispatch(setAuthData({ pass }));


  const sendAuthForm = () => dispatch(fetchAuthLogin(login, pass));



  useEffect(() => {
    dispatch(fetchAuthOfCookies());
  }, []);



  return (
    <div className="auth_page">
      {
        !loaded
          ?
          <div>
            authorization...
          </div>
          :
          <div>
            <h2>Admin Panel</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <MyInput
                value={login} setValue={setLogin} pl='login'
              />
              <br />

              <MyInput
                value={pass} setValue={setPass} pl='pass' type="password"
              />
              <br />
              <button onClick={sendAuthForm}>Login</button>

            </form>
          </div>
      }



    </div>
  );
}
