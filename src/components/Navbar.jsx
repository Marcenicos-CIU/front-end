import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";


const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { searchTag, setSearchTag } = useContext(SearchContext);


  const navigate = useNavigate();
  const location = useLocation();


  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);


  // Limpiar filtro y input al cambiar de ruta
  useEffect(() => {
    setSearchTag("");
    setSearchInput("");
    setSearchVisible(false);
  }, [location.pathname, setSearchTag]);


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };


  const handleChange = (e) => {
    setSearchTag(e.target.value.trim().toLowerCase());
    setSearchInput(e.target.value);
  };


  useEffect(() => {
    if (searchVisible) {
      inputRef.current?.focus();
    }
  }, [searchVisible]);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold" to="/">
          UnaHur <span className="text-muted">Anti-Social Net</span>
        </Link>


        <div className="d-flex justify-content-center align-items-center" style={{ flex: 1 }}>
          {searchVisible ? (
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                ref={inputRef}
                className="form-control"
                placeholder="Buscar por tag..."
                value={searchInput}
                onChange={handleChange}
                onBlur={() => setSearchVisible(false)}
                style={{ width: "250px" }}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearchVisible(false)}
                aria-label="Ocultar buscador"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-secondary"
              onClick={() => setSearchVisible(true)}
              aria-label="Mostrar buscador"
            >
              <i className="bi bi-search" />
            </button>
          )}
        </div>


        <div>
          <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
            {user && user._id ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger ms-2">
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
