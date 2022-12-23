export default function Input(props) {

    const { type, onChange, id } = props;

    return (
        <div className="input">
            <label htmlFor={id}>{id}: </label>
            <input 
            type={type}
            id={id}
            onChange={(e) => onChange(e)}></input>
        </div>
    )
}