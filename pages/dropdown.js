import React, { useEffect, useState } from "react";
import Image from 'next/image';
import arrow from '../assets/downarrow.png';

const Dropdown = ({ placeHolder, options, onChange }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const handler = () => setShowMenu(false);
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        }
    })
    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    const getDisplay = () => {
        if (selectedValue) {
            return selectedValue.job;
        }
        return placeHolder;
    };
    const onItemClick = (option) => {
        setSelectedValue(option);
        onChange(option.job)
    }
    const isSelected = (option) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue.job === option.job;
    }

    return (
        <div className="dropdown-container">
        <div onClick={handleInputClick} className="dropdown-input">
            <div className="dropdown-selected-value">{getDisplay()}</div>
            <div className="dropdown-tools">
            <div className="dropdown-tool">
                <Image src={arrow} alt="arrow"/>
            </div>
            </div>
            {showMenu && (<div className="dropdown-menu">
                {options.map((option) => (
                    <div onClick={() => onItemClick(option)} key={option.job} className={`dropdown-item ${isSelected(option) && "selected"}`}>{option.job}</div>
                ))}
            </div>)}
        </div>
        </div>
    );
};

export default Dropdown;
