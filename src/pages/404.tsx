import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
   return (
      <div className="text-center mt-12 h-full">
         <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
         <p className="mt-4">
            Sorry, the page you are looking for does not exist.
         </p>
         <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
         Go back to Home
         </Link>
      </div>
   );
};

export default NotFoundPage;