import React, { useState } from "react";
import { LogicalSize, LogicalPosition } from "@tauri-apps/api/window";
import { appWindow } from "@tauri-apps/api/window";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import react from "./assets/react.svg"; // Add this line

function App() {
  const [isHovering, setIsHovering] = useState(true);

  const handleMouseLeave = async (e) => {
    console.log("mouse leave");
    const logicalSize = new LogicalSize(50, 50);
    const logicalPosition = new LogicalPosition(1470, 740);
    try {
      await appWindow.setResizable(true); // Ensure the window is resizable
      await appWindow.setSize(logicalSize); // Set the window size
      await appWindow.setResizable(false); // Ensure the window is resizable
      await appWindow.setPosition(logicalPosition); // Set the window size
      setIsHovering(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleMouseEnter = async (e) => {
    console.log("mouse leave");
    const logicalSize = new LogicalSize(300, 90);
    const logicalPosition = new LogicalPosition(1230, 700);
    try {
      await appWindow.setResizable(true); // Ensure the window is resizable
      await appWindow.setSize(logicalSize); // Set the window size
      await appWindow.setResizable(false); // Ensure the window is resizable
      await appWindow.setPosition(logicalPosition);
      setIsHovering(true);
    } catch (e) {
      console.log(e);
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="overflow-hidden ">
      {!isHovering ? (
        <motion.div
          className="w-full h-screen glass rounded-full flex justify-center"
          onMouseEnter={handleMouseEnter}
          animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <img src={react} alt="React Logo" width={40} height={40} />
        </motion.div>
      ) : (
        <div
          id="main"
          className="w-full h-screen glass flex-row text-white  select-none"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col items-center justify-center text-3xl">
            Tite
          </div>
          <div
            id="controls"
            className="flex flex-row items-center justify-center gap-6 text-4xl"
          >
            <motion.div
              className="w-10"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} className="" />
            </motion.div>
            <motion.div
              className="w-10"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <FontAwesomeIcon
                icon={isPlaying ? faCirclePause : faCirclePlay}
                className=""
              />
            </motion.div>
            <motion.div
              className="w-10"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} className="" />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
