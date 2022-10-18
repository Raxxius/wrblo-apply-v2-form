import './App.css';
import JSON_TEST from './Tests/test-JSON-fetch.jsx'
import FormBuilder from './Components/FormBuilder.jsx'

function App() {
  const FORM_DATA = JSON_TEST
  return (
    <div className='App'>
      <FormBuilder
        data={FORM_DATA}
      />
    </div>
  );
}

export default App;
