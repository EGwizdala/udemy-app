import React, {useContext, useState} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as CoursePopupStyles } from "./CoursePopup.module.scss";
import { StoreContext } from '../../../store/StoreProvider';
import { CoursesContextType  } from '../../../interfaces/interfaces';
import request from "../../../helpers/request";
import Modal from '../../Modal/Modal';

interface CoursePopupInterface {
  hidePopup: (e:React.MouseEvent) => void ;
  isEditMode?: boolean;
  isOpenPopup: boolean;
  authors?: string[];
  id?: string;
  img?: string;
  isUserContext?: boolean;
  price?: number;
  title?: string;
}

const style = bemCssModules(CoursePopupStyles);


const CoursePopup = ({ authors = [], hidePopup, isEditMode = true, isOpenPopup, id, img = '', price = 0, title = ''}:CoursePopupInterface) => {
  const [formAuthors, setFormAuthors] = useState(authors);
  const [formAuthor, setAuthor] = useState('');
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext) as CoursesContextType;

  const handleOnChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
  const handleOnChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => setFormImg(e.target.value);
  const handleOnChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    setFormPrice(numValue);
  };
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setFormTitle(e.target.value);

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    const courseObject = {
      authors: formAuthors,
      id,
      img: formImg,
      price: Number(formPrice),
      title: formTitle,
    };

    if (isEditMode) {
      const { data, status } = await request.put('/courses', courseObject);
      if (status === 202) {
        setCourses(data.course);
      };
    } else {
      const { data, status } = await request.post('/courses', courseObject);

      if (status === 201) {
        setCourses(data.courses)
      }
    };

    hidePopup(e); 
  }

  const addAuthor = (e:React.MouseEvent) => {
    e.preventDefault();
    setFormAuthors(prev => [...prev, formAuthor]);
    setAuthor('');
  };

  const deleteAuthor = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    };
    if (e.target.dataset.author) {
      const authorToDelete = e.target.dataset.author;
      setFormAuthors(prev => prev.filter(author => author !== authorToDelete))
    };
  };

  const authorsElelements = formAuthors.map(author => (
    <li key={author}>
      <p>{author}</p>
      <button data-author={author} onClick={deleteAuthor}>Usuń</button>
    </li>
  ));

  const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs';

  return (
    <Modal handleOnClose={hidePopup} isOpen={ isOpenPopup}>
      <div className={style()}>
        <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
          <div className={style('form-row')}>
            <label>
              Author:
              <input className={style('input')} onChange={handleOnChangeAuthor } type="text" value={formAuthor} />
              <button onClick={addAuthor}>Dodaj autora</button>
            </label>
          </div>
          <div className={style('form-row')}>
            Obrazek:
              <input className={style('input')} onChange={handleOnChangeImg } type="text" value={formImg}/>
          </div>
          <div className={style('form-row')}>
            Cena:
              <input className={style('input')} onChange={handleOnChangePrice } type="number" value={formPrice}/>
          </div>
          <div className={style('form-row')}>
            Tytuł
              <input className={style('input')} onChange={handleOnChangeTitle } type="text" value={formTitle}/>
          </div>
          <button type="submit">{correctLabel}</button>
          <button onClick={hidePopup} type="button">Anuluj</button>

        </form>
        <p>Lista autorów</p>
        <ul>
          {authorsElelements}
        </ul>

      </div>

    </Modal>
  );
};

export default CoursePopup;