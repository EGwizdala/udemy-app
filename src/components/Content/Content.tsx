import React, { useContext } from 'react';
import {  Routes, Route } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { default as ContentStyles } from "./Content.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import { ADMIN_TYPE, USER_TYPE } from '../../constant/constant';
import Courses from '../Courses';
import UserCourses from '../UserCourses'

const style = bemCssModules(ContentStyles);


const Content = () => {
  const { user } = useContext(StoreContext) as CoursesContextType;

  const isUserLogged = Boolean(user);
  const isUser = user?.accessLevel === USER_TYPE
  const isAdmin = user?.accessLevel === ADMIN_TYPE

  return (
    <main className={style()}>
      <Routes>
        <Route path='/' element={<Courses/>}  />
        {isUserLogged && isUser && <Route path="/my-courses" element={<UserCourses />}/>}
        {isUserLogged && isAdmin &&
          <>
            <Route path="/my-courses" element={<p>Moje kursy</p>} />  
            <Route path="/manage-courses" element={<p>Zarządzanie kursami</p>} />
          </>
        }
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </main>
  );
};

export default Content;