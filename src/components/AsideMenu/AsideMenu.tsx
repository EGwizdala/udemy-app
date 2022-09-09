import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as AsideMenuStyles } from "./AsideMenu.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import { ADMIN_TYPE } from '../../constant/constant';
import UserMenu from './subcomponents/UserMenu';
import AdminMenu from './subcomponents/AdminMenu';


const style = bemCssModules(AsideMenuStyles);



const AsideMenu = () => {
  const { user } = useContext(StoreContext) as CoursesContextType;

  const admineMenuComponent = user?.accesLevel === ADMIN_TYPE ? <AdminMenu/> : null
  
  return (
    <section className={style()}>
      <UserMenu isUserLogged={Boolean(user)} />
      {admineMenuComponent}
    </section>
  );
};

export default AsideMenu;