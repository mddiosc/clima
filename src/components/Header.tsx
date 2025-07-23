import { HeaderProps } from "../types";

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <nav className="bg-sky-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-white text-2xl font-bold">
            {title}
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
