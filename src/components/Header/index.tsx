import { useAuth} from "../../providers/AuthProvider";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [buttonOption, setButtonOption] = useState('Entrar');
  const currentRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      setButtonOption('Sair');
    } else {
      setButtonOption('Entrar');
    }
  }, [isAuthenticated]);

  function handleLoginOrLogout() {
    if(currentRef.current) {
      switch(currentRef.current.textContent) {
        case 'Entrar':
            window.location.href = '/login'
            break;
        case 'Sair':
          logout()
          window.location.href = '/login'
      }
    }
  }

  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src="logo.png" alt="" />
      </NavLink>
      <ul>
        <a href="#">
          <li>Sobre nós</li>
        </a>
        <a href="#">
          <li className={styles.list}>Soluções</li>
        </a>
        <a href="#">
          <li className={styles.list}>Carreiras</li>
        </a>
        <a href="#">
          <li className={styles.list}>Treinamentos</li>
        </a>
      </ul>
        <div className={styles.entrar} 
          ref={currentRef}
          onClick={handleLoginOrLogout}
        >
          {buttonOption}
        </div>
    </header>
  );
};
