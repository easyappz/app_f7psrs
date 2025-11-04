import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page" data-easytag="id1-react/src/pages/NotFound.jsx">
      <div className="mx-auto mt-24 max-w-md text-center" data-easytag="id2-react/src/pages/NotFound.jsx">
        <h1 className="text-5xl font-bold text-brand-900" data-easytag="id3-react/src/pages/NotFound.jsx">404</h1>
        <p className="mt-4 text-brand-600" data-easytag="id4-react/src/pages/NotFound.jsx">Страница не найдена</p>
        <Link to="/" className="btn-primary mt-6 inline-block" data-easytag="id5-react/src/pages/NotFound.jsx">На главную</Link>
      </div>
    </div>
  );
};

export default NotFound;
