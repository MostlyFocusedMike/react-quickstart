import { Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import './index.css';
import MainHeader from "./components/MainHeader";
import Error404Page from "./pages/Error404";

export default function App() {
  return (
    <>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </main>
    </>
  )
}
