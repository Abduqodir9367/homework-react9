import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
const Home = lazy(() => import("./components/home/Home"));
const PostDetail = lazy(() => import("./components/postDetail/PostDetail"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/more"
          element={
            <Suspense fallback={<Loading />}>
              <PostDetail />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
