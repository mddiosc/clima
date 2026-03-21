import { HeaderProps } from "../types";

const Header = ({ title }: HeaderProps): React.JSX.Element => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-white text-2xl font-semibold tracking-tight">
            {title}
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Header;
