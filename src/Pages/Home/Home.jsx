import React from 'react';

import Header from '../../Components/Header/Header';
import Banner from '../../Components/Banner/Banner';

import Posts from '../../Components/Posts/Posts';
import Footer from '../../Components/Footer/Footer';

function Home({setSearch, search}) {
  return (
    <div className="homeParentDiv">
      <Header setSearch={setSearch} />
      <Banner />
      <Posts  search={search} />
      <Footer />
    </div>
  );
}

export default Home;
 