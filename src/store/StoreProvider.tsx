import React, { createContext, useEffect, useState } from 'react';
import { request } from '../helpers/request'


export interface CoursesInterface {
  id: number;
  title: string;
  description: string;
}

export interface UserInterface {
  name: string;
}

export type UserType = string;

export type CoursesContextType = {
  courses: CoursesInterface[];
  setCourse?: () => void;
  user: UserType;
  setUser?: () => void;
};

interface StoreProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const StoreContext = createContext<CoursesContextType | null>(null);

const StoreProvider = ({ children }: StoreProviderInterface) => {
  const [user, setUser] = useState<UserType>('');
  const [courses, setCourses] = useState<CoursesInterface[]>([
    {
      id: 1,
      title: 'post 1',
      description: 'this is a description',
    },
    {
      id: 2,
      title: 'post 2',
      description: 'this is a description',
    },
  ]);

  const fetchData = async () => {
    const { data } = await request.get('/courses')
    
    setCourses(data.courses)
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <StoreContext.Provider value={{ courses, user }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;