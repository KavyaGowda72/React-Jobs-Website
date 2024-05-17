import { useState } from "react";

import "./index.css";
import Navbar from "./Components/Navbar";
import { Hero } from "./Components/Hero";
import HomeCards from "./Components/HomeCards";
import JobListings from "./Components/JobListings";
import ViewAllJobs from "./Components/ViewAllJobs";
import HomePage from "./pages/HomePage";
import JobPage, { jobLoader } from "./pages/JobPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Jobspage from "./pages/Jobspage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";

function App() {
  //add new job
  const addJob = async (newJob) => {
    const res = await fetch("./api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<Jobspage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
