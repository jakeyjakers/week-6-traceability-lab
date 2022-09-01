const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors())



const pokemon = ['Blastoise', 'Metagross', 'Sneasel']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    
})

app.get('/api/pokemon', (req, res) => {
    res.status(200).send(pokemon)
})

app.post('/api/pokemon', (req, res) => {
   let {name} = req.body
   

   const index = pokemon.findIndex(pokemon => {
       return pokemon === name
   })

   try {
       if (index === -1 && name !== '') {
           pokemon.push(name)
           res.status(200).send(pokemon)
       } else if (name === ''){
           res.status(400).send('You must enter a Pokemon.')
       } else {
           res.status(400).send('That Pokemon already exists.')
       }
   } catch (err) {
       console.log(err)
    
   }
})

app.delete('/api/pokemon/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    pokemon.splice(targetIndex, 1)
    res.status(200).send(pokemon)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))
