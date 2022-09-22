import  {useContext, useState} from 'react';
import bemCssModules from 'bem-css-modules';
import { useNavigate } from 'react-router-dom';

import { default as CourseStyles } from "./Course.module.scss";
import { CoursesInterface } from '../../interfaces/interfaces';
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import WarningDialog from '../WarningDialog/WarningDialog';
import request from '../../helpers/request';

const style = bemCssModules(CourseStyles);

const Course = ({ authors, id, img, price, title }: CoursesInterface) => {
  const { setUser, user } = useContext(StoreContext) as CoursesContextType;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalWarning, setModalWarning] = useState<string>('')
  const navigate = useNavigate();

  const allAuthors = authors?.join(', ');
  const isUserLogged = Boolean(user);

  const shouldBeByButtonVisible = isUserLogged;

  const handleOnClose = () => setIsModalOpen(false);

  const handleOncClick = async () => {
    try { 
      const { data, status } = await request.patch(
        '/users',
        {
          login: user.login,
          courseId: id,
        }
      );
      console.log(status)
      if (status === 200) {
        const courses = data.user.courses;
        const courseId = courses?.filter((course: any) => course === id);
        if (!!courseId) {
          setIsModalOpen(true);
          setModalWarning("Kurs juz został zakupiony.");
        };
      };
      if (status === 202) {
          setIsModalOpen(true);
          setUser(data.user);
          setModalWarning("Brawo! Własnie kupiłeś kurs.");
      };
      if (status === 403) {
        setIsModalOpen(true);
        setModalWarning("Nie masz wystarczających funduszy! Doładuj konto");
      }
    } catch (error) {
      setIsModalOpen(true);
        setModalWarning("Wystąpił nieoczekiwany błąd.");
    }
  }
  return (
    <li>
    <article className={style()}>
      <h3 className={style('title')}>{title}</h3>
      <img className={style('image')} alt={title} src={`${process.env.PUBLIC_URL}/${img}`} />
      <p className={style('price')}>Koszt kursu: {price}zł</p>
      <p className={style('authors')}>Autorzy kursu: {allAuthors}</p>
      {shouldBeByButtonVisible && <button onClick={handleOncClick}>Zakup ten kurs</button>}
      </article>
      <WarningDialog handleOnClose={handleOnClose} isModalOpen={isModalOpen}>
        <h4>{modalWarning}</h4>
      </WarningDialog>
    </li> 
  );
};

export default Course