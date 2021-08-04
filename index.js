const mongoose = require('mongoose')
const express = require('express')
const fileUpload = require('express-fileupload')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const homeRoutes = require('./routes/home')
const MONGODB_URI = `mongodb://nowruz:123546@127.0.0.1/files`

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(fileUpload())
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)

async function start(){
  try {
    await mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    const PORT = process.env.PORT || 3000 
    app.listen(PORT, () => {
        console.log(`Server is running on port http://127.0.0.1:${PORT}`)
    })
  } catch (error) {
    console.log(error) 
  }

}
start()

