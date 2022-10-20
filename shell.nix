with import <nixpkgs> {};
let 
    nodejs = nodejs-16_x;
in
stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        nodejs
        python3
    ];

    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
