//create actor
const actor = require("../../models/actor");
exports.createActor = async (req, res) => {

    const actorData=req.body;
    const movieId =req.params.id;
    try {
        actor.create({
            'name':actorData.name,
            'avatar':actorData.avatar,
            'age':actorData.age,
            'movie_id':movieId,
            'place_of_birth':actorData.place_of_birth,
        })
        res.send("Actor added Succesfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}


exports.deleteActor = async (req, res) => {

    const id=req.params.id;
    try {
        await actor.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        res.send("Actor deleted successfully");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}

exports.updateActor =async (req, res) => {

    const actorData=req.body;
    const id=req.params.id;
    try {
        await actor.update(actorData, {
            where: {
                id: id
            }
        });
        res.send("Actor details updated");

    }catch (error) {
        return res.status(500).json({
            'message': error.message
        })
    }
}