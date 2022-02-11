
const genre = require("../../models/genre");
const rating = require("../../models/rating");
const comment = require("../../models/comment");
const episode = require("../../models/episode");
const movie = require("../../models/movie");
exports.createGenre =async (req, res) => {

    const genreData=req.body;
    try {
        genre.create({
            'name':genreData.name,
            'description':genreData.description,
            'status':"active"
        })
        res.send("Genre added Succesfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

exports.viewGenres = async ( req,res)=>{
    try{
        const activeGenre = await genre.findAll({
            where:{status:"active"},
            include: [
                {'model': movie},
            ]
        }) ;

        return res.send(activeGenre);

    }  catch (error)  {
        return res.status(500).json({
            'message':error.message
        })
    }
}

exports.deleteGenre=async (req, res) => {

    const id=req.params.id;
    try {
        await genre.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        res.send("genre deleted successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}
 exports.updateGenre =async (req, res) => {

    const genreData=req.body;
    const id=req.params.id;
    try {
        let findGenre = await genre.findOne({where: {id: id}});
        if(!findGenre){
            res.send("genre not found");
        }
        await genre.update(genreData, {
            where: {
                id: id
            }
        });
        let updatedGenre = await genre.findOne({where: {id: id}});

        return res.status(200).json({
            genre:updatedGenre
        })

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}