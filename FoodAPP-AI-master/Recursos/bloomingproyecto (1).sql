-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-02-2022 a las 03:03:35
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bloomingproyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comida`
--

CREATE TABLE `comida` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comida`
--

INSERT INTO `comida` (`id`, `nombre`) VALUES
(2, 'pizza'),
(3, 'sushi'),
(4, 'donuts');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidasrestaurants`
--

CREATE TABLE `comidasrestaurants` (
  `comidaId` int(11) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comidasrestaurants`
--

INSERT INTO `comidasrestaurants` (`comidaId`, `restaurantId`, `Precio`) VALUES
(2, 1, 25),
(3, 1, 25),
(4, 1, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingrediente`
--

CREATE TABLE `ingrediente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ingrediente`
--

INSERT INTO `ingrediente` (`id`, `nombre`) VALUES
(8, 'salsa de tomate'),
(9, 'mozarela'),
(10, 'orégano'),
(11, 'sal'),
(12, 'aceite de oliva'),
(13, 'harina'),
(14, 'levadura'),
(15, 'arroz de sushi'),
(16, 'azúcar'),
(17, 'vinagre de arroz'),
(18, 'surimi'),
(19, 'salmón'),
(20, 'nori'),
(21, 'semillas de sésamo'),
(22, 'pepino'),
(23, 'aguacate'),
(24, 'salsa de soja'),
(25, 'leche'),
(26, 'mantequilla'),
(27, 'huevo'),
(28, 'vainilla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientescomidas`
--

CREATE TABLE `ingredientescomidas` (
  `ingredienteId` int(11) NOT NULL,
  `comidaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ingredientescomidas`
--

INSERT INTO `ingredientescomidas` (`ingredienteId`, `comidaId`) VALUES
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 3),
(16, 3),
(17, 3),
(18, 3),
(19, 3),
(20, 3),
(21, 3),
(22, 3),
(23, 3),
(24, 3),
(25, 4),
(26, 4),
(27, 4),
(28, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `restaurant`
--

INSERT INTO `restaurant` (`id`, `nombre`, `latitud`, `longitud`) VALUES
(1, 'Safari', -17.778467, -63.199437),
(2, 'Casa del cerdo', -17.803716, -63.193358),
(3, 'ABDCASD', -17.772604, -63.1602);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('60a7efe9-00e0-4013-a62c-92b66f70d23d', '16102d5dc500fe12f238aa6768a9e39c9deb6b87a71e6be96442b47a5ea2f9bc', '2022-01-10 03:03:11.572', '20220104150739_init', NULL, NULL, '2022-01-10 03:03:11.374', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comida`
--
ALTER TABLE `comida`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comidasrestaurants`
--
ALTER TABLE `comidasrestaurants`
  ADD PRIMARY KEY (`comidaId`,`restaurantId`),
  ADD KEY `ComidasRestaurants_restaurantId_fkey` (`restaurantId`);

--
-- Indices de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingredientescomidas`
--
ALTER TABLE `ingredientescomidas`
  ADD PRIMARY KEY (`ingredienteId`,`comidaId`),
  ADD KEY `IngredientesComidas_comidaId_fkey` (`comidaId`);

--
-- Indices de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comida`
--
ALTER TABLE `comida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comidasrestaurants`
--
ALTER TABLE `comidasrestaurants`
  ADD CONSTRAINT `ComidasRestaurants_comidaId_fkey` FOREIGN KEY (`comidaId`) REFERENCES `comida` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ComidasRestaurants_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingredientescomidas`
--
ALTER TABLE `ingredientescomidas`
  ADD CONSTRAINT `IngredientesComidas_comidaId_fkey` FOREIGN KEY (`comidaId`) REFERENCES `comida` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `IngredientesComidas_ingredienteId_fkey` FOREIGN KEY (`ingredienteId`) REFERENCES `ingrediente` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
