import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page" data-easytag="id1-react/src/pages/NotFound.jsx">
      <div className="mx-auto max-w-md" data-easytag="id2-react/src/pages/NotFound.jsx">
        <div className="card text-center" data-easytag="id3-react/src/pages/NotFound.jsx">
          <h1 className="mb-2 text-3xl font-semibold" data-easytag="id4-react/src/pages/NotFound.jsx">404</h1>
          <p className="mb-4 text-sm text-brand-700" data-easytag="id5-react/src/pages/NotFound.jsx">Страница не найдена</p>
          <Link to="/" className="btn-primary" data-easytag="id6-react/src/pages/NotFound.jsx">Домой</Link>
        </div>
      </div>
    </section>
  );
}
