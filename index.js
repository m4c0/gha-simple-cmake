const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');

async function run() {
  const config = core.getInput('config');
  const source = core.getInput('source_dir') || '.';
  const build = core.getInput('build_dir') || 'build';
  const flags = core.getInput('extra_configure_flags') || '';
  const build_flags = core.getInput('extra_build_flags') || '';

  await core.group("Creating output folder", async () => {
    return await io.mkdirP(build);
  });

  await core.group("Configuring CMake", async () => {
    return await exec.exec(`cmake -DCMAKE_BUILD_TYPE=${config} -S ${source} -B ${build} ${flags}`);
  });

  await core.group("Building package using CMake", async () => {
    return await exec.exec(`cmake --build ${build} --config ${config} ${build_flags}`);
  });

  await core.group("Testing package using CTest", async () => {
    return await exec.exec('ctest');
  });

  core.setOutput('build_dir', build);
}

try {
  run().catch(error => {
    core.setFailed(error.message);
  });
} catch (error) {
  core.setFailed(error.message);
}
