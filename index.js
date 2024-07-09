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
	const food_item = req.body.food
	const options = {
		url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
		params: {
			query: food_item
		},
		headers: {
			'X-RapidAPI-Key': '6b1765fc18mshdf2d0e8b1d5de67p1ac4b4jsn2944a1d76ed3',
			'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
		}
	}

	try {
		const response = await axios.get(options.url, {
			params: options.params,
			headers: options.headers
		})
		const content = response.data[0]
		const len = response.data
		if (len.length == 1) {
			res.render('index.ejs', {
				name: req.body.food,
				info: content
			})
		} else {
			console.log('error')
			res.render('index.ejs', {
				name: null,
				info: null,
				error: error.message
			})
		}
		/**/
	} catch (error) {
		console.log('Error')
		res.render('index.ejs', {
			name: null,
			info: null,
			error: error.message
		})
	}
})

app.listen(port, () => {
	console.log(`Server is running on port: http://localhost:${port}`)
})
