export default function Input(props) {

    const { type, onChange, id, pattern, placeholder } = props;

    return (
        <div className="input">
            <label htmlFor={id}>{id} </label>
            <input 
            type={type}
            id={id}
            pattern={pattern}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}></input>
        </div>
    )
}