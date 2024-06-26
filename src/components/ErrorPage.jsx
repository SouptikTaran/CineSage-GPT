import React from 'react';
import Header from './Header';
import { BG_LOGO } from '../utils/constants';

const ErrorPage = () => {
  return (
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute inset-0 -z-10">
        <img className="object-cover w-full h-full" src={BG_LOGO} alt="Background" />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-black text-white p-10 rounded-md">
          <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg">Sorry, an unexpected error has occurred.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
