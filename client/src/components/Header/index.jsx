import { Link } from 'react-router-dom';
import loginImage from '../../../public/button-images/login.png';

const Header = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link className="text-light" to="/">
          <h1 className="m-0">Finance Fusion</h1>
        </Link>
        <p className="m-0">Money is the root of all success!!!</p>
        <Link to="/login"><img src={loginImage} style={{ width: '25%', height: 'auto' }}
/></Link>
      </div>
    </header>
  );
};

export default Header;