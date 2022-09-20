import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import { useNavigate } from 'react-router-dom';

import { default as CourseStyles } from "./Course.module.scss";
import { CoursesInterface } from '../../interfaces/interfaces';
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import request from '../../helpers/request';


const style = bemCssModules(CourseStyles);

const Course = ({ authors, id, isUserContext, img, price, title }: CoursesInterface) => {
  const { setUser, user } = useContext(StoreContext) as CoursesContextType;
  const navigate = useNavigate();

  const allAuthors = authors?.join(', ');
  const isUserLogged = Boolean(user);

  console.log(isUserLogged)
  console.log(isUserContext)

  const shouldBeByButtonVisible = isUserLogged && !isUserContext;

  const handleOncClick = async () => {
    try { 
      const { data, status } = await request.patch(
        '/users',
        {
          login: user.login,
          courseId: id,
        }
      );

      console.log(data);
      console.log(status)
      
      if (status === 200) {
        console.log(data.user)
        setUser(data.user);
        navigate("/my-courses");
    }

    } catch (error) {
      console.warn(error)
    }
  }
  
  return (
    <li>
    <article className={style()}>
      <h3 className={style('title')}>{title}</h3>
      <img className={style('image')} alt={title} src={img} />
      <p className={style('price')}>Koszt kursu: {price}zł</p>
      <p className={style('authors')}>Autorzy kursu: {allAuthors}</p>
      {shouldBeByButtonVisible && <button onClick={handleOncClick}>Zakup ten kurs</button>}
    </article>
    </li> 
  );
};

export default Course