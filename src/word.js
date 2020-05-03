export function randomWord(Listwords) {
  return Listwords[Math.floor(Math.random() * Listwords.length)].split('')
}

export function lengthWord(word) {
  const uniqueLetter = new Set(word)
  return (word = [...uniqueLetter])
}
