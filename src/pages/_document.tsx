import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="ChainYield – The Future of USDC Yield Farming" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Fonts or other head-level imports */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
