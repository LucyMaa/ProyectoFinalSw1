-- CreateTable
CREATE TABLE `Comida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingrediente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IngredientesComidas` (
    `ingredienteId` INTEGER NOT NULL,
    `comidaId` INTEGER NOT NULL,

    PRIMARY KEY (`ingredienteId`, `comidaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComidasRestaurants` (
    `comidaId` INTEGER NOT NULL,
    `restaurantId` INTEGER NOT NULL,
    `Precio` INTEGER NOT NULL,

    PRIMARY KEY (`comidaId`, `restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IngredientesComidas` ADD CONSTRAINT `IngredientesComidas_ingredienteId_fkey` FOREIGN KEY (`ingredienteId`) REFERENCES `Ingrediente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IngredientesComidas` ADD CONSTRAINT `IngredientesComidas_comidaId_fkey` FOREIGN KEY (`comidaId`) REFERENCES `Comida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComidasRestaurants` ADD CONSTRAINT `ComidasRestaurants_comidaId_fkey` FOREIGN KEY (`comidaId`) REFERENCES `Comida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComidasRestaurants` ADD CONSTRAINT `ComidasRestaurants_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
