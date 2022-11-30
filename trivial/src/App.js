import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import Question from "./pages/Question/Question";
import Results from "./pages/Results/Results";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions/:question_id" element={<Question />} />
            <Route path="/results" element={<Results />} />
        </Routes>
    </>
  );
}

export default App;