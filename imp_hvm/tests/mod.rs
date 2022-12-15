use std::fs;
use std::io::Write;
use std::path::Path;

use pretty_assertions::assert_eq;
use walkdir::WalkDir;

use imp_hvm::fun::to_hvm::compile_function;
use imp_hvm::parser::FunctionParser;

fn golden_test(path: &Path, run: &dyn Fn(&Path) -> String) {
    let result = run(path);

    let golden_path = path.with_extension("golden");
    if let Ok(to_check) = fs::read_to_string(golden_path.clone()) {
        assert_eq!(result, to_check, "Testing file '{}'", path.display());
    } else {
        let mut file = fs::File::create(golden_path).unwrap();
        file.write_all(result.as_bytes()).unwrap();
    }
}

fn golden_test_dir(root: &Path, ext: &str, run: &dyn Fn(&Path) -> String) {
    for entry in WalkDir::new(root).follow_links(true) {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.is_file() && path.extension().map(|x| x == ext).unwrap_or(false) {
            golden_test(path, run)
        }
    }
}

#[test]
fn test_fun_to_hvm() {
    let run = |path: &Path| {
        let entry = fs::read_to_string(path).unwrap();
        match FunctionParser::new().parse(&entry) {
            Ok(fun_ast) => {
                match compile_function(fun_ast) {
                    Ok(hvm_ast) => hvm_ast.to_string(),
                    Err(err) => err.to_string(),
                }
            }
            Err(err) => err.to_string()
        }
    };
    golden_test_dir(Path::new("./tests/fun_to_hvm"), "hvmcc", &run);
}