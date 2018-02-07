const app = require('./app')

const PORT = process.env.PORT || 9396

app.listen(PORT, () => console.log(`Listening on :${PORT}`))
