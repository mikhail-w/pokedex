import '../../assets/styles/FlipLogo.css';
import mainLogo from '../../assets/images/flip/logo.png';

function Logo() {
  return (
    <div id="spinner">
      <img className="logo" src={mainLogo} alt="Logo" />
    </div>
  );
}

export default Logo;
