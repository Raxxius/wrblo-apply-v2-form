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
        console.log(event.target)
    
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
        
        console.log(newFormData)
        props.setFormData(newFormData)

        /*props.formData.map(form => {
            if (form.listType === 'fieldset') {
                const subFormItems = form.list.map(subForm => {
                    if (subForm.id === event.target.id) {
                        return {...subForm, formText: event.target.value}
                    }
                    return subForm
                })
            }
            else if (form.id === event.target.id) {
                return {...form, formText: event.target.value}
            }
            return form
        })
                */


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
                type={props.listType}
                maxLength={props.maxCharacter}
                onChange={handleChange}
                value={props.value}
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
            {formItems}
        </div>
    )

}


export default FormBuilder
