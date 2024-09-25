import darkicon from '../../assets/dark-mode.png'
import { useTheme } from '../../Context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <div className="darkmode" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
      <img src={darkicon} width="30px" alt="Toggle Dark Mode" />
      {/* You can optionally add an accessible label */}
     
    </div>
  );
};

export default ThemeToggle; 