{ pkgs ? import <nixpkgs> { } }:
with pkgs;
let 
    frontend = pkgs.callPackage ./default.nix {};
in
    stdenv.mkDerivation {
        name = "xocolatl-frontend-dev-shell";
        buildInputs = [
            nodejs
            python3
        ];

        shellHook = ''
            # make node_modules dependency binaries available
            export PATH="$PWD/node_modules/.bin/:$PATH"
        '';
    }
