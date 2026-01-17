import React from "react";
import Categroy from "../components/Categroy";
import Allitems from "../components/Allitems";
import Cuisine from "../components/Cuisine";

const Home = () => {
  return (
    <>
      <Cuisine />
      <Categroy />
      <Allitems />
    </>
  );
};

export default Home;
