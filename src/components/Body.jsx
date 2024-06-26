import React from 'react';
import Browse from './Browse';
import Login from './Login';
import ErrorPage from './ErrorPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/browse',
            element: <Browse />,
            errorElement: <ErrorPage />,
        },
    ]);

    return (
        <>
            <RouterProvider router={appRouter} />
        </>
    );
};

export default Body;
