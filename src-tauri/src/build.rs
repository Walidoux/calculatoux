extern crate lalrpop;

fn main() {
  tauri_build::build();
  lalrpop::process_root().unwrap();
}
