import React, {useContext, useState} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CoursePopupStyles } from "./CoursePopup.module.scss";
import { StoreContext } from '../../../store/StoreProvider';
import { CoursesContextType } from '../../../interfaces/interfaces';

import Modal from '../../Modal/Modal'


const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({ authors = [], hidePopup, isEditMode = true, isOpenPopup, id, img=''}, price=0, title='') => {
  const [formAuthors, setFormAuthors] = useState(authors);
  const [formAuthor, setAuthor] = useState('');
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormProce] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext) as CoursesContextType;

  return (
    <Modal handleOnClose={hidePopup} isOpen={ isOpenPopup}>
      <div className={style()}>
        <form className={style('form')} method="submit">
          <div className={style('form-row')}>
            <label>
              Author:
              <input className={style('input')} type="text"/>
              <button>Dodaj autora</button>
            </label>
          </div>
          <div className={style('form-row')}>
            Obrazek:
              <input className={style('input')} type="text"/>
          </div>
          <div className={style('form-row')}>
            Cena:
              <input className={style('input')} type="number"/>
          </div>
          <div className={style('form-row')}>
            Tytuł
              <input className={style('input')} type="text"/>
          </div>
          <button type="submit"></button>
          <button type="button">Anuluj</button>

        </form>
        <ul>
          <p>Lista autorów</p>
        </ul>

      </div>

    </Modal>
  );
};

export default CoursePopup;