"use client"
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUser } from "@clerk/nextjs";
import { AddToFavouritesList, CheckIfMovieInFavourites, RemoveFromFavourites } from '@/actions/addtofavourites.actions';
import { toast } from "sonner";
import Link from 'next/link';

interface PageProps {
    movieID: string;
}

const AddToFavourites = ({ movieID }: PageProps) => {
    const { user } = useUser();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (user) {
                const isInFavorites = await CheckIfMovieInFavourites(movieID, user.primaryEmailAddress?.emailAddress || "");
                setIsFavorite(isInFavorites);
            }
        };
        checkFavoriteStatus();
    }, [user, movieID]);

    const handleToggleFavorite = async (movID: string) => {
        if (!user) {
            toast.error("Please sign in to manage favorites");
            return;
        }

        try {
            if (isFavorite) {
                const result = await RemoveFromFavourites(movID, user.primaryEmailAddress?.emailAddress || "");
                if (result.success) {
                    setIsFavorite(false);
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } else {
                const result = await AddToFavouritesList(movID, user.primaryEmailAddress?.emailAddress || "");
                if (result.success) {
                    setIsFavorite(true);
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            }
        } catch (error) {
            toast.error("Failed to update favorites");
        }
    }

    return (
        <StyledWrapper>
            <div className="heart-container">
                {!user ? (
                    <>
                        <Link href="/sign-in">
                            <input
                                type="checkbox"
                                className="checkbox"
                                id="Give-It-An-Id"
                                checked={isFavorite}
                                onChange={() => handleToggleFavorite(movieID)}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="Give-It-An-Id"
                            checked={isFavorite}
                            onChange={() => handleToggleFavorite(movieID)}
                        />
                    </>
                )}
                <div className="svg-container">
                    <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                        </path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                        </path>
                    </svg>
                    <svg className="svg-celebrate" width={100} height={100} xmlns="http://www.w3.org/2000/svg">
                        <polygon points="10,10 20,20" />
                        <polygon points="10,50 20,50" />
                        <polygon points="20,80 30,70" />
                        <polygon points="90,10 80,20" />
                        <polygon points="90,50 80,50" />
                        <polygon points="80,80 70,70" />
                    </svg>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .heart-container {
    --heart-color: rgb(255, 91, 137);
    position: relative;
    width: 30px;
    height: 30px;
    transition: .3s;
  }

  .heart-container .checkbox {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  .heart-container .svg-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .heart-container .svg-outline,
          .heart-container .svg-filled {
    fill: var(--heart-color);
    position: absolute;
  }

  .heart-container .svg-filled {
    animation: keyframes-svg-filled 1s;
    display: none;
  }

  .heart-container .svg-celebrate {
    position: absolute;
    animation: keyframes-svg-celebrate .5s;
    animation-fill-mode: forwards;
    display: none;
    stroke: var(--heart-color);
    fill: var(--heart-color);
    stroke-width: 2px;
  }

  .heart-container .checkbox:checked~.svg-container .svg-filled {
    display: block
  }

  .heart-container .checkbox:checked~.svg-container .svg-celebrate {
    display: block
  }

  @keyframes keyframes-svg-filled {
    0% {
      transform: scale(0);
    }

    25% {
      transform: scale(1.2);
    }

    50% {
      transform: scale(1);
      filter: brightness(1.5);
    }
  }

  @keyframes keyframes-svg-celebrate {
    0% {
      transform: scale(0);
    }

    50% {
      opacity: 1;
      filter: brightness(1.5);
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
      display: none;
    }
  }`;

export default AddToFavourites;
