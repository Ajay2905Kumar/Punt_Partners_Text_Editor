import React, { useState } from "react";
import fontsJSON from './Fonts.json';
import './Form.css';

const Form = () => {
    const select = Array('---select---')
    const fonts =select.concat(Reflect.ownKeys(fontsJSON));
    const [fontSelected, setFontSelected] = useState(window.localStorage.getItem('fontFamily') || null);
    const [variantSelected, setVariantSelected] = useState(window.localStorage.getItem('variant') || null);
    const [toggle, setToggle] = useState(window.localStorage.getItem('toggle') || false);
    const [content, setContent] = useState(window.localStorage.getItem('editorContent') || "");
    const handleToggle = () => {
        if(fontSelected!=null && variantSelected!=null){
            if(!toggle){
                document.getElementsByClassName('toggleButton')[0].style='background-color: blue; justify-content: right';
                setToggle(true);
            }
            else{
                document.getElementsByClassName('toggleButton')[0].style='background-color: grey; justify-content: left';
                setToggle(false);
            }
        }
    }
    const saveLocally = () => {
        window.localStorage.setItem('editorContent',content)
        window.localStorage.setItem('fontFamily',fontSelected)
        window.localStorage.setItem('variant',variantSelected)
        window.localStorage.setItem('toggle',toggle)
    }
    return (
        <>
            <label>Font Family: </label>
            <select id="fontFam" required onChange={(e) => setFontSelected(e.target.value === '---select---' ? null : e.target.value)} value={fontSelected}>
                {
                    fonts.map(e => <option value={e}>{e}</option>)
                }
            </select>
            <br />
            <label>Variant: </label>
            <select onChange={(e)=> setVariantSelected(e.target.value === '---select---' ? null : e.target.value)} required value={variantSelected}>
                {
                    fontSelected !== null ? (
                        select.concat(Reflect.ownKeys(fontsJSON[fontSelected])).map((e) => 
                            e.includes('italic') ? <></>:<option value={e}>{e}</option>
                        )
                    ):(
                        select.map((e) => <option value={e}>{e}</option>)
                    )
                }
            </select>
            <br />
            <span style={fontSelected!==null && variantSelected!=null ? 
                Reflect.ownKeys(fontsJSON[fontSelected]).includes(variantSelected+'italic') ? { opacity: 1}: {opacity: 0.5}:{opacity:0.5}}>
                <label>Italic: </label>
                <div className="toggleButton" onClick={handleToggle}>
                    <div className="toggleCircle"></div>
                </div>
            </span>

            <textarea className="textAreaEditor" style={{fontFamily: fontSelected}} value={content} onChange={(e) => setContent(e.target.value)}>{content}</textarea>

            <button onClick={(e) => setContent("")}>Reset</button>
            <button onClick={saveLocally}>Save</button>
        </>
    )
}

export default Form;