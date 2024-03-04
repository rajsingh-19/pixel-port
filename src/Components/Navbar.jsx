import { useState, useEffect } from "react";

const Navbar = ({onSearch}) => {
  const [searchInp, setSearchInp] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchInp(value);
    handleSearchInput(value);
  };
    
  let timerID;
  const debounce = (cb, delay) => {
    return function (...args) {
      clearTimeout(timerID);
      timerID = setTimeout(() => {
        cb(...args)
      }, delay);
    }
  };
  let handleSearchInput;
  useEffect(() => {
    handleSearchInput = debounce(()=> {
      onSearch(searchInp);
    }, 500)
    handleSearchInput();
    return () => {
      clearTimeout(timerID);
    };
  }, [searchInp, onSearch])

  return (
      <>
        <nav className="navbar">
            <div className="navbarLogo">Pixel Port</div>
            <div className="searchContainer">
                <input placeholder="Search photos here.." name="searchInput" value={searchInp} onChange={handleInputChange} />
                <span className="material-symbols-outlined">Search</span>
            </div>
        </nav>
      </>
  );
};

export default Navbar;