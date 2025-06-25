import React from "react";
import { useUser } from "../features/user/context/UserContext";
import HeaderLogged from "../features/navegaciónInicial/components/header/HeaderLogged";
import { Outlet } from "react-router-dom";
import Header from "../features/navegaciónInicial/components/header/header";

const AppHeader: React.FC = () => {
  const { user } = useUser()
  return user ? <HeaderLogged /> : <Header />;
};


export function UsuarioLayout(){
    return(
        <div>
            <AppHeader />
            <main>
                <Outlet /> {/* Aqui es donde se renderizan las rutas hijas */}
            </main>
        </div>
    )
}

