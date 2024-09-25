import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { FirebaseContext } from "../../Context/Context";
import ThemeToggle from '../../Components/ThemeToggle/ThemeToggle'
import { ThemeProvider ,useTheme } from '../../Context/ThemeContext';

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(FirebaseContext); // Ensure user is from context

  const { isDarkTheme } = useTheme();

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);


  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/login'); // Navigate to login after logout
    } catch (error) {
      console.error("Logout failed:", error); // Handle any logout errors
    }
  };

  const handleCreateClick = () => {
    if (user) {
      navigate('/create'); // Navigate to create if logged in
    } else {
      navigate('/login'); // Navigate to login if not logged in
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input
            className="inputSearch"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>

        <div className="language">
          <ThemeToggle/>
        </div>
        
        <div className="loginPage">
          {user ? (
            <span
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </span>
          ) : (
            <span
              onClick={() => navigate('/login')} 
              style={{ cursor: 'pointer' }}
            >
              Login
            </span>
          )}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <span
              onClick={handleCreateClick} // Use the new function for navigation
              style={{ cursor: 'pointer' }}
            >
              <SellButtonPlus />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
