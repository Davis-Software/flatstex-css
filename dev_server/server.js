const express = require("express")
const app = express()
const path = require("path")

const view_root = path.join(__dirname, "views")

// Serving static files
app.use('/static', express.static(path.join(__dirname, 'assets')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))

// Handling GET / request
app.get('/', (req, res) => {
    res.sendFile(path.join(view_root, "index.html"))
})
app.get('/:page', (req, res) => {
    if(!req.params.page) req.params.page = "/"
    res.sendFile(path.join(view_root, req.params.page))
})

app.listen(3000)