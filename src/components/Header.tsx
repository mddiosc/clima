import { HeaderProps } from "../types";

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="#!" className="brand-logo">
          {title}
        </a>
      </div>
    </nav>
  );
};

export default Header;
