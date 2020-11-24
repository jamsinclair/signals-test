setTimeout(() => {
  process.exit(2)
}, 4000)

process.on('SIGINT', () => {
  console.log('sigint handled')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('sigterm handled')
  process.exit(0)
})
