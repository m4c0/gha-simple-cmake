const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');

core.info("Creating output folder");
await io.mkdirP('build');

const config = core.getInput('config');

core.info("Configuring CMake");
await exec.exec(`cmake -DCMAKE_BUILD_TYPE=${config} -S . -B build`);

core.info("Building package using CMake");
await exec.exec(`cmake --build build --config ${config}`);

core.info("Testing package using CTest");
await exec.exec('ctest');

core.setOutput('build_dir', 'build');
