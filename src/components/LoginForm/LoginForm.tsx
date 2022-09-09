import React, {useContext, useEffect, useState} from 'react';
import bemCssModules from 'bem-css-modules';
import { default as LoginFormStyles } from "./LoginForm.module.scss";
import { StoreContext } from '../../store/StoreProvider';
import { CoursesContextType } from '../../interfaces/interfaces';
import request from "../../helpers/request"
import Modal from '../Modal';

interface LoginInterface {
  handleOnClose: () => void;
  isModalOpen: boolean;
}

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }: LoginInterface) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validateMessage, setValidateMessage] = useState<string>('');

  const { setUser } = useContext(StoreContext) as CoursesContextType;

  const handleOnChangeLogin = (e:React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
  //ponizej jest ten sam zapis, ale wykonana zostala destrukturyzacja
  const handleOnChangePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value);
  const handleOnCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    handleOnClose();
    
  };

  const resetStateOfInputs = () => {
    setLogin('');
    setPassword('');
    setValidateMessage('');
  }

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, status } = await request.post(
      './users',
      { login, password }
    );

    if (status === 200) {
      setUser(data.user);
      resetStateOfInputs();
      handleOnClose();
    } else {
      setValidateMessage(data.message)
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? <p className={style("validate-message")}>{validateMessage}</p> : null

  return (
    <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} sholudBeCloseOnOutsideClick={true}>
      {validateMessageComponent}
      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style("row")}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            Hasło:
            <input onChange={handleOnChangePassword} type="password" value={password}/>
          </label>
        </div>
        <div className={style("row")}>
          <button type="submit">Zaloguj</button>
          <button onClick={handleOnCloseModal} type="button">Anuluj</button>
        </div>
      </form>
     </Modal>
   )
};

export default LoginForm;