import {Link, Navigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./userContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:8080/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    setRedirect(true);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={logout}>Logout ({username})</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      {redirect && (
        <>
          {setRedirect(false)}
          <Navigate to={'/'} />
        </>
      )}
    </header>
  );
}