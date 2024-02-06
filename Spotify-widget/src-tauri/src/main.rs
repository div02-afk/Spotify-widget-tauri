// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::{ Command, Stdio };
use std::io::Error;






fn main() {
    

    // Read the contents of the file into a string

    
    tauri::Builder
        ::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
