import { Link } from "react-router-dom";

const Nav = () => {
  return(
    <>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </>
  )
}

export default Nav;