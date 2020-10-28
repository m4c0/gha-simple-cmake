const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');

async function run() {
  await core.group("Creating output folder", async () => {
    return await io.mkdirP('build');
  });

  const config = core.getInput('config');

  await core.group("Configuring CMake", async () => {
    return await exec.exec(`cmake -DCMAKE_BUILD_TYPE=${config} -S . -B build`);
  });

  await core.group("Building package using CMake", async () => {
    return await exec.exec(`cmake --build build --config ${config}`);
  });

  await core.group("Testing package using CTest", async () => {
    return await exec.exec('ctest');
  });

  core.setOutput('build_dir', 'build');
}

try {
  run();
} catch (error) {
  core.setFailed(error.message);
}
