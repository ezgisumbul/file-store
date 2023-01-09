import { Link } from 'react-router-dom';
import './index.scss';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">FileStore</Link>
    </nav>
  );
};

export default Navbar;
