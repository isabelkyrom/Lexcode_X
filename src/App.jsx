import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { InitiativesPage } from "./pages/InitiativesPage";
import { InitiativeDetailPage } from "./pages/InitiativeDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { CreateInitiativePage } from "./pages/CreateInitiativePage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/iniciativas" element={<InitiativesPage />} />
          <Route path="/iniciativas/:id" element={<InitiativeDetailPage />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/crear-iniciativa" element={<CreateInitiativePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
