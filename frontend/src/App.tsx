import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import { DateTime } from "./pages/DateTime/index.tsx";
import { TodoList } from "./pages/TodoList/index.tsx";
import { Home } from "./pages/Home.tsx";

import "./App.css";

const activeClass = ({ isActive }) => (isActive ? "underline" : "");

function App() {
  return (
    <div className="flex h-screen">
      <BrowserRouter>
        <div className="bg-green-700 text-white w-[10%] p-4 min-w-[100px]">
          <NavLink className={activeClass} to="/">
            Home
          </NavLink>
          <br />
          <NavLink className={activeClass} to="/todos">
            TodoList
          </NavLink>
          <br />
          <NavLink className={activeClass} to="/datetime">
            DateTime
          </NavLink>
          <br />
        </div>

        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/datetime" element={<DateTime />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
