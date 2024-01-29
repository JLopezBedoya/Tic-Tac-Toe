import { useState } from "react";
import { FaO, FaX, FaArrowRotateRight } from "react-icons/fa6";

function Game({data, setData}){
    const [state, setState] = useState([
        0,1,0,
        2,2,0,
        0,0,1
    ])
    const comeBack = ()=>{
        setData({
            show: true, 
            icon: data.icon, 
            game: data.game,
        })
    }
    return(
        <section className="game" style={{left: ((data.show) ? "200%":"0")}}>
            <article className="game-header">
                <section className="game-header-icons"><span className="cross"><FaX /></span>  <span className="circle"><FaO /></span></section>
                <section className="game-header-turn"> {(true) ? <span className="cross"><FaX /></span>:<span className="circle"><FaO /></span>} </section>
                <section className="game-header-return" onClick={comeBack}><FaArrowRotateRight /></section>
            </article>
            <Board game={state} setGame={setState} />
            <article className="game-footer">
                <section className="game-footer-you">
                    <h4>You</h4>
                    <h2>13</h2>
                </section>
                <section className="game-footer-ties">
                    <h4>Ties</h4>
                    <h2>35</h2>
                </section>
                <section className="game-footer-cpu">
                    <h4>CPU</h4>
                    <h2>10</h2>
                </section>
            </article>
        </section>
    )
}

function Board({game, setGame}){
    const players = [<></>, <FaO/>, <FaX/>]
    return(
        <article className="game-board">
            {game.map((e,i)=>(
                <section className={(e==1) ? "circle":"cross"} key={"position"+i}> {players[e]} </section>
            ))}
        </article>
    )
}
export default Game;