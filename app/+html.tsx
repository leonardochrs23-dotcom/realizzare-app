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

        {/* 
          PWA: Apple Touch Icon for iOS 
          This makes the icon appear correctly when added to the iPhone Home Screen.
        */}
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.png" />

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
