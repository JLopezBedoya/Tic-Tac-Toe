import { useState } from "react";
import { FaO, FaX, FaArrowRotateRight } from "react-icons/fa6";

function Game({data, setData}){
    const comeBack = ()=>{
        setData({
            show: true, 
            icon: data.icon, 
            game: data.game,
        })
    }
    const [state, setState] = useState([
        0,0,0,
        0,0,0,
        0,0,0
    ])
    const [ties, setTies] = [{
        you: 16,
        ties: 32,
        cpu: 12
    }]
    const [player, setPlayer] = useState(1)
    return(
        <section className="game" style={{left: ((data.show) ? "200%":"0")}}>
            <article className="game-header">
                <section className="game-header-icons"><span className="cross"><FaX /></span>  <span className="circle"><FaO /></span></section>
                <section className="game-header-turn"> {(player==1) ? <span className="cross"><FaX /></span>:<span className="circle"><FaO /></span>} </section>
                <section className="game-header-return" onClick={comeBack}><FaArrowRotateRight /></section>
            </article>
            <Board player={player} setPlayer={setPlayer} game={state} setGame={setState} />
            <article className="game-footer">
                <section className="game-footer-you">
                    <h4>You</h4>
                    <h2>{ties.you}</h2>
                </section>
                <section className="game-footer-ties">
                    <h4>Ties</h4>
                    <h2>{ties.ties}</h2>
                </section>
                <section className="game-footer-cpu">
                    <h4>CPU</h4>
                    <h2>{ties.cpu}</h2>
                </section>
            </article>
        </section>
    )
}

function Board({game, setGame, player, setPlayer}){
    const players = [<FaArrowRotateRight />, <FaX/>, <FaO/>]
    console.log(player);
    const playerhandle = (id, posc)=>{
        if(posc == 0){
            setGame(prev => {
                const newGame = [...prev];
                newGame[id] = player;
                return newGame;
            });
            setPlayer((player==1) ? 2:1)
        }
    }
    return(
        <article className="game-board">
            {game.map((e,i)=>(
                <section onClick={()=>playerhandle(i, e)} className={(e==1) ? "cross":(e==2)?"circle":"space"} key={"position"+i}> {players[e]} </section>
            ))}
        </article>
    )
}
export default Game;