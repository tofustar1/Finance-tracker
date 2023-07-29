import React from 'react';
import Toolbar from "../Toolbar/Toolbar";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
      <>
        <header className="header">
          <Toolbar/>
        </header>
       <main className="container">
         {children}
       </main>
      </>
  );
};

export default Layout;