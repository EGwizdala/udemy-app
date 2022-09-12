import React, {useContext, useState} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CourseDetailsStyles } from "./CourseDetails.module.scss";
import { StoreContext } from '../../../store/StoreProvider';
import { CoursesContextType, CoursesInterface } from '../../../interfaces/interfaces';
import request from '../../../helpers/request';

interface CourseDetailsInterface {
  id: string;
  title:string
}

const style = bemCssModules(CourseDetailsStyles);

const CourseDetails = (props:CourseDetailsInterface) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { setCourses } = useContext(StoreContext) as CoursesContextType;
  const { id, title } = props;
  
  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = (e:React.MouseEvent)  => {
    e.preventDefault(); 
    setIsOpenPopup(false);
  }

  const handleDeleteCourse = async () => {
    try {
      const { status } = await request.delete(`/courses/${id}`);

      if (status === 200) {
        setCourses((prev:any) => prev.filter((course:CoursesInterface) => course.id !== id))
      }

    } catch (error) {
      console.log(error)
    }
  }

 
  return (
    <details className={style()}>
      <summary>{title}</summary>
      <button onClick={showPopup}>Edytuj</button>
      <button onClick={handleDeleteCourse}>Usuń</button>
    </details> 
  );
};

export default CourseDetails;