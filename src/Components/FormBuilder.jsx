import { useState } from 'react';

/**
 * format = 
 * 
 * expected data input from JSON
 * 
 * array of list item:
 * 
 * {
 * id: 'str'
 * listType: 'str',
 * formTitle: '{title of form}'
 * formText: '{User input text}'
 * maxCharacter: '{max number of characters in the input}
 * }
 * 
 * or fieldset based sublist
 * 
 * {
 * id: 'str',
 * listType: 'fieldset',
 * legend: 'legend',
 * list: '[array of list item]
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
            else if (form.listType === 'fieldset') {
                const subFormData = form['list'].map(subform => {
                    if (subform.id === event.target.id)
                    return {...subform, formText: event.target.value}
                    return subform
                })
                return {...form, list: subFormData}
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
                    width: '40vw',
                    textAlign: 'left',
                }}
            >
                {props.formTitle}
            </label>
            <input
                id={props.id}
                type={props.listType}
                maxLength={props.maxCharacter}
                onChange={handleChange}
                value={props.value}
                style={{
                    width: '40vw',
                    textAlign: 'left',
                }}
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

    function handleSubmit() {
        alert("submitting application form")
        const submitData = JSON.stringify(formData);
        const blob = new Blob([submitData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "form-data.json";
        link.href = url;
        link.click();
    }

    const formItems = formData.map(form => {

        if (form.listType === 'fieldset') {

            const subFormItems = form.list.map(subform => {
                    return (
                        <FormItem 
                            key={subform.id}
                            {...subform}
                            formData={formData}
                            setFormData={setFormData}
                            value={subform.formText}
                        />
                    )
                }) 
            return (
                <fieldset key={form.id}>
                    <legend>{form.legend}</legend>
                        {subFormItems}
                </fieldset>
            )}
        else {
            return (
                <FormItem 
                    key={form.id}
                    {...form}
                    formData={formData}
                    setFormData={setFormData}
                    value={form.formText}
                />
            )}
        })

    return (
        <div 
            className="form-box"
            style={style}
        >
            <div
                className="submit-button"
                style={{
                    cursor: 'pointer',
                    border: '2px solid black',
                    padding: '15px',
                    borderRadius: '15px'
                }}
                onClick={handleSubmit}
            >
                <p>Submit the WRBLO Preliminary Application</p>
            </div>
            {formItems}
        </div>
    )

}


export default FormBuilder
