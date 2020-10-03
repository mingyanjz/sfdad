import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Order from './components/OrderComponents/Order';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>

      {/* <Order />
      <GMap /> */}
    </div>
  );

}

export default App;