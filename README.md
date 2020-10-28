# Simple GitHub Action to invoke CMake

This action executes CMake in the simplest way possible. Something similar to this:

```
mkdir build
cmake -S . -B build
cmake --build build --config $CONFIG
```

## Inputs

### `config`

**Required** CMake configuration to use (Debug, Release, MinSizeRel, and RelWithDebInfo)

## Outputs

### `build_dir`

The build dir (currently hardcoded to be a folder named `build` inside the cloned repo).

## Example usage

```
uses: m4co/gha-simple-cmake@v1
with:
  config: RelWithDebInfo
```

