import React, { useState, useEffect, FC } from "react";
import StarIcon from "./StarIcon";
import "./_Star.scss";

export interface IRatingProps {
    /**set true or false*/
    disableHandler?: boolean;
    /**set "sm" | "md" | "lg" */
    starSize?: string;
    /**set custom classname by sending in a prop*/
    classNames?: string;
    /**set star count by using array [1,2,3,4,5]*/
    starCounts?: number[];
    /**set customized default value of star. Example: 3*/
    customRatingValue?: number;
    /**set true or false to activate label on hover*/
    hoverLabel?: boolean;
    /**set custom icon size by sending prop in. Example: "75px" */
    customSize?: string;
    /**set label title by sending in prop. Example: "TESTING LABEL"*/
    labelTitle?: string;
    /**send addon-action from storybook as a prop */
    onChange?: ()=>any
}

export type patRatingProps = IRatingProps;

export const Rating: FC<patRatingProps> = (props: any) => {
    const {
        disableHandler,
        starSize,
        classNames,
        starCounts,
        customRatingValue,
        hoverLabel,
        customSize,
        labelTitle,
        customStarCount,
        onChange
    } = props;

    const [rating, setRating] = useState<number>(customRatingValue);
    const [hoverRating, setHoverRating] = useState<number>(0);
    // const [starCounts, setstarCounts] = useState<number[]>(starCounts);
    const [disableCss, setDisableCss] = useState<string>("");
    const [ratingLabel, setRatingLabel] = useState<string>("");

    const starLabel: any = {
        1: "Useless",
        2: "Poor",
        3: "OK",
        4: "Good",
        5: "Excellent"
    };

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

    //if disabled add disabled css
    useEffect(() => {
        if (disableHandler) {
            setDisableCss("disabled");
        }
    });

    //loop through starlabel object 
    useEffect(() => {
        for (let i = 0; i < starCounts.length; i++) {
            if (hoverRating >= starCounts[i]) {
                setRatingLabel(starLabel[hoverRating]);
            }
        }
    });

    //create star using loop and push it to array then map it.
    // const starMaker = () =>{
    //     let starArray:any[] = []
    //     for(let i=0;i<customStarCount;i++){
    //         let cStarCount = <div>TEST</div>
    //         starArray.push(cStarCount)
    //     }
    //     console.log(starArray)
    //     return starArray
    // }

    return (
        <div>
            {starCounts.map((index: number) => {
                return (
                    <button
                        key={index}
                        className={`${classNames} star-btn ${disableCss}`}
                        onMouseEnter={() => highlite(index)}
                        onMouseLeave={() => removeHighlite()}
                        onClick={() => {
                            saveRating(index)
                            onChange(index)//storybook action addon
                        }}
                        disabled={disableHandler}
                        value={index}
                    >
                        <StarIcon
                            starSize={starSize}
                            hoverRating={hoverRating}
                            rating={rating}
                            index={index}
                            customSize={customSize}
                            starCounts={starCounts}
                        />
                    </button>
                );
            })}
            <label>{hoverLabel ? ratingLabel : ""}</label>
            <p>{labelTitle}</p>
        </div>
    );
};

Rating.defaultProps = {
    starSize: "sm",
    disableHandler: false,
    starCounts: [1, 2, 3, 4, 5],
};

export default Rating;