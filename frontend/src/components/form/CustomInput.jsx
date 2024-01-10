import React from 'react';
import { useSelector } from 'react-redux';

const CustomInput = (props) => {
  const { darkMode } = useSelector((state) => state.theme);
  const otherClasses = props.cssclass;

  return (
    <input
      style={{
        backgroundColor: props.backgroundColor,
        color: props.color,
        fontSize: '14px'
      }}
      className={`
        outline-none
        rounded-md
        w-full
        px-4
        py-3
        focus:${props.error ? 'ring-2 ring-red-500' : 'ring-1'}
        focus:border-primary
        transition-all
        duration-300
        ease-in-out
        ${props.error ? 'border-2 border-red-500' : ''}
        ${darkMode
          ? 'bg-gray-700 text-gray-200 placeholder-gray-400'
          : 'bg-gray-100 text-gray-800 placeholder-gray-500'}
        ${darkMode ? 'border-gray-50' : 'text-gray-800'}
        placeholder-gray-500
        focus:placeholder-gray-300
        ${darkMode ? 'disabled:bg-gray-800' : 'disabled:bg-gray-200'}
        disabled:cursor-not-allowed
       ${otherClasses}`}
      {...props}
    />
  );
};

export default CustomInput;
