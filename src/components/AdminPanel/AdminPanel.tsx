import React, {useContext, useState} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as AdminPanelStyles } from "./AdminPanel.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import CourseDetails from './subcomponents/CourseDetails';
import CoursePopup from './subcomponents/CoursePopup';



const style = bemCssModules(AdminPanelStyles);
 
const AdminPanel = () => {
  const { courses, user } = useContext(StoreContext) as CoursesContextType;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  

  const hidePopup = (e:any)  => {
    e.preventDefault(); 
    setIsOpenPopup(false);
  }

  console.log(courses)

  const coursesElelements = courses?.map(course => course && <CourseDetails key={course.id} {...course} />)
 
  return (
    <section >
      <h2 >Twoje wykupione kursy</h2>
      <ul >
        {coursesElelements}
      </ul>
      <button >Dodaj nowy kurs</button>
      <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
    </section> 
  );
};

export default AdminPanel;