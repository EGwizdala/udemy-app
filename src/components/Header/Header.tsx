import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import { default as HeaderStyles } from './Header.module.scss';
import LoginForm from "../LoginForm";

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user, setUser } = useContext(StoreContext) as CoursesContextType;

  const handleOnClose = () => setIsModalOpen(false);

  const handleOnClick = () => {
    if (Boolean(user)) {
      setUser(null)
    } else {
      setIsModalOpen(true)
    }
  }; 

  const setPropertyLabel = Boolean(user) ? 'Wyloguj się' : 'Zaloguj się';

  return (
    <header className={style()}>
      <div className={style('logo-wraper')}>
        <h1 className={style('title')}>Super kursy dla programistów</h1>
        <button onClick={handleOnClick}>{setPropertyLabel}</button>
        <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
      </div>
    </header>
  )
};

export default Header;