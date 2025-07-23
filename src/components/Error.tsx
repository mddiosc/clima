import { ErrorProps } from "../types";

const Error = ({ message }: ErrorProps): JSX.Element => {
  return <p className="red darken-4 error">{message}</p>;
};

export default Error;
