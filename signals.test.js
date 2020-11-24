const spawn = require('cross-spawn');

const startProcess = (instanceCallback) => {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['longProcess.js']);

    instanceCallback(child)

    child.on('close', (code, signal) => {
      resolve({ code })
    });
  }) 
}

const sendSigintWithDelay = child => setTimeout(() => child.kill('SIGINT'), 1000)
const sendSigtermWithDelay = child => setTimeout(() => child.kill('SIGTERM'), 1000)

const testSigint = async () => {
  const { code } = await startProcess(sendSigintWithDelay)

  if (code !== 0) {
    return console.error(`SIGINT test resulted in non-zero status code of ${code}`)
  }
  console.log('SIGINT test passed')
}

const testSigterm = async () => {
  const { code } = await startProcess(sendSigtermWithDelay)

  if (code !== 0) {
    return console.error(`SIGTERM test resulted in non-zero status code of ${code}`)
  }
  console.log('SIGTERM test passed')
}

testSigint()
testSigterm()
