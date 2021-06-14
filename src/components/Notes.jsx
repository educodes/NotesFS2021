import React, { useEffect, useState } from 'react'
import { createNote, getAllNotes, changeImportantOfNote } from '../services/noteServices'
import Note from './Note'

const Notes = () => {

  const [notes, setNotes] = useState([])
  const [titleNote, setTitleNote] = useState('')
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    getAllNotes().then(notes => setNotes(notes))
  }, [])


  const showNotes = showAll ? notes : notes.filter(notes => notes.important === true)

  const saveNote = event => {
    event.preventDefault()

    const objectNote = {
      title: titleNote,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    createNote(objectNote).then(newNoteData => {
      setNotes(notes.concat(newNoteData))
      setNewNote('')
      setTitleNote('')
    })
  }

  const getTitleNote = event => {
    const titleValue = event.target.value
    setTitleNote(titleValue)
  }

  const getBodyNote = event => {
    const bodyValue = event.target.value
    setNewNote(bodyValue)
  }

  const changeImportantOf = (id) => {
    const selectNote = notes.find(note => note.id === id)
    const modifyNote = { ...selectNote, important: !selectNote.important }

    changeImportantOfNote(id, modifyNote)
      .then(newChangeNote => setNotes(notes.map(note => note.id !== id ? note : newChangeNote)))
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>NOTES</h1>
        </div>
      </header>
      <main className="grid container">
        <section className="form-box">
          <form action="" className="form" onSubmit={saveNote}>
            <input
              className="form__input-title"
              type="text"
              placeholder="Title ..."
              onChange={getTitleNote}
              value={titleNote}
            />

            <textarea
              className="form__input-body"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Text Note ..."
              onChange={getBodyNote} value={newNote}
            ></textarea>
            <button className="form__button">Save</button>
          </form>
        </section>

        <section className="notes">
          <div>
            <button onClick={() => setShowAll(!showAll)} className="btn">
              show {showAll ? 'important' : 'All'}
            </button>
          </div>
          {showNotes.map(note => <Note key={note.id} note={note} changeImportance={() => changeImportantOf(note.id)} />)}
        </section>
      </main>
    </>
  )
}

export { Notes }