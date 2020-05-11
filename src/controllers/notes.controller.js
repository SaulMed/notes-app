const notesCtrl = {};
//Model
const Note = require('../models/Note')

notesCtrl.renderNoteForm = (req, res) => {
    //Obtener el usuario de Passport
    console.log(req.user)
    res.render('notes/new-note')
}

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description })
    newNote.user = req.user._id;    //Agregar el id en el registro de la nota
    await newNote.save();
    req.flash('success_msg','Note Added Successfully')
    //console.log(newNote)
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
    //Show all Notes
    const notes = await Note.find({user:req.user._id}).lean().sort({createdAt:'desc'})   //Filtrar las notas que solo le pertenecen al usuario       Ordenarlos Descendentemenet
    res.render('notes/all-notes', { notes })
}

notesCtrl.deleteNote = async (req, res) => {
    const { id } = req.params;
    const noteDelete = await Note.findByIdAndRemove(id);
    console.log('Note Deleted: ', noteDelete)
    req.flash('success_msg','Note Deleted Successfully')
    res.redirect('/notes')
}

notesCtrl.renderEditForm = async (req, res) => {
    //Consultar datos de la nota a editar
    const { id } = req.params;
    const note = await Note.findById(id).lean()

    //Validar que el usuario actual es quien puede editar la nota (No editar las de otros usuarios)
    if(note.user != req.user._id){
        req.flash('error_msg',"You're Not Authorized.")
        return res.redirect('/notes')
    }
    //Pasar data a formulario
    res.render('notes/edit-note', { note })
}

notesCtrl.updateNote = async(req, res) => {
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    req.flash('success_msg','Note Updated Successfully')
    res.redirect('/notes')
    //res.send('Note No.' + id + ' Updated Successfully')
}

module.exports = notesCtrl;