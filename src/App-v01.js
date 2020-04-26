import React, { Component } from 'react'
import './App.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const LISTWORDS = [
  'JAVASCRIPT',
  'IPHONE',
  'SAMSUNG',
  'IOS',
  'NAVIGATEUR',
  'ORDINATEUR',
  'UNITAIRE',
  'CLAVIER',
  'LANGAGE',
  'SCRIPT',
]

const VISUAL_PAUSE_MSECS = 750

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lettersAlphabet: ALPHABET,
      cards: this.generateCards(),
      letterClicked: [],
      matchedCardIndices: [],
    }
  }

  generateCards() {
    const randomItem = LISTWORDS[Math.floor(Math.random() * LISTWORDS.length)]
    return randomItem.split('')
  }

  //Affiche la bonne classe
  getFeedbackForCard(letter) {
    const { matchedCardIndices } = this.state
    const indexCardMatched = matchedCardIndices.includes(letter)
    return indexCardMatched ? 'visible' : 'hidden'
  }

  getFeedbackForLetter(letter) {
    const { lettersAlphabet, letterClicked } = this.state
    console.log('letterClicked', letterClicked)
    const indexLetterMatched = letterClicked.includes(letter)
    console.log('indexLetterMatched', indexLetterMatched)
    return indexLetterMatched ? 'alreadyClicked' : ''
  }

  // Arrow fx for binding
  handleLetterClick = (letter) => {
    console.log('%c handleLetterClick =>', 'color: blue;', letter)
    const { letterClicked, matchedCardIndices } = this.state

    if (letterClicked.includes(letter)) {
      return
    }

    this.setState({ letterClicked: [...letterClicked, letter] })

    this.handleMatchedLetter(letter)
  }

  handleMatchedLetter(letter) {
    const { cards, letterClicked, matchedCardIndices } = this.state
    const cardMatched = cards.includes(letter)
    if (cardMatched) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, letter],
      })
    }
  }

  render() {
    const { cards, lettersAlphabet, matchedCardIndices } = this.state
    const won = matchedCardIndices.length === cards.length
    return (
      <div className="App-game">
        <div className="App-hangman">
          <span className="App-hangman-game">
            {cards.map((card, index) => (
              <Card
                card={card}
                key={index}
                index={index}
                feedback={this.getFeedbackForCard(card)}
              />
            ))}
          </span>
        </div>
        <div className="App-alphabet">
          <span className="App-alphabet-letter">
            {lettersAlphabet.map((letter, index) => (
              <Letter
                letter={letter}
                key={index}
                index={index}
                feedback={this.getFeedbackForLetter(letter)}
                onClick={this.handleLetterClick}
              />
            ))}
          </span>
        </div>
        <div className="App-win">{won && <span>Gagné</span>}</div>
      </div>
    )
  }
}

const HIDDEN_SYMBOL = '❓'

const Card = ({ card, feedback, index }) => (
  <div className={`card ${feedback}`}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

const Letter = ({ letter, feedback, index, onClick }) => (
  <div className={`letter ${feedback}`} onClick={() => onClick(letter)}>
    <span className="symbol">{letter}</span>
  </div>
)

export default App
