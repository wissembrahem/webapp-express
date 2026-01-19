import connection from "../db.js";


function index(req, res) {
    const query = "SELECT * FROM movies"
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500)
            return res.json({
                error: "server error"
            })
        }
        res.json({
            result: result
        })
    })

};

function show(req, res) {
    const id = req.params.id
    const movieQuery = "SELECT * FROM movies WHERE id = ?"
    connection.query(movieQuery, [id], (err, result) => {
        if (err) {
            res.status(500)
            return res.json(err)
        } if (result.length === 0) {
            res.status(404)
            return res.json({
                error: "Film non trovato"
            })
        }
        const film = result[0]
    
    const movieReviews = "SELECT * FROM reviews WHERE reviews.movie_id = ?"
    connection.query(movieReviews, [id], (err, resultReviews) => {
        if (err) {
            res.status(500)
            return res.json(err)
        }
        const equo = {
            ...film,
            reviews: resultReviews
        }
        res.json(equo)
    })

})};

export default { index, show };