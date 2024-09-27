const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const urlRoutes = require('./routes/urls.route')
const staticRoute = require('./routes/static.route')
const userRoute = require('./routes/user.route')

const { checkForAuthontication, restrictTo } = require('./middelwares/auth')

const { connectToMongoose } = require('./connection')

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthontication)

connectToMongoose('mongodb://localhost:27017/short-url').
      then(() => console.log("Connected"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use('/url/', restrictTo(["NORMAL"]), urlRoutes)
app.use('/user/', userRoute)
app.use('/', staticRoute)

app.listen(PORT, () => {
      console.log(`Server was running on ${PORT}`)
})