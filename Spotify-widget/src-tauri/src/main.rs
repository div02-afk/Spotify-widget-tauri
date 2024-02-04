// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::{ Command, Stdio };
use std::io::Error;




fn start_node_server() -> Result<(), Error> {
    let _server = Command::new("node")
        .arg("server.cjs")
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
        .spawn()?;

    Ok(())
}

// fn read_file() -> String {
//     let file_path = Path::new(
//         "C:\\Users\\divya\\Documents\\GitHub\\Spotify-widget-tauri\\Spotify-widget\\src-tauri\\data.json"
//     );
//     let mut file = match File::open(&file_path) {
//         Ok(file) => file,
//         Err(e) => panic!("Failed to open file: {}", e),
//     };
//     let mut contents = String::new();
//     if let Err(e) = file.read_to_string(&mut contents) {
//         panic!("Failed to read file: {}", e);
//     }
//     return contents;
// }
// #[tauri::command]
// fn get_access_token() ->String{
//     let contents = read_file();
//     println!("I was invoked from JS!");
//     return contents;
// }
fn main() {
    start_node_server().expect("Failed to start Node.js server");

    // Read the contents of the file into a string

    
    tauri::Builder
        ::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
