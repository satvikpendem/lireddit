import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

const AnimatedToggle: React.FC<
  PropsWithChildren & {
    condition: boolean;
    key?: string;
  }
> = ({ condition, children, key }) => (
  <AnimatePresence>
    {!!condition && (
      <motion.div
        key={key}
        initial={{ opacity: 0, height: 0, y: 0 }}
        animate={{ opacity: 1, height: 20, y: 10 }}
        exit={{ opacity: 0, height: 0, y: 0 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default AnimatedToggle;
