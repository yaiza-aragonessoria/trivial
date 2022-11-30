import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <h1>Trivial</h1>
      </div>

      <nav>
        <ul>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
