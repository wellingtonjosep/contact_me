import "./styles.css"
import logo from "../../assets/logo.png"
  
export default function Header() {

  return (
      <header className="header">
        <img className="logo-header" src={logo} alt="" />
        <button className="button-header">SAIR</button>
      </header>
  );
}