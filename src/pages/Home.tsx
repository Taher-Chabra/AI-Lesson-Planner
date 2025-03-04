import React from "react";
import notesImg from "@/assets/notes.png";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="flex xs:items-center justify-center h-full my-8">
      <div className="flex flex-col p-8 text-left text-[#043941] dark:text-[#e9f0ef] md:w-3/5">
        <h3 className="text-[1.1rem] sm:text-2xl font-medium mb-8">
          Plan{" "}
          <span className="font-extrabold text-[#164753] dark:text-[#b4ecfa] text-xl sm:text-[1.6rem]">
            Smarter
          </span>
          , Teach{" "}
          <span className="font-extrabold text-[#164753] dark:text-[#b4ecfa] text-xl sm:text-[1.6rem]">
            Better
          </span>
        </h3>
        <h1 className="text-xl sm:text-2xl font-bold">
          Try{" "}
          <span className="text-2xl sm:text-[1.75rem] text-[#164753] dark:text-[#b4ecfa] underline">
            AI Lesson Planner
          </span>{" "}
          for Smarter, Faster, and More Engaging Lessons
        </h1>
        <p className="text-sm sm:text-lg my-8">
          Struggling with lesson planning? Let AI do the heavy lifting! Our
          smart planner generates engaging, structured lesson plans in
          seconds—so you can focus on what truly matters: Teaching.
        </p>
        
        <Link to="/lesson-input" className="w-max text-[0.8rem] md:text-lg px-3 bg-gray-800/50 hover:bg-gray-700 dark:text-white dark:hover:bg-slate-900 dark:bg-slate-800 py-1.5 rounded-md text-white hover:underline hover:underline-offset-4">
          Get Started
        </Link>
      </div>
      <div className="hidden md:block md:w-2/5 size-full ml-8">
        <img src={notesImg} alt="notes-illustration" />
      </div>
    </main>
  );
};

export default Home;
