"use client";
import Head from "next/head";
import NavbarComponent from "./components/header/Navbar";
import FooterComponent from "./components/Footer/footer";
import Providers from "../../redux/provider";
import Script from "next/script";
import { metadata } from "./meta";
import "./css/style.css";
import "./css/responsive.css";
import "./css/bootstrap.css";
import { SearchProvider } from "./components/text/searchcontext";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="vi">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>{metadata.title}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.4.0/css/all.css" />
          <link rel="icon" href="/logo.svg" type="image/gif" />
        </Head>
        <body>
          <NavbarComponent />

          <main>
            <SearchProvider>
              {children}
            </SearchProvider>
          </main>

          <FooterComponent />
          <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive" />
          <Script src="/js/bootstrap.js" strategy="beforeInteractive" />
          <Script
            id="google-maps-script"
            strategy="lazyOnload"
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
          <Script src="/js/custom.js" strategy="lazyOnload" />
          <Script src="/js/map.js" strategy="lazyOnload" />
        </body>
      </html>
    </Providers>
  );
}
