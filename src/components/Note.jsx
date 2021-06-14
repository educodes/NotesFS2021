import React from 'react'


const Note = ({ note, changeImportance }) => {
  const { title, content, date, important } = note

  const label = important ? 'make not important' : 'make important'
  const changeTypeButton = important ? "note__button-red" : "note__button"


  return (
    <article className="note">
      <h2 className="note__title">{title}</h2>
      <p className="note__body">{content}</p>
      <p className="note__body">{date}</p>
      <button className={changeTypeButton} onClick={changeImportance}>{label}</button>
    </article>
  )
}

export default Note