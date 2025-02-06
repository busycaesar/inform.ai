import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data.searchQuery);
  };

  return (
    <>
      <h1 className="font-bold text-center text-white">dev.ai</h1>
      <form className="my-3 mx-5" onSubmit={handleSubmit(submitForm)}>
        <div className="row">
          <input
            placeholder="Search"
            className="col border-1 border-black mx-3"
            {...register("searchQuery")}
          />
          <Button className="col-auto border-5 border-orange-200" type="submit">
            Search
          </Button>
        </div>
      </form>
    </>
  );
}

export default App;
