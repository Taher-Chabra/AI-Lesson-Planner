import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import LessonInput from "@/pages/LessonInput";
import NotFoundPage from "@/pages/404";
import Layout from "@/pages/Layout";
import Response from "@/pages/Response";
import UserAuth from "@/auth/UserAuth";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route>
            <Route path="lesson-input" element={<LessonInput />}>
              <Route path="response" element={<Response />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

