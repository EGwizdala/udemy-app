import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as AdmiPanelStyles } from "./AdmiPanel.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import Course from '../Course';



const style = bemCssModules(AdmiPanelStyles);

const AdmiPanel = () => {
  
  const { courses, user } = useContext(StoreContext) as CoursesContextType;

  const buyedCourses = courses.filter(course => user.courses.includes(course.id)).map(course => <Course isUserContext={true} key={course.id} {...course} />);
 
  return (
    <section className={style()}>
      <h2 className={style('title')}>Twoje wykupione kursy</h2>
      <ul className={style('list')}>
        {buyedCourses}
      </ul>
    </section> 
  );
};

export default AdmiPanel;