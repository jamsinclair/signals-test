const spawn = require('cross-spawn');

const startProcess = (instanceCallback) => {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['longProcess.js']);
    console.log(`Started process ${child.pid}`)

    instanceCallback(child)

    child.on('close', (code, signal) => {
      console.log(`process ${child.pid} closed with ${code} and ${signal}`)
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

console.log('start test')
console.log('----------')
Promise.all([
  testSigint(),
  testSigterm()
]).then(() => console.log('finished tests'))
