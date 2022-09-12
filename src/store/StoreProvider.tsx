import React, { createContext, useEffect, useState } from 'react';
import { request } from '../helpers/request';
import {CoursesInterface, CoursesContextType, StoreProviderInterface, UserInterface } from '../interfaces/interfaces'




export const StoreContext = createContext<CoursesContextType | null>(null);

const StoreProvider = ({ children }: StoreProviderInterface) => {
  const [user, setUser] = useState<UserInterface>({
    accessLevel: NaN,
    budget:NaN,
    courses: [],
    login: "",
    password: "",
  });
  const [courses, setCourses] = useState<CoursesInterface[]>([]);

  const fetchData = async () => {
    const { data } = await request.get('/courses');
    setCourses(data.courses)
  }

  console.log(user)

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <StoreContext.Provider value={{ courses, setCourses, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;