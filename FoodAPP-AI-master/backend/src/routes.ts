import express from 'express';
import {PrismaClient} from '@prisma/client'

type PropsComida = {
    query: {
        nombre: string
    }
}
type Ingrediente = {
    nombre: string
}
type PropsComidaIngredientes = {
    body: {
        nombrecomida: string,
        ingredientes: Ingrediente[]
    }
}

type PropsGuardarcomidaRes = {
    body: {
        idcomida: number,
        restaurantes: { id: number, precio: number }[]
    }
}

type PropsRestaurantesComida = {
    query: {
        nombrecomida: string,
    }
}

export default (prisma: PrismaClient) => {
    const app = express.Router();
    app.get('/', (req, res) => {
        res.status(200).send('hola mundo')

    });
    app.get('/ingredientescomida', async ({query: {nombre}}: PropsComida, res) => {
        if (!nombre) return res.status(401).send({message: "error en los datos"})
        const comida = await prisma.comida.findFirst({
            where: {nombre: nombre},
            include: {ingredientes: {select: {ingrediente: true}}}
        })
        if (comida) return res.json(comida);
        res.status(401).json({message: "Comida no existente."});
    });
    app.get('/restaurantescomida', async ({query: {nombrecomida}}: PropsRestaurantesComida, res) => {
        if (!nombrecomida) return res.status(401).send({message: "comida no encontrada"});
        const res1 = await prisma.restaurant.findMany({
            where: {comidas: {some: {comida: {nombre: nombrecomida}}}},
            /*select: {
                comidas: {select: {Precio: true}, where: {comida: {nombre: nombrecomida}}},
                latitud: true,
                longitud: true,
                nombre: true
            }*/
        })
        const res2 = await prisma.comidasRestaurants.findMany({
            where: {comida: {nombre: nombrecomida}},
            select: {Precio: true, restaurant: {select: {longitud: true, latitud: true, nombre: true}}}
        })
        if (!res1) return res.status(404).send({message: "comida no encontrada"});
        res.send(res2)
    })
    app.post('/guardarcomidares', async ({body: {idcomida, restaurantes}}: PropsGuardarcomidaRes, res) => {
        if (!idcomida || !restaurantes) return res.json({message: 'error'})
        try {
            const comida = await prisma.comida.findFirst({where: {id: idcomida}});
            if (!comida) return res.status(401).json({message: "Comida no existente"})
            for (let restaurant of restaurantes) {
                await prisma.comida.update({
                    where: {id: idcomida},
                    data: {restaurants: {create: [{restaurantId: restaurant.id, Precio: restaurant.precio}]}}
                })
            }
            res.send({message: "guardado con exito"})
        } catch (e) {
            res.status(401).send({message: "Error ocurred"})
        }
    })

    app.post('/guardarcomida', async ({body: {nombrecomida, ingredientes}}: PropsComidaIngredientes, res) => {
        if (!nombrecomida || !ingredientes) return res.status(401).json({message: "insuficientes datos"})
        const comida = await prisma.comida.create({data: {nombre: nombrecomida}})
        for await(let ingrediente of ingredientes) {
            let ingredient = await prisma.ingrediente.findFirst({where: {nombre: ingrediente.nombre}})
            if (!ingredient) {
                ingredient = await prisma.ingrediente.create({data: {nombre: ingrediente.nombre}})
            }
            const existeIngredienteComida = await prisma.ingredientesComidas.findFirst({where: {ingredienteId: ingredient.id}})
            if (!existeIngredienteComida)
                await prisma.ingredientesComidas.create({
                    data: {
                        ingredienteId: ingredient.id,
                        comidaId: comida.id
                    }
                })
            /*const comida2 = await prisma.comida.update({
                where: {id: comida.id}, select: {ingredientes: {include: {ingrediente: true}}},
                data: {ingredientes: {create: [{ingredienteId: ingredient.id, comidaId: comida.id}]}}
            })*/
        }
        res.json(comida)
    })
    return app;
}
