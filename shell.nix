with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        nodejs
        python39
    ];

    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
