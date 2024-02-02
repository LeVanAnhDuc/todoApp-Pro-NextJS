'use client';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface Iprops {
    className?: string;
    children: ReactElement | string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
}
const Button = (props: Iprops) => {
    const { className, children, type = 'button', ...passProps } = props;
    return (
        <motion.button
            className={`border-2 px-5 py-2 rounded-lg text-lg font-medium h-12 text-black ${className} `}
            whileHover={{
                scale: 1.05,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            whileTap={{ scale: 0.95 }}
            type={type}
            {...passProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;
