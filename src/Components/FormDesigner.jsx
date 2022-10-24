import { useState } from "react"
import FormBuilder from "../Components/FormBuilder"
import FormConstructor from "../Components/FormConstructor"
import TEST_JSON from "../Tests/test-JSON-fetch"


export default function FormDesigner() {
    const [data, setData] = useState(TEST_JSON['formList'])
    return (
        <div className="form-designer-core">
            <h1>Form Constructor</h1>
            <div 
                className="form-boxes" 
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div className="formBuilder-flex">
                    <h2 style={{textAlign: 'left'}}>Form Preview</h2>
                    <FormBuilder 
                        data={data}
                    />
                </div>
                <FormConstructor
                    data={data}
                    setData={setData}
                />
            </div>
        </div>
    )
}