import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCrearUsuario from "../../components/modalCrearUsuario/ModalCrearUsuario";
import "./UsuariosPage.css";
import { obtenerUsuarios } from "../../services/obtenerUsuarios";
import { Usuario } from "../../services/clases/classUsuario";

const roles = ["TODOS", "Cajero", "Cliente", "Admin"];
const estados = ["TODOS", "Activo", "Inactivo"];
const PAGE_SIZE = 10;

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroRol, setFiltroRol] = useState("TODOS");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    obtenerUsuarios()
      .then(setUsuarios)
      .finally(() => setLoading(false));
  }, []);

  // Filtrado simple
  const usuariosFiltrados = usuarios.filter(u =>
    (filtroRol === "TODOS" || u.getRol() === filtroRol) &&
    (filtroEstado === "TODOS" || u.getEstado() === filtroEstado) &&
    (u.getNombreCompleto().toLowerCase().includes(busqueda.toLowerCase()) ||
      u.getCorreo().toLowerCase().includes(busqueda.toLowerCase()))
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / PAGE_SIZE);
  const usuariosPagina = usuariosFiltrados.slice((pagina - 1) * PAGE_SIZE, pagina * PAGE_SIZE);

  const handleRowClick = (id: number) => {
    navigate(`/admin/usuarios/${id}`);
  };

  return (
    <div className="usuarios-container">
      <h1 className="usuarios-title">GESTIÓN DE USUARIOS</h1>
      <div className="usuarios-filtros">
        <select value={filtroRol} onChange={e => setFiltroRol(e.target.value)}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
          {estados.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className="usuarios-btn-add" title="Crear usuario" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>
      <div className="usuarios-table-wrapper">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="usuarios-table-empty">
                  Cargando usuarios...
                </td>
              </tr>
            ) : usuariosPagina.length === 0 ? (
              <tr>
                <td colSpan={5} className="usuarios-table-empty">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuariosPagina.map(u => (
                <tr key={u.IdUsuario} onClick={() => handleRowClick(u.IdUsuario)}>
                  <td>{u.getNombreCompleto()}</td>
                  <td>{u.getCorreo()}</td>
                  <td>{u.getRol()}</td>
                  <td>{u.getEstado()}</td>
                  <td className="usuarios-table-arrow">›</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="usuarios-paginacion">
        <button disabled={pagina === 1} onClick={() => setPagina(1)}>{'|<'}</button>
        <button disabled={pagina === 1} onClick={() => setPagina(p => Math.max(1, p - 1))}>{'<'}</button>
        <span>{pagina} / {totalPaginas}</span>
        <button disabled={pagina === totalPaginas} onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}>{'>'}</button>
        <button disabled={pagina === totalPaginas} onClick={() => setPagina(totalPaginas)}>{'>|'}</button>
      </div>
      <ModalCrearUsuario open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default UsuariosPage;
