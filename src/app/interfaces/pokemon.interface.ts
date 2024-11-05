export interface Pokemon {
    name: string
    url: string
    id? : string
}
export interface PokemonListRes{
    count: number
    next: string | null
    previous: string | null
    results: Pokemon[]

}
export interface Ability {
    ability: { name: string }
    is_hidden: boolean
}
export interface Stat {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export interface Move {
    move: {
        name: string
        url: string
    }
}

export interface Type {
    type: { name: string }
}

export interface PokemonDetails {
    name: string
    id: number
    sprites: {
        front_default: string
        front_shiny: string
    }
    base_experience: number
    height: number
    weight: number
    abilities: Ability[]
    moves: Move[]
    types: Type[]
    stats: Stat[]
}