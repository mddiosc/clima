import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { ErrorProps } from "../types";
import { fadeInUp } from "../utils/animations";

const Error = ({ message }: ErrorProps): React.JSX.Element => {
  return (
    <motion.div
      className="card-glass border border-red-400/30 bg-red-500/20 text-white p-4 rounded-xl flex items-center gap-3"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
      <p className="font-medium text-white/90">{message}</p>
    </motion.div>
  );
};

export default Error;
