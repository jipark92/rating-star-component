import React, { useState, useEffect } from 'react'
import StarIcon from './StarIcon'

export default function HalfStar(props: any) {

    const { count } = props

    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);


    //add color on mouse enter
    const highlite = (index: number) => {
        setHoverRating(index);
    };

    //remove color on mouse leave
    const removeHighlite = () => {
        setHoverRating(0);
    };

    //save color/rating on click
    const saveRating = (index: number) => {
        setRating(index);
    };

    const stars = () => {
        let starArr = [];
        for (let i = 1; i <= count; i++) {
            starArr.push(i);
        }
        return starArr;
    };

    return (
        <div>
            {stars().map((i) => {
                return (
                    <StarIcon />
                )
            })}
        </div>
    )
}
