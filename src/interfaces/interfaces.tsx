export interface CoursesInterface {
  authors: string[];
  id: string;
  img: string;
  isUserContext?: boolean;
  price: number;
  title: string;
}

export interface UserInterface {
  accessLevel: number;
  budget: number;
  courses: string[];
  login: string;
  password: string

}

export type UserType = any;

export type CoursesContextType = {
  courses: CoursesInterface[];
  setCourses?: any;
  user: UserInterface;
  setUser?: any;
};

export interface StoreProviderInterface {
  children: JSX.Element | JSX.Element[];
}