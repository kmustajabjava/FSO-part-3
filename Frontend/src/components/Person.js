const Person = ({persons, deleteperson}) => {
  return ( 
    <div className="container">
      <div className="row">
         <div className="col-sm-4"> {persons.name} </div>
         <div className="col-sm-4"> {persons.number}</div>
         <div className="col-sm-4"> <button onClick={() => deleteperson(persons.id)}>&nbsp; delete &nbsp; </button></div>
     </div>
     </div>
  )
}
export default Person  