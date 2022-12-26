import '../styles/globals.css';
import '../lib/hexStyles.css';
import type { AppProps } from 'next/app';
import { MainProvider } from '../context/MainContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default MyApp
