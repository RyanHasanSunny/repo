import React from 'react';
import '../../Styles/LogoDesign.css';
import graphicDesignImage1 from '../../assets/Logo.svg';
import graphicDesignImage2 from '../../assets/3dicon.svg';
import graphicDesignImage3 from '../../assets/Videoediting.svg';

function Card({ title, description, type, serviceItems  }) {
    // Data for different card types
    const cardData = {
        Brand_Identity_Design: {
            image: graphicDesignImage1,
        },
        Print_and_Marketing_Materials: {
            image: graphicDesignImage1, // Replace with actual image import
        },
        Digital_Graphics: {
            image: graphicDesignImage1, // Replace with actual image import
        },
        Packaging_and_Merchandises: {
            image: graphicDesignImage1, // Replace with actual image import
        },
        Character_Modeling: {
            image: graphicDesignImage2, // Replace with actual image import

        },
        Product_Visualization: {
            image: graphicDesignImage2, // Replace with actual image import

        },
        Architectural_Rendering: {
            image: graphicDesignImage2, // Replace with actual image import

        },
        Hard_Surface_Modeling: {
            image: graphicDesignImage2, // Replace with actual image import

        },
        Video_Editing: {
            image: graphicDesignImage3, // Replace with actual image import

        },
        Motion_Graphics: {
            image: graphicDesignImage3, // Replace with actual image import

        },
        

    };

    const currentCardData = cardData[type] || {};

    return (
        <div className="logoDesign-container">
            <div className="logoDesign-panel">
                <div className="service-legend">
                    <p className="legend">{title}</p>
                </div>

            
                <div className="line1" />
                {/* <div className="line2" /> */}
                <div className="logoDesign-descriptionholder">


                {currentCardData.image && (
                    <img src={currentCardData.image} alt={title} className="service-image2" />
                )}

                    <div className="logoDesign-description">
                        <p>
                        {description}
                        </p>

                        <div className="serviceitems">
                {serviceItems && serviceItems.map((item, index) => (
                    <div key={index} className='serviceitem'>
                        <h1>{item}</h1>
                    </div>
                ))}
            </div>
                    </div>


                </div>
                <div className="line3" />



            </div>
        </div>
    );
}

export default Card;