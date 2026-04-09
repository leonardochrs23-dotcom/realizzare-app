import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every
 * web page during static rendering.
 * The contents of this function only run in Node.js environments and
 * do not have access to the DOM or browser APIs.
 */
export default function HTML({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* 
          PWA: Apple Touch Icon for iOS 
          We added ?v=1 to force Safari to clear the previous "U" icon cache.
        */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png?v=1" />
        <link rel="apple-touch-icon-precomposed" href="/favicon.png?v=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=1" />
        <link rel="mask-icon" href="/favicon.png?v=1" color="#253953" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: `
          body {
            background-color: #F6F8FA;
          }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
