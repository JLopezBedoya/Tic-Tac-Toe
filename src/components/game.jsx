import { useState, useEffect } from "react";
import { FaO, FaX, FaArrowRotateRight } from "react-icons/fa6";
import Board from "./board";
const cases = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]

function Game({data, setData, setWinner, state, setState}){
    const [player, setPlayer] = useState()
    useEffect(()=>{
        setWinner(0)
        if(!data.show){
            let random = Math.floor(Math.random()*100)
            setPlayer(random > 50 ? 1:2)
        }
    },[data])
    const comeBack = ()=>{
        setData({
            show: true, 
            icon: data.icon, 
            game: data.game,
        })
    }
    const [ties, setTies] = [{
        you: 16,
        ties: 32,
        cpu: 12
    }]
        useEffect(()=>{
        setState([
        0,0,0,
        0,0,0,
        0,0,0
    ])
    }, [data.show])
    const handleWin = (player)=>{
        const pre = (player==1) ? 2:1
        const position = []
        var winner
        var indexs
        state.forEach((e,i)=>{
            if(e==pre){
                position.push(i)
            }
        })
        for (const e of cases) {
            if (e.every(j => position.includes(j))) {
                winner = true;
                indexs = e
                break;
            }
        }
        return (winner)? indexs:[]
    }
    const win = handleWin(player)
    return(
        <section className="game" style={{left: ((data.show) ? "200%":"0")}}>
            <article className="game-header">
                <section className="game-header-icons"><span className="cross"><FaX /></span>  <span className="circle"><FaO /></span></section>
                <section className="game-header-turn"> {(player==1) ? <span className="cross"><FaX /></span>:<span className="circle"><FaO /></span>} </section>
                <section className="game-header-return" onClick={comeBack}><FaArrowRotateRight /></section>
            </article>
            <Board setWinner={setWinner} data={data} win={win} player={player} setPlayer={setPlayer} game={state} setGame={setState} />
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
export default Game;