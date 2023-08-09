import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import PerService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNumber]=useState('')
  const [filter, showFiltered] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: null, type: null})
  useEffect(() => {
    PerService
    .getAllContacts()
    .then((allPersons) => {
        setPersons(allPersons);
    })
}, []);
console.log('rendered', persons.length, 'persons')

const addperson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number:newNumber
    }
    //check for empty fields of name and number
    if(!newName || !newNumber)
    {
      window.alert('Please Fill the Required Fields')
      return
    }
    //check for existing and updating person contact information/details by comparing name
    const existings = persons.find(
      (existingperson) => existingperson.name.toLowerCase() === newName.toLowerCase()
    )
    if(existings)
    {
      const person = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
      const updatedPerson = 
      {
         ...person, 
         number: newNumber 
      }
      const { id } = person;

      const UpdateAlert = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if(UpdateAlert)//Now update after confirmation
      {
          PerService
          .updatecontact(id, updatedPerson)
          .then((PersonData) => {
              //Update Person contact details
              setPersons(
                  persons.map((person) =>
                      person.id !== id ? person : PersonData
                  )
              )
              setErrorMessage({...errorMessage, message: `Success! '${updatedPerson.name}' Contact Details Updated`, type:'success'})
              setTimeout(() => {
                setErrorMessage({...errorMessage, message: null, type:'success'})
            }, 5000)
          })
          .catch(error => {
            setErrorMessage({...errorMessage, message: `Information Of '${persons.name}' has already been removed from the server`, type:'error'})
            setTimeout(() => {
              setErrorMessage({...errorMessage, message: null, type:'error'})
            }, 5000)
          })

      }
      setNewName("")
      setNumber("")
      return
  }
  //create a new Contact
    PerService
    .createContact(PersonObject)
    .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName('')
        setNumber('')
        setErrorMessage({...errorMessage, message: `Success! '${newPerson.name}' Added To The Phonebook`, type:'success'})    
            setTimeout(() => {
              setErrorMessage({...errorMessage, message: null, type:'success'})
            }, 5000)
    })
    .catch(error => {
      setErrorMessage({...errorMessage, message: `Information Of '${persons.name}' Cannot Be Added TRY AGAIN :)`, type:'error'})  
      setTimeout(() => {
        setErrorMessage({...errorMessage, message: null, type:'error'})
      }, 5000)
    })
  }
//delete a contact
const deleteperson=(id)=>
{
  const selectedperson = persons.find((p) => p.id === id);
  const DeleteAlert = window.confirm(`Delete ${selectedperson.name}?`);
  if(DeleteAlert)//delete after confirmation using id
  {
      PerService
      .removecontact(id)
      .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons)
          setErrorMessage({...errorMessage, message: `Success! '${selectedperson.name}' Contact Details Deleted`, type:'success'})  
            setTimeout(() => {
              setErrorMessage({...errorMessage, message: null, type:'success'})
            }, 5000)
      })
      .catch(errorMessage => {
            setErrorMessage({...errorMessage, message: `Information Of '${selectedperson.name}' has already been removed from the server`, type:'error'})  
            setTimeout(() => {
              setErrorMessage({...errorMessage, message: null, type:'error'})
            }, 5000)
          })
  }
}
  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }
  const handleFilter = (event) => {
    showFiltered(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage.message} type={errorMessage.type} />
      <Filter 
      filter={filter} 
      handleFilter={handleFilter}/>

      <h1>add a new</h1>
      <PersonForm 
      addperson={addperson}
      newName={newName} 
      newNumber={newNumber}
      handleChange={handleChange} 
      handleNumChange={handleNumChange}/>

      <h1>Numbers</h1>
      {/* filter the contacts based on filter search  */}
      {
      persons.filter(person => {
      if (!filter) return true // if filter is empty then all the contacts are displayed
      else if (person.name.toLowerCase().includes(filter.toLowerCase())) //matching contacts will be displayed
      return true
      else
      return false // nothing displays as match is not found
      }).map(person => 
      <Person  
       key={person.id} 
       persons={person} 
       deleteperson={deleteperson} />
    )}
    </div>
  )
}
export default App