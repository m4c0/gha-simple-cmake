# Simple GitHub Action to invoke CMake

This action executes CMake in the simplest way possible. Something similar to this:

```
mkdir build
cmake -S . -B build
cmake --build build --config $CONFIG
```

## Inputs

* `config` - **Required** CMake configuration to use (Debug, Release, MinSizeRel, and RelWithDebInfo)
* `source_dir` - Directory containing the root CMakeFiles.txt
* `build_dir` - Directory to hold the output
* `extra_configure_flags` - Flags to be sent while configuring CMake
* `extra_build_flags` - Flags to be sent while using CMake to build

## Outputs

* `build_dir` - The build dir

## Example usage

```
uses: m4co/gha-simple-cmake@v1
with:
  config: RelWithDebInfo
```

