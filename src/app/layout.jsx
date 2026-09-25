import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Creative Intelligence SaaS — Stock & Vector Production System",
  description: "Unified creative production workspace for preflight inspection, design fit checking, metadata studio, and marketplace packaging.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="bg-surface-darkest text-slate-100 min-h-screen antialiased flex flex-col"
        suppressHydrationWarning
      >
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
