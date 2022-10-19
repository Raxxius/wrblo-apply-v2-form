import { useState } from 'react';

/**
 * format = 
 * 
 * expected data input from JSON
 * 
 * array of:
 * 
 * {
 * "listType": 'STR',
 * "formTitle": '{title of form}'
 * "formText": '{User input text}'
 * "maxCharacter": '{max number of characters in the input}
 * }
 * 
 */


/* indivdual form component */



const FormItem = (props) => {
    const style = {
        display: "flex",
        flexDirection: "row", 
    }

    function handleChange(event) {
        const newFormData = props.formData.map(form => {
            if (form.id === event.target.id) {
                return {...form, formText: event.target.value}
            }
            return form
        })
        props.setFormData(newFormData)
    }

    return (
    <div 
        className='form_item'
        style={style}
    >
        <label 
            className='form'
            id={props.id}
            style={{
                width: '150px',
                textAlign: 'left',
            }}
        >
            {props.formTitle}
        </label>
        <input
            id={props.id}
            type={props.listtype}
            maxLength={props.maxCharacter}
            onChange={handleChange}
            value={props.formData[props.id]['formText']}
        >
        </input>
        <button className="help">
            ?
        </button>
    </div>
    )
}


/* core form builder */
const FormBuilder = (props) => {

    /* State variables */
    const [formData, setFormData] = useState(props.data)

    /* Style variables */
    const style = {
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    }

    const formItems = formData.map(form => {
        return (
            <FormItem 
                key={form.id}
                {...form}
                formData={formData}
                setFormData={setFormData}
            />
        )
    })

    return (
        <div 
            className="form-box"
            style={style}
        >
            {formItems}
        <button className='submit'>Submit</button>
        </div>
    )

}


export default FormBuilder
