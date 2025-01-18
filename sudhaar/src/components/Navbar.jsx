import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../src/assets/sudhaarlogo1.png';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/home">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <ul>
        <li><Link to="/home" className={styles.removea}>HOME</Link></li>
        <li><Link to="/predict" className={styles.removea}>PREDICT</Link></li>
        <li><Link to="/aboutus" className={styles.removea}>WHAT WE DO</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
