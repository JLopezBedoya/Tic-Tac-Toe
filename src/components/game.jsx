import { useState, useEffect } from "react";
import { FaO, FaX, FaArrowRotateRight } from "react-icons/fa6";
const cases = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
const pieces = [<FaArrowRotateRight />, <FaX/>, <FaO/>]

function Game({data, setData}){
    const [player, setPlayer] = useState()
    useEffect(()=>{
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
            <Board data={data} win={win} player={player} setPlayer={setPlayer} game={state} setGame={setState} />
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

function Board({game=[], setGame, player, setPlayer, win, data}){
    var cpu = (data.game) ? true:player==((data.icon) ? 1:2);
    const searchPosition = (play) => {
        var move = undefined;
        do {
            const spaces = play.map(e => game[e]);
            if (spaces.includes(0)) {
                move = Math.floor(Math.random() * 3);
            } else {
                break
            }
        } while (game[play[move]])
        if(move==undefined){
            const free = []
            game.forEach((e,i) => {
                if(e==0){
                    free.push(i)
                }
            });
            if(free.length>0){
                return free[0]
            }else{
                alert("Without movements")
            }
        }
        return play[move];
    }
    const playerhandle = (id, posc)=>{
        if(posc == 0 && player!=undefined){
            setGame(prev => {
                const newGame = [...prev];
                newGame[id] = player;
                return newGame;
            });
            setPlayer((player==1) ? 2:1)
        }
    }
    useEffect(()=>{
        if(!game.includes(0)){
            alert("DRAW")
        }
        cpu = (data.game) ? true:player==((data.icon) ? 1:2);
        if (!cpu && win.length==0){
            const plays = behavior(2);
            const id = searchPosition(plays)
            setTimeout(()=>{
                playerhandle(id,0)
            }, 800)
        }
    }, [player, data])
    const behavior = (player)=>{
        const plays = []
        cases.map(e=>{
            const actual = e.map(i=> game[i])
            const probability = actual.map(e=>(e==player) ? 5:(e==0) ? 3:-100)
            plays.push(probability.reduce((a, b) => a + b, 0))
        })
        const play = plays.indexOf(Math.max(...plays));
        return cases[play]
    }
    return(
        <article className="game-board">
            {game.map((e,i)=>(
                <section onClick={()=>(win.length==0 && cpu)?playerhandle(i, e):undefined} className={`board-${((e==1) ? "cross":(e==2)?"circle":"space")}${(win.includes(i))?"-win":""}`} key={"position"+i}> {pieces[e]} </section>
            ))}
        </article>
    )
}
export default Game;