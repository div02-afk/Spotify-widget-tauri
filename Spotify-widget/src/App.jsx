import React, { useEffect, useState } from "react";
import {
  LogicalSize,
  LogicalPosition,
  appWindow,
} from "@tauri-apps/api/window";
import "./App.css";
import {
  loginWithSpotify,
  getCurrentlyPlayingTrack,
  spotifyMediaControl,
} from "./components/spotifyAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faCircleChevronLeft,
  faCircleChevronRight,
  faArrowRightToBracket,
 faCircleXmark}
 from "@fortawesome/free-solid-svg-icons";
import { animate, motion } from "framer-motion";
import react from "./assets/react.svg";
import store from "./components/store";
import { TauriEvent } from "@tauri-apps/api/event";

document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click menu

function App() {
  const [userInfo, setUserInfo] = useState({});
  let accessToken = "";
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  store.subscribe(() => {
    setImage(store.getState().image);
    setName(store.getState().songName);
    setArtist(store.getState().artist);
  });
  // const accessToken = store.getState().accessToken;
  const [isHovering, setIsHovering] = useState(true);
  const [options, setOptions] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLogged, setIsLogged] = useState(store.getState().loggedin);
  // const isLogged = store.getState().loggedin;

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      console.log("logging in");
      setIsLogged(true);
      store.dispatch({ type: "loggedin", action: true });
    }
    // console.log(userInfo);
    store.dispatch({ type: "userInfo", payload: userInfo });
    window.localStorage.setItem("code", userInfo.code);
    window.localStorage.setItem("accessToken", userInfo.accessToken);
    window.localStorage.setItem("refreshToken", userInfo.refreshToken);
    accessToken = userInfo.accessToken;
    if (isLogged) {
      setTimeout(() => {
        const interval = setInterval(getCurrentlyPlayingTrack, 5000);
      }, 1000);
    }
  }, [userInfo]);
  
  useEffect(() => {
    setIsPlaying(store.getState().isPlaying);
  }, [store.getState().isPlaying]);
  useEffect(() => {}, [isLogged]);
  const handleMouseLeave = async (e) => {
    let width = 70;
    let height = 70;
    const logicalPosition = new LogicalPosition(1460, 740);
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
    spotifyMediaControl(control);
  }

  return (
    <div className="overflow-hidden ">
      {!isHovering ? (
        <motion.div
          className="w-[50px] h-[50px] glass rounded-full flex justify-center"
          onMouseEnter={handleMouseEnter}
          animate={{ rotate: isPlaying ? [null, 360] : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <img
            src={image || react}
            alt="React Logo"
            width={60}
            height={60}
            className="rounded-[100%] object-contain p-0.5"
          />
        </motion.div>
      ) : (
        <motion.div
          onAuxClick={(e) => {
            setOptions(true);
          }}
          id="main"
          className="w-full h-screen glass flex-row text-white  select-none"
          onMouseLeave={() => {
            setTimeout(() => {
              handleMouseLeave();
            }, 600);
          }}
          transition={{ duration: 0.0 }}
        >
          <div className="flex flex-row items-center justify-center text-xl">
            {isLogged && <div className="flex w-full relative">
              <div className="text-center w-full z-10">{name || ""}</div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
                className="flex absolute right-4 items-center justify-end text-xl mb-2 mt-2 gap-6 z-20"
                onClick={() => {
                  console.log("closing");
                  appWindow.close();
                  TauriEvent.emit("close");
                }}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </motion.div>
            </div>}
            {!isLogged && (<div className="flex gap-6">
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
                className="flex items-center justify-end text-xl mb-2 mt-2 gap-6"
                onClick={() => {
                  loginWithSpotify();
                  let count = 0;
                  const interval = setInterval(async () => {
                    const data = await fetch("https://spotify-widget-server.vercel.app/data", {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });

                    const json = await data.json();

                    if (json !== "") {
                      console.log("frontend received data");
                      clearInterval(interval);
                      console.log(json);
                      setUserInfo(json);
                      setIsLogged(true);
                    }
                    count++;
                    if (count > 30) {
                      clearInterval(interval);
                    }
                  }, 500);
                }}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
                className="flex items-center justify-end text-xl mb-2 mt-2 gap-6"
                onClick={() => {
                  appWindow.close();
                  TauriEvent.emit("close");
                }}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
                
              </motion.div>
              </div>
            )}
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
          <div className="text-[10px] text-center mt-1">
            {isLogged && "by " + artist}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
