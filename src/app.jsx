import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring"

export default function App() {
    const [options, setOptions] = useState(null)
    const [highScore, setHighScore] = useState(0)

    useEffect(() => {
      //loads when game starts  
    }, [])

    return (
        <div>
            <div className="container">
                <h1>Celebrity Memory Game</h1>
                <div>High Score: {highScore}</div>
                <div>
                    {options === null ? (
                        <>
                            <button onClick={() => setOptions(12)}>Easy</button>
                            <button onClick={() => setOptions(18)}>Medium</button>
                            <button onClick={() => setOptions(24)}>Hard</button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    const prevOptions = options
                                    setOptions(null)
                                    setTimeout(() => {
                                        setOptions(prevOptions)
                                    }, 5)
                                }}
                            >
                                Start Over
                            </button>
                            <button onClick={() => setOptions(null)}>Main Menu</button>
                        </>
                    )}
                </div>
            </div>
            
            {options ? (
                <MemoryGame
                    options={options}
                    setOptions={setOptions}
                    highScore={highScore}
                    setHighScore={setHighScore}
                />
            ) : (
                    <h2>Choose a difficulty level to begin!</h2>
                    )}
        </div>
    )
 }
            
function MemoryGame({ options, setOptions, highScore, setHighScore }) {
    const [game, setGame] = useState([])
    const [flippedCount, setFlippedCount] = useState(0)
    const [flippedIndexes, setFlippedIndexes] = useState([])

    const headshots = [
        '../img/ba-1.jpg',
        '../img/ba-2.jpg',
        '../img/bf-1.jpg',
        '../img/bf-2.jpg',
        '../img/cc-1.jpg',
        '../img/cc-2.jpg',
        '../img/hf-1.jpg',
        '../img/hf-2.jpg',
        '../img/jl-1.jpg',
        '../img/jl-2.jpg',
        '../img/kr-1.jpg',
        '../img/kr-2.jpg',
        '../img/lfb-1.jpg',
        '../img/lfb-2.jpg',
        '../img/ll-1.jpg',
        '../img/ll-2.jpg',
        '../img/mr-1.jpg',
        '../img/mr-2.jpg',
        '../img/slj-1.jpg',
        '../img/slj-2.jpg',
        '../img/ws-1.jpg',
        '../img/ws-2.jpg',
        '../img/yb-1.jpg',
        '../img/yb-2.jpg',
    ]
    
    useEffect(() => {
        const newGame = []
        for (let i = 0; i < options; i++) {
            const firstOption = {
                id: 2 * i,
                headshotId: i,
                headshot: headshots[i],
                flipped: false,
            }
            const secondOption = {
                id: 2 * i + 1,
                headshotId: i + 1,
                headshot: headshots[i + 1],
                flipped: false,
            }

            newGame.push(firstOption)
            newGame.push(secondOption)
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setGame(shuffledGame)
    }, [])

    useEffect(() => {
        //loads when game variable changes
    }, [game])

    if (flippedIndexes.length === 2) {
        //when two cards have been flipped over
    }

    if (game.length === 0) return <div>loading...</div>
    else {
        return (
            <div id="cards">
                {game.map((card, index) => (
                    <div className="card" key={index}>
                        <Card
                            id={index}
                            headshot={card.headshot}
                            game={game}
                            flippedCount={flippedCount}
                            setFlippedCount={setFlippedCount}
                            flippedIndexes={flippedIndexes}
                            setFlippedIndexes={setFlippedIndexes}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

function Card({
    id,
    headshot,
    game,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,
}) {
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    })

    useEffect(() => {
    console.log('flipped indexes changed')
    }, [flippedIndexes])

    const onCardClick = () => {
        console.log('card clicked')
        set(state => state)
    }

    return <div onClick={onCardClick}>
        <a.div
            className="c back"
            style={{
                opacity: opacity.interpolate(o => 1 - o),
                transform,
            }}
        />
        <a.div
            className="c front"
            style={{
                opacity,
                transform: transform.interpolate(t => `${t} rotateX(180deg)`),
                background: headshot,
            }}
        />
    </div>
}