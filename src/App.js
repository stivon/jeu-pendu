import React, { Component } from 'react'
import words from './words'
import { randomWord, lengthWord } from './word'
import './App.scss'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const WORD = randomWord(words)
const WORDLENGTH = lengthWord(WORD)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lettersAlphabet: ALPHABET,
      cards: WORD,
      cardsLength: WORDLENGTH.length,
      letterClicked: [],
      matchedCardIndices: [],
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
    }
  }

  render() {
    const {
      cards,
      lettersAlphabet,
      matchedCardIndices,
      letterClicked,
      cardsLength,
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
          <div className="Hangman-Block-Card Hangman-Block__Letter">
            {lettersAlphabet.map((letter, index) => (
              <Letter
                letter={letter}
                letterClicked={letterClicked}
                key={index}
                onClick={this.handleLetterClick}
              />
            ))}
          </div>
        </div>
        <div className="Hangman-Block">
          <div className="Hangman-Block-Card Hangman-Block-Win">
            {won && <span className="textWin">Gagné !</span>}
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
