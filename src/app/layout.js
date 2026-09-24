import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TemplateProvider from "../app/context/TemplateContext";

export const metadata = {
  title: "AI Resume Builder",
  description: "Build your resume with the power of AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TemplateProvider>
          {children}
        </TemplateProvider>
        <ToastContainer position="top-right"/>
      </body>
    </html>
  );
}
