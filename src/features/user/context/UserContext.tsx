import React, { createContext, useContext, useState, useEffect } from 'react';

interface DataUsuario {
  Nombres: string;
  Apellidos: string;
  Correo: string;
  Telefono: string;
  Direccion: string;
  FechaNacimiento: string;
  Contrasenia: string;
  Rol: number;
  EstadoAcceso: boolean;
}

interface Usuario {
  IdUsuario: number;
  DataUsuario: DataUsuario;
}

interface UserContextType {
  user: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const USER_KEY = 'salonverde_user';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // El usuario se mantiene en memoria y en localStorage mientras la pestaña esté abierta.
  const [user, setUser] = useState<Usuario | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = (usuario: Usuario) => setUser(usuario);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
