import { useState } from "react";
import Game from "./components/game";
import Menu from "./components/menu";
import { FaO, FaX } from "react-icons/fa6";

function App(){
  const [winner, SetWinner ] = useState(0)
  const [state, setState] = useState([
    0,0,0,
    0,0,0,
    0,0,0
])
  const [options, SetOptions] = useState({
    show: true, //true == Menu / false ==  Game
    icon: true, //true == X / false == O
    game: true, //true == VsPlayer / false == VsCPU
  })
  function WinnerBan(){//winner = 0==Playing/1==Player1/2==Player2/3==CPU/4==Draw
    let piece = (winner==1) ? (options.icon) ? 1:2: (!options.icon) ? 1:2;
    const pieces = [<FaX/>, <FaO/>]
    const quit = ()=>{
      SetWinner(0)
    }
    const nextRound = ()=>{
      SetOptions({
        show: true, 
        icon: true, 
        game: true, 
      })
    }
    return(
      <div className={(winner>0)?"banner-show":"banner"}>
        {(winner==4)? <h3>Draw</h3>: <h3> {(winner==1)? "You Won":"You Lose" } </h3>}
        {(winner==4)? <h1 className="banner-piece"> <span className="cross">{pieces[0]}</span> <span className="banner-draw banner-up">Try Again</span> <span className="circle">{pieces[1]}</span></h1>:<h1 className={`banner-piece ${(piece==1)?"cross":"circle"}`}> {pieces[piece-1]} <span className="banner-up">Take The Round</span></h1>}
        <div>
          <button onClick={quit}>Quit</button>
          <button onClick={nextRound} className={(piece==1)?"button-circle":"button-cross"}>Next Round</button>
        </div>
      </div>
    )
}
  return(
    <div className="container">
      <WinnerBan />
      <div className="zone" style={{filter: (winner==0)?"brightness(1)":"brightness(0.7)"}}>
        <Menu SetData={SetOptions} data={options} />
        <Game state={state} setState={setState} setData={SetOptions} data={options} setWinner={SetWinner}/>
      </div>
    </div>
  )
}
export default App;