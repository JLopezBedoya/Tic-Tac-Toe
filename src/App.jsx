import { useState } from "react";
import Game from "./components/game";
import Menu from "./components/menu";

function App(){
  const [options, SetOptions] = useState({
    show: true, //true == Menu / false ==  Game
    icon: true, //true == X / false == O
    game: true, //true == VsPlayer / false == VsCPU
  })
  return(
    <div className="container">
      <div className="zone">
        <Menu SetData={SetOptions} data={options} />
        <Game setData={SetOptions} data={options} />
      </div>
    </div>
  )
}
export default App;