import { useState } from "react";

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
 * formtitle: '{title of form}'
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

  let helpButton = "";

  if (props.helpButton != undefined) {
    helpButton = (
      <button className="help" onClick={handleHelpButton}>
        ?
      </button>
    );
  }

  let input = (
    <input
      id={props.id}
      type={props.listType}
      maxLength={props.maxCharacter}
      onChange={handleChange}
      value={props.value}
      style={{
        width: "550px",
        textAlign: "left",
        padding: "5px",
      }}
    ></input>
  );

  if (props.listType === "textarea") {
    input = (
      <textarea
        id={props.id}
        type={props.listType}
        maxLength={props.maxCharacter}
        onChange={handleChange}
        value={props.value}
        style={{
          width: "550px",
          textAlign: "left",
          padding: "5px",
          height: "150px",
        }}
      ></textarea>
    );
  }

  function handleHelpButton() {
    alert(props.helpButton);
  }

  function handleChange(event) {
    const newFormData = props.formData.map((form) => {
      if (form.id === event.target.id) {
        return { ...form, formText: event.target.value };
      } else if (form.listType === "fieldset") {
        const subFormData = form["list"].map((subform) => {
          if (subform.id === event.target.id)
            return { ...subform, formText: event.target.value };
          return subform;
        });
        return { ...form, list: subFormData };
      }
      return form;
    });
    props.setFormData(newFormData);
  }
  return (
    <div
      className="form_item"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "1000px",
      }}
    >
      <label
        className="form"
        htmlFor={props.id}
        style={{
          width: "400px",
          textAlign: "left",
        }}
      >
        {props.formtitle}
      </label>
      {input}
      {helpButton}
    </div>
  );
};

/* core form builder */
const FormBuilder = (props) => {
  /* State variables */
  const [formData, setFormData] = useState(props.data);

  /* Style variables */
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  /* Handle Save */
  function handleSave() {
    alert("saving application form");
    const submitData = JSON.stringify(formData);
    const blob = new Blob([submitData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "form-data.txt";
    link.href = url;
    link.click();
  }

  /* Handle loading data from a text file */
  function handleLoad(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    console.log(e.target.files[0]);
    reader.onload = function () {
      let newForm = JSON.parse(reader.result);
      console.log(newForm);
      setFormData(newForm);
    };
  }

  /* Handle emailing data */
  function handleSubmit() {
    alert(
      "Please remember to attach any additional documents to the email before sending"
    );
    const emailBody = formData.map((form) => {
      if (form.listType !== "fieldset") {
        return `%0A%0A ${form.formtitle}: %0A%0A ${form.formText}`;
      } else {
        const subForm = form["list"].map((subform) => {
          return `%0A%0A ${subform.formtitle}: %0A%0A ${subform.formText}`;
        });
        return `%0A%0A ${form.legend} ${subForm}`;
      }
    });

    const mailto = `mailto:mail@gmail.com?subject=WRBLO Preliminary submit form&body=${emailBody}`;
    window.location.href = mailto;
  }

  const formItems = formData.map((form) => {
    if (form.listType === "fieldset") {
      const subFormItems = form.list.map((subform) => {
        return (
          <FormItem
            key={subform.id}
            {...subform}
            formData={formData}
            setFormData={setFormData}
            value={subform.formText}
          />
        );
      });
      return (
        <fieldset key={form.id}>
          <legend>{form.legend}</legend>
          {subFormItems}
        </fieldset>
      );
    } else {
      return (
        <FormItem
          key={form.id}
          {...form}
          formData={formData}
          setFormData={setFormData}
          value={form.formText}
        />
      );
    }
  });

  /* Core return render **/
  return (
    <div className="form-box" style={style}>
      <div
        className="submit-button"
        style={{
          cursor: "pointer",
          border: "2px solid black",
          padding: "15px",
          borderRadius: "15px",
        }}
        onClick={handleSubmit}
      >
        <p>Submit the WRBLO Preliminary Application</p>
      </div>
      {formItems}

      <div
        className="save-load-button"
        style={{
          display: "flex",
        }}
      >
        <div
          className="save-button"
          style={{
            cursor: "pointer",
            border: "2px solid black",
            padding: "5px",
            borderRadius: "5px",
            marginTop: "15px",
          }}
          onClick={handleSave}
        >
          Save Form
        </div>
        <div
          className="save-button"
          style={{
            cursor: "pointer",
            border: "2px solid black",
            padding: "5px",
            borderRadius: "5px",
            marginTop: "15px",
            marginLeft: "15px",
          }}
        >
          <input
            type="file"
            name="load"
            formtitle="Load from Text file"
            onChange={handleLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
