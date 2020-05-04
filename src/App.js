import React, { Component } from 'react'
import words from './words'
import { randomWord, lengthWord } from './word'
import './App.scss'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
let Word = randomWord(words)
let WordLength = lengthWord(Word)

const DEFAULT_STATE = {
  lettersAlphabet: ALPHABET,
  cards: Word,
  cardsLength: WordLength.length,
  letterClicked: [],
  matchedCardIndices: [],
  numberLimit: WordLength.length + 3,
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lettersAlphabet: ALPHABET,
      cards: Word,
      cardsLength: WordLength.length,
      letterClicked: [],
      matchedCardIndices: [],
      numberLimit: WordLength.length + 3,
    }
  }

  // Arrow fx for binding
  handleLetterClick = (letter) => {
    const { letterClicked, cards, matchedCardIndices } = this.state
    console.log('handleLetterClick')

    if (letterClicked.includes(letter)) {
      return
    }

    this.setState({ letterClicked: [...letterClicked, letter] })

    const cardMatched = cards.includes(letter)
    if (cardMatched) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, letter],
      })
    } else {
      this.setState((prevState) => ({
        numberLimit: prevState.numberLimit - 1,
      }))
    }
  }

  handleNewGame = () => {
    let Word = randomWord(words)
    let WordLength = lengthWord(Word)
    this.setState({
      lettersAlphabet: ALPHABET,
      cards: Word,
      cardsLength: WordLength.length,
      letterClicked: [],
      matchedCardIndices: [],
      numberLimit: WordLength.length + 3,
    })
  }

  render() {
    const {
      cards,
      lettersAlphabet,
      matchedCardIndices,
      letterClicked,
      cardsLength,
      numberLimit,
    } = this.state

    const won = matchedCardIndices.length === cardsLength
    return (
      <div className="Hangman">
        <h1>Jeux du Pendu</h1>
        <h2>Développé par Steven Lassausse</h2>
        <div className="Hangman-Block">
          <div className="Hangman-Block-Card">
            {cards.map((letter, index) => (
              <Card
                letter={letter}
                key={index}
                matchedCardIndices={matchedCardIndices}
              />
            ))}
          </div>
        </div>
        <div className="Hangman-Block">
          <div className="Hangman-Block-Card Hangman-Block-Remaining">
            <span className="textRemaining">
              Nombre d'essais restants : {numberLimit}
            </span>
          </div>
        </div>
        <div className="Hangman-Block">
          <div className="Hangman-Block-Card Hangman-Block__Letter">
            {!won ? (
              lettersAlphabet.map((letter, index) => (
                <Letter
                  letter={letter}
                  letterClicked={letterClicked}
                  key={index}
                  onClick={this.handleLetterClick}
                />
              ))
            ) : (
              <span className="newGame" onClick={this.handleNewGame}>
                Nouvelle partie
              </span>
            )}
          </div>
        </div>
        <div className="Hangman-Block">
          <div className="Hangman-Block-Card Hangman-Block-Win">
            {won ? (
              <span className="textWin">Gagné !</span>
            ) : numberLimit === 0 ? (
              <div>
                <span className="textLoose">Perdu !</span>
                <span className="newGame" onClick={this.handleNewGame}>
                  Nouvelle partie
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

const HIDDEN_SYMBOL = '__'

const Card = ({ letter, matchedCardIndices }) => {
  const matched = matchedCardIndices.includes(letter)

  return (
    <div className={`card ${matched ? 'visible' : ''}`}>
      <span className="symbol">{matched ? letter : HIDDEN_SYMBOL}</span>
    </div>
  )
}

const Letter = ({ letter, letterClicked, onClick }) => {
  const matched = letterClicked.includes(letter)

  return (
    <div
      className={`card ${matched ? 'clicked' : ''}`}
      onClick={() => onClick(letter)}
    >
      <span className="symbol">{letter}</span>
    </div>
  )
}

export default App
