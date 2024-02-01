import React, { useState } from "react";
import {
  LogicalSize,
  LogicalPosition,
  appWindow,
} from "@tauri-apps/api/window";
import "./App.css";
import loginWithSpotify from "./components/spotifyAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import react from "./assets/react.svg";

document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click menu

function App() {
  // const accessToken = store.getState().accessToken;
  const [isHovering, setIsHovering] = useState(true);
  const [options, setOptions] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleMouseLeave = async (e) => {
    let width = 50;
    let height = 50;
    const logicalPosition = new LogicalPosition(1470, 740);
    const logicalSize = new LogicalSize(width, height);
    try {
      await appWindow.setResizable(true);
      await appWindow.setSize(logicalSize);
      await appWindow.setResizable(false);
      await appWindow.setPosition(logicalPosition);
    } catch (e) {
      console.log(e);
    }

    setIsHovering(false);
  };
  const handleMouseEnter = async (e) => {
    console.log("mouse leave");
    const logicalSize = new LogicalSize(300, 90);
    const logicalPosition = new LogicalPosition(1230, 700);
    try {
      await appWindow.setResizable(true);
      await appWindow.setSize(logicalSize);
      await appWindow.setResizable(false);
      await appWindow.setPosition(logicalPosition);
    } catch (e) {
      console.log(e);
    }

    setIsHovering(true);
  };

  async function mediaControl(control) {
    
    if (control === "play" || control === "pause") setIsPlaying(!isPlaying);
  }

  return (
    <div className="overflow-hidden ">
      {options && (
        <motion.modal
          className="w-44 bg-white"
          onMouseLeave={setOptions(false)}
        >
          hello
        </motion.modal>
      )}
      {!isHovering ? (
        <motion.div
          className="w-full h-screen glass rounded-full flex justify-center"
          onMouseEnter={handleMouseEnter}
          animate={isPlaying ? { rotate: [null, 360] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <img src={react} alt="React Logo" width={40} height={40} />
        </motion.div>
      ) : (
        <motion.div
          onAuxClick={(e) => {
            setOptions(true);
          }}
          id="main"
          className="w-full h-screen glass flex-row text-white  select-none"
          onMouseLeave={handleMouseLeave}
          transition={{ duration: 0.0 }}
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
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                className=""
                onClick={() => mediaControl("previous")}
              />
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
                onClick={() => mediaControl(isPlaying ? "pause" : "play")}
              />
            </motion.div>
            <motion.div
              className="w-10"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <FontAwesomeIcon
                icon={faCircleChevronRight}
                className=""
                onClick={() => mediaControl("next")}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
