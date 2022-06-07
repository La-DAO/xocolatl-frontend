{stdenvNoCC, nodejs, nodePackages, makeWrapper, callPackage, writeShellScriptBin}:

let
   fetchNodeModules = callPackage ./nix/fetchNodeModules.nix {};
in
   rec {
      # fetches all dependencies and dev dependencies listed package.json
      nodeDependencies = fetchNodeModules {
         src = ./.;
         nativeBuildInputs = [nodejs];
         buildInputs = [nodejs];
         name = "xocolatl-frontend-node_modules";
         production = false;
         hash = "sha256-/gTAa9/Lz6OTLMGvPKsU2vAI3j227iSpOZQB0mQ6cCg=";
         makeTarball = false; # otherwise ${nodeModules}/lib is not accesible
      };

      # frontend static files 
      static = stdenvNoCC.mkDerivation {
         src = ./.;
         name = "xocolatl-frontend-static";
         nativeBuildInputs = [makeWrapper nodejs];
         buildInputs = [nodejs];
         buildPhase = ''
            cp -r ${nodeDependencies}/lib/node_modules ./node_modules
            chmod -R +w node_modules
            patchShebangs node_modules
            export PATH="node_modules/.bin:$PATH"
            npm run build
         '';
         installPhase = ''
            mkdir -p $out
            cp -r public $out
         '';
      };

       # a simple server to quickly host the static files
       app = stdenvNoCC.mkDerivation {
          src = static;
          name = "xocolatl-frontend-dev-server";
          nativeBuildInputs = [makeWrapper];
          buildInputs = [nodejs nodePackages.serve];
          installPhase = ''
            mkdir -p $out/bin
            cp -r public $out
            makeWrapper ${nodePackages.serve}/bin/serve $out/bin/xocolatl-frontend-dev-server \
               --add-flags "$out/public --listen 8080"
          '';
       };
 }
