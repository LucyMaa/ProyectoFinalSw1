type Recipe = {
    id: number,
    name: string,
    weight: number
}

export type Ingredients = {
    dish_id: number
    foodName: string
    hasRecipe: boolean
    imageId: number
    is_combo: boolean
    recipe: Recipe[] | []
}

type Ingrediente = {
    nombre: string
}

type GuardarComida = {
    nombrecomida: string,
    ingredientes: Ingrediente[]
}

type GuardarComidaRestaurant = {
    idcomida: number,
    restaurantes: { id: number, precio: number }[]
}

type Comida = {
    id: number
    nombre: string
}

type RestaurantesPos = {
    Precio: number,
    restaurant: {
        nombre: string
        latitud: number
        longitud: number
    }
}
