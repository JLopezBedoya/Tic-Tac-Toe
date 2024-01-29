import { useState } from "react";
import { FaO } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
function Menu(){
    const [option, setOption] = useState("0")
    return(
        <div className="menu">
            <article className="menu-header">
                <h1><span className="cross"><FaXmark /></span>  <span className="circle"><FaO /></span></h1>
            </article>
            <article className="menu-select">
                <div className="menu-select-text"><h3>Pick Player Mark</h3></div>
                <section>
                    <div className="selected" style={{left: option}}></div>
                    <div className="options">
                        <div className="options-buttons" onClick={()=>setOption("0")}>
                            <p><FaXmark /></p>
                        </div>
                        <div className="options-buttons" onClick={()=>setOption("48%")}>
                            <p><FaO /></p>
                        </div>
                    </div>
            </section>
                <div className="menu-select-text"><h3>Who goes first is random</h3></div>
            </article>
            <article className="menu-button menu-button-up">
                New Game (Vs CPU)
            </article>
            <article className="menu-button menu-button-down">
                New Game (Vs Player)
            </article>
        </div>
    )
}
export default Menu;