const { Router } = require('express');
const router = Router();

//Controller
const {
    renderNoteForm,
    createNewNote,
    deleteNote,
    renderNotes,
    renderEditForm,
    updateNote
} = require('../controllers/notes.controller')

//Helper
const validateSession = require('../helpers/auth')

//Create Note
router.get('/notes/add', validateSession, renderNoteForm)
router.post('/notes/new-note', validateSession, createNewNote)

//List Notes
router.get('/notes', validateSession, renderNotes)

//Edit Form
router.get('/notes/edit/:id', validateSession ,renderEditForm)
router.put('/notes/edit-note/:id', validateSession, updateNote)

//Delete Note
router.delete('/notes/delete/:id', validateSession, deleteNote)

module.exports = router;