const Search = ({value, onChange}) => (
    <div style={{marginLeft: "2%", marginTop: "2%"}}>
        <label>Search </label>
        <input type="text" value={value} onChange={onChange} />
    </div>
)

export default Search