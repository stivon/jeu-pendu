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
  getFeedbackForCard(index) {
    const { matchedCardIndices, cards } = this.state
    const indexCardMatched = matchedCardIndices.includes(cards[index])
    return indexCardMatched ? 'visible' : 'hidden'
  }

  getFeedbackForLetter(index) {
    const { lettersAlphabet, letterClicked } = this.state
    const indexLetterMatched = letterClicked.includes(lettersAlphabet[index])
    return indexLetterMatched ? 'alreadyClicked' : ''
  }

  // Arrow fx for binding
  handleLetterClick = (index) => {
    const { letterClicked, lettersAlphabet } = this.state

    if (letterClicked.includes(lettersAlphabet[index])) {
      return
    }

    this.setState({ letterClicked: [...letterClicked, lettersAlphabet[index]] })

    this.handleMatchedLetter(index)
  }

  handleMatchedLetter(index) {
    const { cards, lettersAlphabet, matchedCardIndices } = this.state
    const cardMatched = cards.includes(lettersAlphabet[index])
    if (cardMatched) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, lettersAlphabet[index]],
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
                feedback={this.getFeedbackForCard(index)}
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
                feedback={this.getFeedbackForLetter(index)}
                onClick={this.handleLetterClick}
              />
            ))}
          </span>
        </div>
        <div className="App-win">
          {won && <span className="text">Gagné !</span>}
        </div>
      </div>
    )
  }
}

const HIDDEN_SYMBOL = '__'

const Card = ({ card, feedback }) => (
  <div className={`card ${feedback}`}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

const Letter = ({ letter, feedback, index, onClick }) => (
  <div className={`letter ${feedback}`} onClick={() => onClick(index)}>
    <span className="symbol">{letter}</span>
  </div>
)

export default App
