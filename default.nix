{ pkgs ? import <nixpkgs> {} }:
with pkgs;
let
   fetchNodeModules = callPackage ./nix/fetchNodeModules.nix {};
   packageJSON = lib.importJSON ./package.json;
   name_ = packageJSON.name;
   version = packageJSON.version;
in
   rec {
      # fetches all dependencies and dev dependencies listed package.json
      nodeDependencies = stdenvNoCC.mkDerivation rec {
         pname = "${name_}-node_modules-patched";
         name = "${pname}-${version}";
         src = fetchNodeModules {
            inherit version;
            name = "${name}-node_modules-${version}";
            src = ./.;
            production = false;
            hash = "sha256-eYuszEDvWUOB52HZW5AIuog31T6XGyqfYzOJ3RO0lzc=";
            makeTarball = false; # otherwise ${nodeModules}/lib is not accesible
         };
         buildInputs = [nodejs];
         installPhase = ''
            mkdir -p $out/lib
            cp -r lib/node_modules $out/lib
         '';
      };

      # runnable application that provides scripts in package.json 
      app = stdenvNoCC.mkDerivation rec {
         inherit version;
         pname = name_;
         name = "${pname}-${version}";
         # ignore files in gitignore, but keep .git folder for releases
         # src = ./.;
         src = nix-gitignore.gitignoreSourcePure ./.gitignore ./.;
         nativeBuildInputs = [makeWrapper nodejs];
         buildInputs = [ git ];
         buildPhase = ''
            export HOME=$PWD # needed to avoid write permissions error
            # copy built node deps
            ln -s ${nodeDependencies}/lib/node_modules node_modules
            # npm pack will call the 'build' script, webpack then lints and runs svelte-check
            npm pack
         '';
         installPhase = ''
            # copy source files and link nodeDependencies
            mkdir -p $out/lib
            cp -r . $out/lib

            # npm executable providing scripts defined in package.json
            makeWrapper ${nodejs}/bin/npm $out/bin/xocolatl-frontend \
              --set PATH "$out/lib/node_modules/.bin/:$PATH" \
              --add-flags "--prefix $out/lib run"
         '';
      };

      release = writeShellApplication {
         name = "release";
         runtimeInputs = [ nodejs ];
         text = ''
            export PATH="${nodeDependencies}/lib/node_modules/.bin/:$PATH"
            npm run release
         '';
      }; 
   }
