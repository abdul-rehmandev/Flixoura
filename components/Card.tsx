"use client"

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

interface ResultTypes {
  id: number;
  title?: string;
  name?: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  first_air_date?: string;
}

interface CardProps {
  result: ResultTypes;
}

const Card = ({ result }: CardProps) => {
  const title = result.title || result.name;
  const truncatedTitle = title ? (title.length > 20 ? `${title.substring(0, 20)}...` : title) : '';
  const imageUrl = result.poster_path
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
    : '/placeholder-image.jpg';

  return (
    <StyledWrapper>
      <div className="card">
        <div className="wrapper">
          <div className="card-image">
            <Image
              src={imageUrl}
              alt={title || 'Movie/Show poster'}
              width={120}
              height={120}
              style={{ objectFit: 'cover', borderRadius: "5px" }}
            />
          </div>
          <div className="content">
            <small className="title" title={title}>{truncatedTitle}</small>
          </div>
          <Link href={`/details/${result.id}`} className='card-btn flex justify-center items-center'>
            View Details
          </Link>
        </div>
        <p className="tag">{result.release_date || result.first_air_date} - {result.vote_average.toFixed(1)}</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
  }
  .wrapper {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .card-image {
    width: 100%;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    font-weight: 900;
    transition: all 0.3s;
  }
  .content {
    height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .title {
    font-size: 0.72em;
    text-transform: uppercase;
    font-weight: 500;
    color: #4d4d4d;
  }
  .price {
    font-size: 1em;
    font-weight: 700;
  }
  .old-price {
    font-size: 0.7em;
    text-decoration: line-through;
    color: #adadad;
  }
  .card-btn {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background-color: rgb(24, 24, 24);
    border: none;
    border-radius: 40px;
    color: white;
    transition: all 0.3s;
    cursor: pointer;
    font-weight: 500;
  }
  .card:hover .card-image {
    height: 120px;
  }

  .card:hover .title {
    background-color: greenyellow;
    color: rgb(0, 0, 0);
    padding: 1.25px 4px;
    border-radius: 15px;
    font-size: 0.75em;
    font-weight: 500; 
  }

  .card:hover .card-btn {
    margin-top: 0;
  }
  .card-btn:hover {
    background-color: greenyellow;
    color: rgb(35, 35, 35);
  }
  .card:hover {
    background-color: white;
  }

  .tag {
    position: absolute;
    background-color: greenyellow;
    color: rgb(0, 0, 0);
    left: 12px;
    top: 12px;
    padding: 3px 6px;
    border-radius: 15px;
    font-size: 0.75em;
    font-weight: 500;
  }`;

export default Card;
