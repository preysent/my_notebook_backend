const express = require('express')
const Notes = require('../models/Notes')
const router = express.Router()
const findUserId = require('../middleWere/findUserId')

const { body, validationResult } = require('express-validator');//for validation


//ROUT 1: getting all note's array using: Get /api/notes/getAllNotes  :
router.get('/featchAllNotes', findUserId, async (req, res) => {
  const note = await Notes.find({ user: req.user.id });
  res.json(note)
})


//ROUT 2: adding note using: post /api/notes/addNote  :
router.post('/addNote', findUserId,
  // validating the input
  [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      // adding notes to the database
      const { title, description, tag } = req.body
      const notes = new Notes({
        title, description, tag, user: req.user.id
      });
      const note = await notes.save();
      return res.json(note)

    }

    res.send({ errors: result.array() });
  })



//ROUT 3: updating note using: put /api/notes/addNote  :
router.put('/update/:id', findUserId,
  async (req, res) => {
    const { title, description, tag } = req.body
    // creating new note with updated value
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }


    // finding note using id wich is in route 
    let note = await Notes.findById(req.params.id);

    // if note is not vaid send message
    if (!note) {
      return res.status(400).send("note is not valid")
    }

    // useing middlewere fn given id we compaire to the id present in notes to varify the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("invalid user")
    }

    // updating the the note present in database
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    return res.json({ note })

  })






  

//ROUT 4: Deleting note using: put /api/notes/addNote  :
router.delete('/delete/:id', findUserId,
  async (req, res) => {

    const note = await Notes.findById(req.params.id)

    // if note is not vaid send message
    if (!note) {
      return res.status(400).send("note is not valid")
    }

    // useing middlewere fn given id we compaire to the id present in notes to varify the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("invalid user")
    }
    try {
      await Notes.findByIdAndDelete(req.params.id);
      return res.send("deletad")
    }
    catch (err) {
      console.log(err.message)
      res.send("some internal error accour")
    }

  })

module.exports = router