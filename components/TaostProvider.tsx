'use client';
import { ReactNode } from "react";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
  children: ReactNode;
}

export default function ToastProvider({children}: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer transition={Slide}/>
    </>
  );
}
