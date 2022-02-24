import {
    computer,
    playerOne,
    playerTwo,
    rock,
    paper,
    scissors,
    gameArray,
    draw
} from '../constants/index.js'
import { choose, encode } from '../utils/index.js'

let playerOneScore = 0;
let playerTwoScore = 0;

export const playGame = (stream) => {
    const round = stream.slice(0, 4);
    const gameStateOne = stream.slice(4, 8)
    const maxRound = stream.slice(8, 12)
    // const result = stream.slice(12, 14)
    const gameType = stream.slice(14, 16)
    // const gameRound = parseInt(round, 2)

    const maxRoundInt = parseInt(maxRound, 2)
    let roundInt = parseInt(round, 2)
    console.log({ maxRoundInt, roundInt })

    let playerOneHand;
    // let playerTwoHand;
    let computerHand;

    if (parseInt(gameStateOne, 2)) {
        playerOneHand = gameStateOne.slice(2, 4)
    }

    // if (parseInt(gameStateOne, 2)) {
    //     playerTwoHand = gameStateTwo.slice(2, 4)
    // }

    if (round === '0001') {
        playerOneScore = 0
        playerTwoScore = 0
    }
    
    let endGame = false;
    let rpsWinner;
    if (roundInt >= maxRoundInt) {
        if (playerOneScore > playerTwoScore) {
            rpsWinner = playerOne
        }
        else if (playerTwoScore > playerOneScore) {
            rpsWinner = playerTwo
        }
        else {
            rpsWinner = draw
        }
        endGame = true
        roundInt = 0
    }

    // Player Vs Computer Game Logic
    if (gameType === '00') {
        computerHand = choose(gameArray)
        const winner = handleOperation(computerHand, playerOneHand)
        if (winner === playerOne) playerOneScore += 1
        if (winner === playerTwo || winner === computer) playerTwoScore += 1
        const newRound = roundInt + 1
        return {
            stream: `${round}${gameStateOne}${computer}${computerHand}${winner}${gameType}`,
            score: {
                playerOneScore,
                playerTwoScore
            },
            meta: {
                endGame,
                rpsWinner,
                newRound
            }
        }
    }
    else if (gameType === '01') {
        //PVP
    }
}

const handleOperation = (comp, p1) => {
    if (comp === p1) {
        return draw
    }

    if (comp === rock && p1 === paper) {
        return playerOne
    }
    else if (comp === rock && p1 === scissors) {
        return computer
    }
    else if (comp === paper && p1 === rock) {
        return computer
    }
    else if (comp === paper && p1 === scissors) {
        return playerOne
    }
    else if (comp === scissors && p1 === rock) {
        return playerOne
    }
    else if (comp === scissors && p1 === paper) {
        return computer
    }
}