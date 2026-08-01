import { useState } from 'react'

function contactForm({ onCreate }) {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [validationError, setValidationError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

    const trimmedName = name.trim()
    const trimmedNumber = number.trim()

    if (trimmedName.length < 3) {
      setValidationError('Name must contain at least 3 characters.')
      return
    }

    if (trimmedNumber.length < 5) {
      setValidationError('Phone number must contain at least 5 characters.')
      return
    }

    setValidationError('')

    const wasCreated = await onCreate({
        name :trimmedName,
        number: trimmedNumber,
    })

    if (wasCreated) {
        setName('')
        setNumber('')
        }
    }


return (
<form onSubmit={handleSubmit}>
    <h2> Add contact </h2>
    {validationError && <p role="alert">{validationError}</p>}

    <div>
        <label htmlFor="contact-name">Name</label>
        <input 
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
    </div>
        <div>
        <label htmlFor="contact-number">Number</label>
        <input
          id="contact-number"
          type="tel"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />
      </div>
      <button type="submit">Add contact</button>
</form>
    )
}

export default contactForm