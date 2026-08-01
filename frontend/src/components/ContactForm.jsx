import { useState } from 'react'

const ContactForm = ({ onCreate }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const created = await onCreate({
      name: name.trim(),
      number: number.trim(),
    })

    if (created) {
      setName('')
      setNumber('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name:
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        Number:
        <input
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />
      </div>

      <button type="submit">
        Add
      </button>
    </form>
  )
}

export default ContactForm