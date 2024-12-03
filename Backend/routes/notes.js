const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Router:1 fetching all notes of a user : login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        console.log("Fetching notes for user ID:", req.user.id); // Debug log
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).send("Internal Server Error during fetching notes");
    }
});

//Router:2 adding new notes : login required
router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be more than length 7").isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const saveNotes = await note.save();
            res.json(saveNotes);
        } catch (error) {
            console.error("Error adding note:", error);
            res.status(500).json({ error: "Internal server error during adding notes" });
        }
    }
    
);
//Router:3 updating exiting notes using put : login required    
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    const {title,description,tag}=req.body;
    // create a newnote object

    try {
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        // find the note to be updated and update it
        // const note = await Note.findByIdAndUpdate()
       let note = await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send("not found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Internal server error during adding notes" });
    }
   
});

//Router:4 deleting exiting notes using delete "api/notes/deletenote" : login required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
   try {
    
       // find the note to be deleted
    
      let note = await Note.findById(req.params.id);
       if(!note){
          return res.status(404).send("not found")
       }
       // allowing user to delete note if he own this note
       if(note.user.toString() !== req.user.id){
           return res.status(401).send("Not Allowed");
       }
       note = await Note.findByIdAndDelete(req.params.id)
       res.json({"status":"Successfully deleted note", note :note})
   } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Internal server error during adding notes" });
   }


});


module.exports = router;
