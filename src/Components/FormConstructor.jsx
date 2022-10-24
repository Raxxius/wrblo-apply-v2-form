import { useState } from "react"


const FormPreview = (props) => {
    const style = {
        display: "flex",
        flexDirection: "row", 
    }
}

export default function FormConstructor(props) {
    const [formElement, setFormElement] = useState('')
    const [formDropdown, setFormDropdown] = useState('')

    function handleClick(event) {
        console.log(event.target)

    }

    function handleChange(e) {
        setFormDropdown(e.target.value)
    }

    return (
        <>
            <div 
                className="form-constructor-flex"
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <h2>Form Setup</h2>
                <select 
                    id="form-dropdown" 
                    value={formDropdown}
                    onChange={handleChange}
                >
                    <option value="input">Input</option>
                    <option value="select">Select</option>
                    <option value="textarea">Text Area</option>
                    <option value="option">Option</option>
                </select>
                <button
                    onClick={handleClick}
                >
                    create form {formDropdown}
                </button>
                <div
                    className="form-constructor-preview"
                >
                    <h3>Preview</h3>
                    <FormPreview />
                </div>
            </div>

        </>
    )
}