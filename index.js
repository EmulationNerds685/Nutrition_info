import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
const port = 2000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const apiKey = '6b1765fc18mshdf2d0e8b1d5de67p1ac4b4jsn2944a1d76ed3'
const apiHost = 'nutrition-by-api-ninjas.p.rapidapi.com'

app.get('/', async (req, res) => {
	res.render('index.ejs')
})
app.post('/submit', async (req, res) => {
	

	const options = {
	  method: 'GET',
	  url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
	  params: {
		query: req.body.food
	  },
	  headers: {
		'x-rapidapi-key': '6b1765fc18mshdf2d0e8b1d5de67p1ac4b4jsn2944a1d76ed3',
		'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
	  }
	};
	
	try {
		const response = await axios.request(options);
		console.log(response.data)
		console.log(response.data.length)
		const result=response.data		
		if((result).length==0){
			res.render('index.ejs',{error:"Invalid Food Item!"})
			console.log("Not Found!")
		}
		else{
			res.render("index.ejs",{name:req.body.food,info:result[0]})
		}
	} catch (error){
	console.error(error);
	}
})

app.listen(port, () => {
	console.log(`Server is running on port: http://localhost:${port}`)
})
//This is to confirm changes
