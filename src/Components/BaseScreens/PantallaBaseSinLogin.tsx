// src/components/BaseScreens/PantallaBase.tsx 
// -> Indica solamente la ruta del archivo 
import React from "react";//necesario para definir componentes con JSX
//import { Link } from "react-router-dom"; // Para navegar en el navbar
import styles from "./PantallaBaseSinLogin.module.css";//para usar los estilos definidos en ese archivo .css
//
import { Link } from "react-router-dom"; // librería de enrutamiento

//esto signfica que define los tipos de datos esperados como props (propiedades) que puede recibir el componente
interface BaseScreenProps {
  children: React.ReactNode;//esto  lo hace obligatorio, es lo que se va a renderizar dentro del componente
}
//define el componente funcional BaseScreen como un componente funcional, usando la interfaz BaseScreenProps
//se extrae los props: children y backgroundImage
export const PantallaBase: React.FC<BaseScreenProps> = ({ children }) => {
    return (
        <div className={styles.baseScreen}>
            {/* Esta es la barra de navegacion superior*/}
            <nav className={styles.navbar}>


                 {/* Esta es la seccion de la imagen*/}
                <div className={ styles.navSection + ' ' + styles.branding } >
                    <img src="src/assets/logo.webp" alt="Logo de la empresa" className={styles.brandLogo}/>
                </div>

                
                <div className={styles.navSection}>NOSOTROS</div>
                
                <div className={styles.navSection}>GALERÍA</div>
                
                <div className={styles.navSection}>MENÚS</div>
              
                <div className={styles.navSection}>CONTACTO</div>
              
                <div className={styles.navSection + ' ' + styles.reservar}>RESERVAR</div>
                
                {/* Enlace al login */}
                <Link to="/login" className={styles.navSection + ' ' + styles.iniciarSesion}>
                    INICIAR SESIÓN
                </Link>
            </nav>
            {/* Contenido principal del documento (<main></main>) */}
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
};