export default function Input(props) {

    const { type, onChange, id, pattern } = props;

    return (
        <div className="input">
            <label htmlFor={id}>{id}: </label>
            <input 
            type={type}
            id={id}
            pattern={pattern}
            onChange={(e) => onChange(e)}></input>
        </div>
    )
}