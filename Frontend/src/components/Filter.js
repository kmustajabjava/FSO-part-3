const Filter = ({filter, handleFilter}) => {
  return <div>
    filter shown with: &nbsp;  
    <input value={filter} onChange={handleFilter}/>
    </div>
}
export default Filter