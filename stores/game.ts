export const useGameStore = defineStore('game', {
    state: () => ({
        rounds: 0,
        currentTurn: 0,
        players: [] as string[],
        usedWords: [] as string[],
        word: '',
        words: [
            'Glibber Poes', 'Opblaas kip', 'VissenPijper', 'omaWerper',
            'Rotstraal', 'Scheldboer', 'Mocro', 'Ling-Pong', 'SuperSnitch',
            'Cursus', 'Porkel', 'Neusaarappel', '莓果魚'
        ]
    }),
    actions: {
        resetGame() {
            this.rounds = 0
            this.currentTurn = 0
            this.players = []
            this.usedWords = []
            this.word = ''
        },
        nextTurn() {
            const remaining = this.words.filter(w => !this.usedWords.includes(w))
            const randomIndex = Math.floor(Math.random() * remaining.length)
            const word = remaining[randomIndex]
            this.word = word
            this.usedWords.push(word)
            this.currentTurn++
        },
        setPlayers(names: string[]) {
            this.players = [...names]
        },
        setRounds(num: number) {
            this.rounds = num
        }
    },
    persist: true
})