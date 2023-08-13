#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use lalrpop_util::lalrpop_mod;
use specta::collect_types;
use tauri_specta::ts;

lalrpop_mod!(pub calculate);

#[tauri::command]
#[specta::specta]
fn calculate(input: &str) {
  println!("{:?}", calculate::ExprParser::new().parse(input));
}

fn main() {
  #[cfg(debug_assertions)]
  ts::export(collect_types![calculate], "../src/bindings.ts").unwrap();

  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![calculate])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
