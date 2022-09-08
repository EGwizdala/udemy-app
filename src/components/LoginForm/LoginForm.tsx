import React from 'react';
import bemCssModules from 'bem-css-modules';

import { default as LoginFormStyles } from "./LoginForm.module.scss";

const style = bemCssModules(LoginFormStyles);

const LoginForm = () => {
  return (
    <Modal>
      <form className={style()} method="post" onSubmit={}>
        <div className={style("row")}>
          <label>
            <input type="text"/>
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <input type="password"/>
          </label>
        </div>
        <div className={style("row")}>
          <button type="submit"></button>
          <button type="button"></button>
        </div>
      </form>
     </Modal>
   )
};

export default LoginForm;