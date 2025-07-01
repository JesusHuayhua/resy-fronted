import React from "react";

interface ModalMostrarDetalleReservaProps {
  idReserva: string;
  onClose: () => void;
}

const ModalMostrarDetalleReserva: React.FC<ModalMostrarDetalleReservaProps> = ({ idReserva, onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: "32px 24px",
        minWidth: 320,
        minHeight: 120,
        position: "relative",
        boxShadow: "0 4px 24px #0002",
        textAlign: "center"
      }}>
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontSize: 22,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#888"
          }}
          onClick={onClose}
        >×</button>
        <h2 style={{ marginBottom: 18 }}>Detalle de Reserva</h2>
        <div>
          <b>ID Reserva:</b> {idReserva}
        </div>
      </div>
    </div>
  );
};

export default ModalMostrarDetalleReserva;
