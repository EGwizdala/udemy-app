import React, { useContext } from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { default as ContentStyles } from "./Content.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import { ADMIN_TYPE } from '../../constant/constant';

const style = bemCssModules(ContentStyles);


const Content = () => {
  const { user } = useContext(StoreContext) as CoursesContextType;

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accesLevel === ADMIN_TYPE

  return (
    <main className={style()}>
      <Routes>
        <Route path='/' element={<Courses/>}  />
        {isUserLogged && <Route path="/my-courses" element={<p>Moje kursy</p>} />}
        {isAdmin && <Route path="/manage-courses" element={<p>Zarządzanie kursami</p>} />}
        <Navigate to="/" />
      </Routes>
    </main>
  );
};

export default Content;