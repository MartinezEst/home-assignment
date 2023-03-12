import { Html, Head, Main, NextScript } from 'next/document';

export const Document = () => {
  return (
    <Html lang="en" className="h-screen w-screen">
      <Head />
      <body className="h-screen w-screen bg-gray-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
