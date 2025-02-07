import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getQueryResult } from "../lib";
import { useLoading } from "./hooks";
import ReactMarkdown from "react-markdown";

function App() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState({});
  const [loadingAnimation, setLoading] = useLoading(false);

  const submitForm = (data) => {
    setResult((prevResult) => ({ ...prevResult, query: data.query }));

    setLoading(true);

    getQueryResult(data.query)
      .then((data) => {
        setResult((prevResult) => ({ ...prevResult, queryResult: data }));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1 className="font-bold text-center my-2">inform.ai</h1>
      <form className="my-3" onSubmit={handleSubmit(submitForm)}>
        <div className="row">
          <input
            placeholder="Search"
            className="col border-black border-0 mx-1"
            {...register("query")}
          />
          <Button className="col-auto bg-black border-0 button" type="submit">
            Search
          </Button>
        </div>
      </form>
      {result.query && <h2>{result.query}</h2>}
      {loadingAnimation}
      {result.queryResult && (
        <ReactMarkdown>{result.queryResult}</ReactMarkdown>
      )}
    </>
  );
}

export default App;
