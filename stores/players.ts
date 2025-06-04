export const usePlayerStore = defineStore('players', {
    state: () => ({
        list: [] as { name: string; ads: string[] }[]
    }),
    actions: {
        addPlayer(name: string) {
            this.list.push({ name, ads: [] })
        },
        removePlayer(index: number) {
            this.list.splice(index, 1)
        },
        editPlayer(index: number, name: string) {
            this.list[index].name = name
        },
        linkAd(index: number, ad: string) {
            this.list[index].ads.push(ad)
        }
    },
    persist: true
})
