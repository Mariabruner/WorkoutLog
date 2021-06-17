const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { WorkOutModel } = require("../models")

router.post("/log/", validateJWT, async(req, res) => {
    const { description, definition, result } = req.body.workout
    const { id } = req.user
    const workoutEntry = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newWorkout = await WorkOutModel.create(workoutEntry)
        res.status(200).json(newWorkout)
    } catch(err) {
        res.status(500).json({ error: err })
    }
    WorkOutModel.create(workoutEntry)
})

router.get("/log/", validateJWT, async(req, res) => {
    try {
        const entries = await WorkOutModel.findAll()
            res.status(200).json(entries)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {description, definition, result } = req.body.workout
    const entryId = req.params.entryId
    const userId = req.user.id

    const query = {
        where: {
            id: entryId,
            owner: userId
        }
    }

    const updatedJournal = {
        description: description,
        definition: definition,
        result: result
    }

    try {
        const update = await JournalModel.update(updatedJournal, query)
        res.status(200).json(update)
    } catch(err) {
        res.status(500).json({ error: err })
    }
})

router.delete("/delete/:id", validateJWT, async (req ,res ) => {
    const ownerId = req.user.id
    const workoutlId = req.params.id
    
    try {
        const query = {
            where: {
                id: workoutlId,
                owner: ownerId
            }
        }

        await WorkOutModel.destroy(query)
        res.status(200).json({ message: "Workout log removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})




module.exports = router