export interface CoursesInterface {
  id: number;
  title: string;
  description: string;
}

export interface UserInterface {
  name: string;
}

export type UserType = any;

export type CoursesContextType = {
  courses: CoursesInterface[];
  setCourses?: (any);
  user: UserType;
  setUser?: any;
};

export interface StoreProviderInterface {
  children: JSX.Element | JSX.Element[];
}