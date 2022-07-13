const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
app.get("/pokemon", (req, res) => {
    res.send(allPokemon)
})

app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    const pokemon = allPokemon.find( elemento => {
        return elemento.id === parseInt(id, 10)
    })
    res.send(pokemon)
})

app.get("/search", (req, res) => {
    const name = req.query.name
    const type = req.query.type
    
    const pokemon = allPokemon.find( elemento => {
        return elemento.name === name
    })

    let allPkm = []
    allPokemon.map( poke => {
        if (poke.types.includes(type)) {
            allPkm.push(poke)            
            return allPkm
        }
    })
    
    res.send( name ? pokemon : allPkm)
})



app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));