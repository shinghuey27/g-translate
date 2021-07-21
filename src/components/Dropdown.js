import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({label,options,selected,onSelectedChange}) => {

    const [open, setOpen] = useState (false);  
    const ref = useRef();  


    useEffect( () => {
        //callback
        const onBodyClick =  (event) => {
            //this code is click dropdown item will close dropdown
            if (ref.current.contains(event.target)) {
                return;
            }
            // until here 
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick, {capture : true});

        //cleanup
        return () => {
            document.body.removeEventListener('click', onBodyClick, {capture : true});
        };
    },[]);

    const renderedOptions = options.map((option) => {
        if(option.value === selected.value){
            return null;
        }
        return(
            <div 
            key = {option.value} 
            className = "item"
            onClick={() => {
                //('Item Click')
                onSelectedChange(option)
            }}
            >
                {option.label}
            </div>
        );
    });

    
    return (
    <div ref = {ref} className = "ui form">
        <div className = "field">
            <label className = "label">
                {label}
            </label>
            <div 
            onClick = {() =>{
                //('Dropdown click')
                setOpen(!open)
            }}
            className={`ui selection dropdown ${open ? 'visible active': ''}`}
            >
                <i className = "dropdown icon">
                </i>

                <div className = "text">{selected.label}</div>
                <div className = {`menu ${open ? 'visible transition' : ''}`}>
                    {renderedOptions}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Dropdown;