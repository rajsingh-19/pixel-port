import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Photos from "./Components/Photos";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  } 
  
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Photos userquery={searchQuery} />
    </div>
  );
}

export default App;
