import { ThemeProvider } from "@material-tailwind/react";
import Header from "./components/Header";
import MemeEditor from "./components/MemeEditor";

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
        <MemeEditor />
      </div>
    </ThemeProvider>
  );
}
