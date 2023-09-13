import { ThemeProvider } from "@material-tailwind/react";
import Header from "./components/Header";
import Main from "./components/Editor/Main";
import Footer from "./components/Footer";

export default function App() {
  const customTheme = {
    select: {
      styles: {
        base: {
          container: {
            minWidth: null,
          },
        },
      },
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
