import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CoursesStyles } from "./Courses.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import Course from '../Course';


const style = bemCssModules(CoursesStyles);

const Courses = () => {
  const { courses } = useContext(StoreContext) as CoursesContextType;
  
  const coursesElements = courses.map(course => <Course key={course.id} {...course} />);

  return (
    <section>
      <h2 className={style('title')}>Kursy w sprzedazy</h2>
      <ul className={style('list')}>
        {coursesElements}
      </ul>
    </section>
  );
};

export default Courses;