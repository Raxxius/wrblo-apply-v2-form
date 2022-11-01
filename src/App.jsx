import './App.css';
import FormBuilder from './Components/FormBuilder';
import Example from './Tests/Example';

function App() {
  const data = (Example['formList'])
  return (
    <div className='App'>
      <FormBuilder
        data={data}
      />
    </div>
  );
}

export default App;
