import express from 'express'
import cors from 'cors'
import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import bodyParser from 'body-parser'

const app = express()
app.use(cors({
    origin: ['http://localhost:3000'],
    // methods: ["POST", "GET"],
    credentials: true
}))
app.use(express.json())
// app.use(cookieParser())
// app.use(bodyParser.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.get('/', (req,res)=>{
    console.log("i am home ",req.sessionID)
    console.log(req.session.email)
    if (req.session.email ){
        return res.json({valid : true, email: req.session.email })
    }else{
        return res.json({valid: false})
    }
})

app.post('/login', (req,res)=>{
    console.log("i am login ",req.sessionID)
    console.log(req.session.email)
    // res.send(req.body.email)
    if(req.body.email === "girish@gmail.com"){
        req.session.email = req.body.email
        console.log(req.session.email)
        return res.json({login: true})
    }else{
        return res.json({login: false})
    }
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})