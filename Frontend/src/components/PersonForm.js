const PersonForm = ({addperson,newName, newNumber, handleChange, handleNumChange}) => {
  return <>
    <form onSubmit={addperson}>
    <div className="xyz">Name:   &emsp;   <input value={newName}   onChange={handleChange}   /></div>
    <div className="xyz">Number: &nbsp;   <input value={newNumber} onChange={handleNumChange}/></div>
    <div className="xyz">
    <button type="submit">&ensp;add&ensp;</button>
  </div>
</form></>
}
export default PersonForm