import { useState } from "react";

function Menu(){
    const [option, setOption] = useState()
    return(
        <div className="menu">
            <article className="menu-header">
                <h1>X O</h1>
            </article>
            <article className="menu-select">
                <div className="menu-select-text"><h3>Pick Player Mark</h3></div>
                <section>
                    <div className="selected" style={{left: option}}></div>
                    <div className="options">
                        <div onClick={()=>setOption("0")}>
                            <p>X</p>
                        </div>
                        <div onClick={()=>setOption("48%")}>
                            <p>O</p>
                        </div>
                    </div>
            </section>
                <div className="menu-select-text"><h3>there's a text over here that i can't read</h3></div>
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