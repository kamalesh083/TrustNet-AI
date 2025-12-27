"use client";

import { motion } from "motion/react";
interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  className?: string;
}

const Button = ({ label, children, className }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
    >
      {label}
      {children}
    </motion.button>
  );
};

export default Button;
