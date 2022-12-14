import React from 'react';
import bemCssModules from 'bem-css-modules';
import {Link} from 'react-router-dom'
import { default as AsideMenuStyles } from "../AsideMenu.module.scss";

interface UserInterface {
  isUserLogged: boolean;
  budget: number
}

const style = bemCssModules(AsideMenuStyles);

const UserMenu = ({isUserLogged, budget}: UserInterface) => {
  return (
    <>
      <p className={style('title')}>Panel uzytkownika</p>
      <nav>
        <ul>
          <li className={style('link')}>
            <Link to="/">Kursy w sprzedazy</Link>
          </li>
          {isUserLogged && <li className={style('link')}><Link to="/my-courses">Moje zakupione kursy</Link></li>}
        </ul>
      </nav>
      <div>{`Stan konta: ${budget}`}</div>
    </>
  );
};

export default UserMenu;