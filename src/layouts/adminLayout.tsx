import logo from '../assets/logo.webp'
import { Link, Outlet, useLocation } from "react-router-dom";
import coffee from "../assets/iconos/coffee.svg"
import log_out from "../assets/iconos/log-out.svg"
import notebook from "../assets/iconos/notebook.svg"
import user from "../assets/iconos/user.svg"
import './adminLayout.css'

export function AdminLayout(){
    const location = useLocation(); // Devuelve la ruta actual del user Bv
    
    return (
        <>
            <div className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <Link to="/">
                        <img className="admin-logo-image" src={logo} alt="Salar Verde Logo" />
                    </Link>
                </div>
                <div className="admin-sidebar-nav">
                    <ul className="admin-nav-list">
                        <li className="admin-nav-item">
                            <Link 
                                to="/admin/reservas" 
                                className={`admin-nav-link ${location.pathname === '/admin/reservas' ? 'active' : ''}`}
                            >
                                <img src={notebook} className="admin-nav-icon" alt="" />
                                <span className='admin-item-text'>Calendario de reservas</span>
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link 
                                to="/admin/usuarios" 
                                className={`admin-nav-link ${location.pathname === '/admin/usuarios' ? 'active' : ''}`}
                            >
                                <img src={user} className="admin-nav-icon" alt="" />
                                <span className='admin-item-text'>Usuarios</span>
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link 
                                to="/admin/alimentos" 
                                className={`admin-nav-link ${location.pathname === '/admin/alimentos' ? 'active' : ''}`}
                            >
                                <img src={coffee} className="admin-nav-icon" alt="" />
                                <span className='admin-item-text'>Alimentos</span>
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link 
                                to="/admin/log_out" 
                                className={`admin-nav-link ${location.pathname === '/admin/log_out' ? 'active' : ''}`}
                            >
                                <img src={log_out} className="admin-nav-icon" alt="" />
                                <span className='admin-item-text'>Cerrar sesión</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </>
        
    );
}