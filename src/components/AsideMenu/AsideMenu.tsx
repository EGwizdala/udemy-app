import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as AsideMenuStyles } from "./AsideMenu.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import { ADMIN_TYPE, USER_TYPE } from '../../constant/constant';
import UserMenu from './subcomponents/UserMenu';
import AdminMenu from './subcomponents/AdminMenu';

const style = bemCssModules(AsideMenuStyles);

const AsideMenu = () => {
  const { user } = useContext(StoreContext) as CoursesContextType;
  const admineMenuComponent = user?.accessLevel === ADMIN_TYPE ?
    <>
      <UserMenu budget={user.budget} isUserLogged={Boolean(user)} />
      <AdminMenu />
    </>
    : null
  const userMenuComponent = user?.accessLevel === USER_TYPE ? <UserMenu budget={user.budget} isUserLogged={Boolean(user)} /> : null
  
  return (
    <section className={style()}>
      <div className={style('nav-wrapper')}>
      {userMenuComponent}
      {admineMenuComponent}
      </div>
    </section>
  );
};

export default AsideMenu;