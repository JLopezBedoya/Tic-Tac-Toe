import { useEffect } from "react";
import { FaO, FaX, FaArrowRotateRight } from "react-icons/fa6";
const cases = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
const pieces = [<FaArrowRotateRight />, <FaX/>, <FaO/>]

function Board({game=[], setGame, player, setPlayer, win, data, setWinner}){
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
                setWinner(4)
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
            setWinner(4)
        }
        if(win.length>0){
            let user = (game[win[0]] == ((data.icon) ? 1:2)) ? 1:2
            setWinner(user)
        }
        cpu = (data.game) ? true:player==((data.icon) ? 1:2);
        if (!cpu && win.length==0){
            const plays = behavior(2);
            const id = searchPosition(plays)
            setTimeout(()=>{
                playerhandle(id,0)
            }, 500)
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
export default Board;