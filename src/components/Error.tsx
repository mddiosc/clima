import { ErrorProps } from "../types";

const Error = ({ message }: ErrorProps): JSX.Element => {
  return (
    <div className="bg-red-600 text-white p-4 rounded-lg text-center mt-4 shadow-md">
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Error;
