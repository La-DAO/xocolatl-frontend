{
  description = "Xocolatl Web App static files and dev environment";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:

  flake-utils.lib.eachDefaultSystem (system:
  let 
    pkgs = import nixpkgs { inherit system; }; 
    webapp = pkgs.callPackage ./default.nix {};
  in
  {
    apps = {
      default = {
        type = "app";
        program = "${webapp.app}/bin/xocolatl-frontend";
      };
      release = {
        type = "app";
        program = "${webapp.release}/bin/release";
      };
    };

    packages = {
      default = webapp.app;
      app = webapp.app;
      nodeDependencies = webapp.nodeDependencies;
    };

    devShells = {
      default = import ./shell.nix { inherit pkgs; };
    };
  });
}

