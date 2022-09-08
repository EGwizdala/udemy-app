import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext, CoursesContextType } from '../../store/StoreProvider';
import { default as HeaderStyles } from './Header.module.scss';

const style = bemCssModules(HeaderStyles)

const Header = () => {
  const { user, setUser } = useContext(StoreContext) as CoursesContextType;

  const setPropertyLabel = Boolean(user) ? 'Wyloguj się' : 'Zaloguj się';
  return (
    <header className={style()}>
      <div className={style('logo-wrapper')}>
        <h1 className={style('title')}>Super kursy dla programistów</h1>
        <button >{setPropertyLabel}</button>
      </div>
    </header>
  )
}

export default Header;