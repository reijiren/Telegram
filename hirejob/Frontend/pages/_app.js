import '../styles/globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head';
import Navbar1 from '../components/navbar/navbar1';
import Navbar2 from '../components/navbar/navbar2';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useEffect } from 'react';

config.autoAddCss = false;

const layouts = {
  N1: Navbar1,
  N2: Navbar2,
}

const noLayouts = ({children}) => {
  return (<>{children}</>)
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  })

  const Layout = layouts[Component.navbar] || noLayouts;

  return (
    <>
    <Head>
        <title>Peworld</title>
        <meta name="description" content="Hirejob Application" />
        <link rel="icon" href="/Peworld icon.ico" />
    </Head>
    <Layout>
        <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp;