import { createContext, useState } from "react";
import "../styles/globals.css";

export const address = createContext();
function MyApp({ Component, pageProps }) {
  const [location, setlocation] = useState();
  return (
    <address.Provider value={[location, setlocation]}>
      <Component {...pageProps} />
    </address.Provider>
  );
}

export default MyApp;
