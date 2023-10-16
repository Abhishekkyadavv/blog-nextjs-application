import '.././styles/globals.css';
import Footer from './component/Footer';
import Header from './component/Header';


export default function App({ Component, pageProps }) {

  return (
    <>
      <Header />

      <Component {...pageProps} />
      <Footer />
    </>

  )
}


