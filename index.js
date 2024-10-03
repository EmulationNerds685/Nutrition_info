import express from 'express'
import bodyParser from 'body-parser'
import ejs from "ejs"
import axios from 'axios'
import env from "dotenv"
const app = express()
const port = 2000
env.config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const apiKey = process.env.api_key
const apiHost = process.env.api_host
app.get('/', async (req, res) => {
	if(temp_name.length==0){
		res.render("index.ejs")
	}else{
		res.render('index.ejs',{name:temp_name,info:temp_info[0]})
	}
	
})
var temp_name=[]
var temp_info=[]
app.post('/submit', async (req, res) => {
const options = {
		method: 'GET',
		url: process.env.api_url,
		params: {
			query: req.body.food
		},
		headers: {
			'x-rapidapi-key': apiKey,
			'x-rapidapi-host': apiHost
		}
	};

	try {
		const response = await axios.request(options);

		const result = response.data
		if ((result).length == 0) {
			res.render('index.ejs', { error: "Invalid Food Item!" })
			console.log("Not Found!")
			
		}
		else {
			temp_info=[...result]
			temp_name=req.body.food
			res.redirect('/')
		}
	} catch (error) {
		res.render('index.ejs', { error: error.message });
	}
})

app.listen(port, () => {
	console.log(`Server is running on port: http://localhost:${port}`)
})
//This is to confirm changes
