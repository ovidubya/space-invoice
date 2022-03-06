import "../styles/globals.css";
import { ModalProvider } from "react-simple-hook-modal";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
