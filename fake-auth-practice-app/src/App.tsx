import "./App.css";
import { MovieList } from "./Components/MoviesList";
import { SignUp } from "./Components/SignupForm";
import { LogIn } from "./Components/LoginForm";
// import { MakeMovie } from "./Components/CreateMovie";

function App() {
  return (
    <>
      <h1>The Best Movies</h1>
      <MovieList />
      <SignUp />
      <LogIn />
      {/* <MakeMovie /> */}
    </>
  );
}

export default App;
