import React from 'react';

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import BlogLayout from './layouts/BlogLayout';
import TaskLayout from './layouts/TaskLayout';
import NewsLayout from './layouts/NewsLayout';
import EventLayout from './layouts/EventLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs/Blogs';
import Tasks from './pages/Tasks/Tasks';
import News from './pages/News/News';
import Event from './pages/Events/Events';
import Home from './pages/Home';
import Create from './pages/Blogs/Create';
import BlogDetail from './components/Blog/BlogDetail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='blogs' element={<BlogLayout />}>
          <Route index element={<Blogs />} />
          <Route path='create' element={<Create />} />
          <Route path=':blogId' element={<BlogDetail />} />
        </Route>
        <Route path='tasks' element={<TaskLayout />}>
          <Route index element={<Tasks />} />
        </Route>
        <Route path='news' element={<NewsLayout />}>
          <Route index element={<News />} />
        </Route>
        <Route path='events' element={<EventLayout />}>
          <Route index element={<Event />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;