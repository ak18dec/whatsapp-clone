import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
  const [selectedContactsIds, setSelectedContactsIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function hanldeSubmit(e) {
    e.preventDefault()
    createConversation(selectedContactsIds)
    closeModal()
  }
  
  function handleCheckboxChange(contactId) {
    setSelectedContactsIds(prevSelectedContactIds => {
      if(prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => contactId !== prevId)
      } else {
        return [...prevSelectedContactIds, contactId] 
      }
    })
  }
  
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={hanldeSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check className='mb-2'
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={()=> handleCheckboxChange(contact.id)} 
                />
            </Form.Group>
          ))}
          <Button type='submit' className='mt-2'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
