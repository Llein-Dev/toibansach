// src/app/layout.js
import { Inter } from "next/font/google";
import Head from "next/head";
import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/footer";
// font-awesome
// // import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false
// import "./globals.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/bootstrap.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tôi Bán Sách",
  description: "Bán Sách Tôi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{metadata.title}</title>

        <link rel="icon" href="logo." type="image/gif" />
      </Head>
      <body className={inter.className}>
        <NavbarComponent />
        {children}
        <FooterComponent />
        <script src="./js/jquery-3.4.1.min.js"></script>
        <script src="./js/bootstrap.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `function loadGoogleMaps() {
            if (typeof google !== 'undefined') {
              myMap();
            } else {
              var script = document.createElement('script');
              script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap';
              document.head.appendChild(script);
            }
          }
          loadGoogleMaps();`,
          }}
        />
        <script src="./js/map.js"></script>
      </body>
    </html>
  );
}
