import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { formatDecision } from 'helpers/utils'
import { modalTitle, smallInputContainer, largeInputContainer, input, divider, pointer, darkBtn, submitBtn } from './styles.css'

const modalStyles = {
  content: {
    width: 400,
    margin: '0px auto',
    height: 450,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
    paddingBottom: '5px',
  },
}

const { object, string, func, bool } = PropTypes
Modal.propTypes = {
  title: string.isRequired,
  first: string.isRequired,
  second: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateTitle: func.isRequired,
  updateFirstDecision: func.isRequired,
  updateSecondDecision: func.isRequired,
  handleAddDecision: func.isRequired,
}

export default function Modal (props) {
  function handleSubmit () {
    return props.handleAddDecision(formatDecision(
      props.user.name,
      {
        title: props.title,
        firstChoice: props.first,
        secondChoice: props.second,
      },
    ))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>{'New Decision'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal} contentLabel={'New Decision'}>
        <div className={modalTitle}>
          <span>{'Would you rather...'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={smallInputContainer}>
          <textarea
            type='text'
            placeholder='Title'
            className={input}
            onChange={(e) => props.updateTitle(e.target.value)}
            value={props.title} />
        </div>
        <div className={largeInputContainer}>
          <textarea
            type='text'
            placeholder='First Decision'
            className={input}
            onChange={(e) => props.updateFirstDecision(e.target.value)}
            value={props.first} />
        </div>
        <div className={divider}>
          {'OR'}
        </div>
        <div className={largeInputContainer}>
          <textarea
            type='text'
            placeholder='Second Decision'
            className={input}
            onChange={(e) => props.updateSecondDecision(e.target.value)}
            value={props.second} />
        </div>
        <button
          disabled={props.isSubmitDisabled}
          onClick={handleSubmit}
          className={submitBtn}>
            {'Submit'}
        </button>
      </ReactModal>
    </span>
  )
}