import React from 'react';
import Image from 'next/image';
import './Cards.css';

const Cards = () => {
  const cardsData = [
    {
      title: 'Card 1',
      description: 'This is the description for card 1.',
      image: 'https://image.cnbcfm.com/api/v1/image/107154953-1669045530563-gettyimages-494617082-000077558697_Unapproved.jpeg?v=1669129045&w=929&h=523&vtcrop=y',
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.',
      image: 'https://image.cnbcfm.com/api/v1/image/107154953-1669045530563-gettyimages-494617082-000077558697_Unapproved.jpeg?v=1669129045&w=929&h=523&vtcrop=y',
    },
    {
      title: 'Card 3',
      description: 'This is the description for card 3.',
      image: 'https://image.cnbcfm.com/api/v1/image/107154953-1669045530563-gettyimages-494617082-000077558697_Unapproved.jpeg?v=1669129045&w=929&h=523&vtcrop=y',
    },
    {
      title: 'Card 4',
      description: 'This is the description for card 4.',
      image: 'https://image.cnbcfm.com/api/v1/image/107154953-1669045530563-gettyimages-494617082-000077558697_Unapproved.jpeg?v=1669129045&w=929&h=523&vtcrop=y',
    },
    {
      title: 'Card 5',
      description: 'This is the description for card 5.',
      image: 'https://image.cnbcfm.com/api/v1/image/107154953-1669045530563-gettyimages-494617082-000077558697_Unapproved.jpeg?v=1669129045&w=929&h=523&vtcrop=y',
    },
    {
      title: 'Card 6',
      description: 'This is the description for card 6.',
      image: 'https://image.cnbcfm.com/api/v1/image/107154953-1669045530563-gettyimages-494617082-000077558697_Unapproved.jpeg?v=1669129045&w=929&h=523&vtcrop=y',
    },
  ];

  return (
    <div className="container">
      <h2 className="heading">Our Cards</h2>
      <div className="cards-row">
        {cardsData.map((card, index) => (
          <div key={index} className="card">
            <div className="card-image">
              <Image src={card.image} alt={card.title} layout="responsive" width={300} height={200} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
