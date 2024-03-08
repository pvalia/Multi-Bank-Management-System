import { useEffect } from "react";
import {Routes,Route,useNavigationType,useLocation,} from "react-router-dom";

import EmployeeForm from "./pages/EmployeeForm";
import BranchForm from "./pages/BranchForm";
import HomePage from "./pages/HomePage";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/EmployeeForm":
        title = "";
        metaDescription = "";
        break;
      case "/BranchForm":
        title = "";
        metaDescription = "";
        break;
      default:
        title = "";
        metaDescription = "";
        break;
    }
    
    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/EmployeeForm" element={<EmployeeForm />} />
      <Route path="/BranchForm" element={<BranchForm />} />
    </Routes>
  );
}
export default App;
