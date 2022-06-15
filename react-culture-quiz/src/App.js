
import './App.css';
import './sass_styles/style.css'
import Menu from './components/Menu/Menu';

function App() {


  /* Ici on mettrait if nanana alors c'est le menu
  else nana alors c'est le quiz */
  return (
    <div id="main" className="App flex">

      <h1 id="h1-general-culture">General culture</h1>



      <Menu />

      <h1 id="h1-quiz">Quiz</h1>

    </div>
  );
}

export default App;
