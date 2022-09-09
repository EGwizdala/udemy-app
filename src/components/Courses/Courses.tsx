import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CoursesStyles } from "../Courses.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';


const style = bemCssModules(CoursesStyles);

const Courses = () => {
  const { courses } = useContext(StoreContext) as CoursesContextType;
  

  const coursesElements = courses.map(course => <Course keu={course.id} {...course}/>)

  return (
    <section>
      <h2 className={style('title')}></h2>
      <ul className={style('list')}>
        {coursesElements}
      </ul>
    </section>
  );
};

export default Courses;