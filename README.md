# WRBLO form builder

form builder for the WRBLO Apply system.

## Structure

### FormDesigner.jsx

holds both the FormBuilder and FormConstructor

### FormConstructor.jsx

design new form setups, when posted creates a JSON ready file. 

### FormBulder.jsx

taking a JSON fetch file displays the form, using react Usestate to update the data file to be ready for reposting. 