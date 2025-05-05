import { Link } from "react-router-dom";
import { RiAddBoxLine } from "react-icons/ri";
import { LuMoon, LuSun } from "react-icons/lu";
import { useContext } from "react";
import { ThemeContext } from "../layouts/RootLayout";

const Navbar = ({ handleTheme }) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <>
      <header>
        <h1>
          <Link to="/">Product Store</Link>
        </h1>
        <nav className="actions">
          <Link className="btn create-btn" to="/create">
            <RiAddBoxLine /> Add Product
          </Link>

          <button className="btn theme" onClick={() => handleTheme()}>
            <span>{theme === "light" ? <LuSun /> : <LuMoon />}</span>
            <span className="lg">{theme === "light" ? "Light" : "Dark"}</span>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
