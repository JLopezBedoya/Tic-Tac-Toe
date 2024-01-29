import { useState } from "react";
import { FaO, FaX } from "react-icons/fa6";
function Menu({data, SetData}){
    const [option, setOption] = useState(true)
    const StartGame = (vs)=>{
        SetData({
            show: false, 
            icon: option, 
            game: vs, 
        })
    }
    return(
        <div className="menu" style={{left: ((data.show) ? "0":"200%")}}>
            <article className="menu-header">
                <h1><span className="cross"><FaX /></span>  <span className="circle"><FaO /></span></h1>
            </article>
            <article className="menu-select">
                <div className="menu-select-text"><h3>Pick Player Mark</h3></div>
                <section>
                    <div className="selected" style={{left: (option) ? "0":"48%"}}></div>
                    <div className="options">
                        <div className="options-buttons" onClick={()=>setOption(true)}>
                            <p><FaX /></p>
                        </div>
                        <div className="options-buttons" onClick={()=>setOption(false)}>
                            <p><FaO /></p>
                        </div>
                    </div>
            </section>
                <div className="menu-select-text"><h3>Who goes first is random</h3></div>
            </article>
            <article onClick={()=>StartGame(false)} className="menu-button menu-button-up">
                New Game (Vs CPU)
            </article>
            <article onClick={()=>StartGame(true)} className="menu-button menu-button-down">
                New Game (Vs Player)
            </article>
        </div>
    )
}
export default Menu;