import React from 'react';
import Introduction from './Introduction';
// import Articles from './Articles';
import Portfolio from './Portfolio';
import Collaboration from './Collaboration';
import Contact from './Contact';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Introduction />
      <Portfolio />
      {/* <Articles /> */}
      <Collaboration />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
