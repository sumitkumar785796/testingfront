import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
export const metadata = {
  title: "Inverntory",
  description: "Inverntory Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js'/>
      </body>
    </html>
  );
}
