
/** Short Text Reponse form 
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

const FormItem = (props) => {
    return (
    <>
        <label className="form" id={props.id}>
            {props.formTitle}
        </label>
        <input required type={props.listtype} maxLength={props.maxCharacter} value={props.formText}>
        </input>
        <button className="help">
            ?
        </button>
    </>
    )
}





const FormBuilder = (props) => {
    console.log(props.data['formList'])
    const formItems = props.data['formList'].map(form => {
        console.log(form)
        return (
            <FormItem
                key={form.id}
                {...form}
            />
        )
    })
    return (
        <div className="form-box">
            {formItems}
        </div>
    )

}

export default FormBuilder