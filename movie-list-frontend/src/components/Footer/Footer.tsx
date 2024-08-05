import React from 'react'

const Footer = ({ relativePosition = false }: { relativePosition: Boolean }) => {
    return (
        <div className={`${!relativePosition ? 'svg-container ' : 'svg-container2'}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 150"
                preserveAspectRatio="none"
            >
                <path
                    fill="#0b444a"
                    d="M0, 20 C480, 20 480, 130 960, 100 C1440, 55 1549, 50 1440, 20 V150 H0 Z"
                ></path >
                <path
                    fill="#264c5a"
                    opacity="0.75"
                    d="M0,65 Q360,150 720,75 T1440,90 V150 H0 Z"
                ></path >
            </svg>
        </div >
    )
}

export default Footer