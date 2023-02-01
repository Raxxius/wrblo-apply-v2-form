import "./App.css";
import { useState } from "react";
import { parseFormData } from "../src/Functions/dataFunctions/parseData"
import FormBuilder from "./Components/FormBuilder";
import Example from "./Tests/Example2";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const data = parseFormData(Example)

  const handlePreviousPage = () => {
    console.log("prev page triggered")
    console.log(pageNumber)
    let page = pageNumber
    if (pageNumber != 1) {
      setPageNumber((PrevNumber) => {
        PrevNumber = PrevNumber - 1;
      });
      page-- 
    }
    console.log(Example[`formList${page}`])
  };

  const handleNextPage = () => {
    console.log("next page triggered")
    let page = pageNumber
    if (pageNumber != 3) {
      setPageNumber((PrevNumber) => {
        PrevNumber = PrevNumber + 1;
      });
      page++
    }
  };

  return (
    <div className="App">
      <Navigation />
      <FormBuilder
        data={data}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default App;
