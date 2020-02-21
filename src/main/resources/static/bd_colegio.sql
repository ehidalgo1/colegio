-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2020 a las 04:04:30
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_colegio`
--

DELIMITER $$
--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `FN_GENERAR_TOKEN` () RETURNS VARCHAR(255) CHARSET utf8 COLLATE utf8_spanish_ci NO SQL
BEGIN
	RETURN (SELECT 
	concat(
	SUBSTRING(MD5(RAND()) FROM 1 FOR 8),'-',  
	SUBSTRING(MD5(RAND()) FROM 1 FOR 4),'-',
	SUBSTRING(MD5(RAND()) FROM 1 FOR 4),'-',
	SUBSTRING(MD5(RAND()) FROM 1 FOR 4),'-',
	SUBSTRING(MD5(RAND()) FROM 1 FOR 12)
	) );

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `ID_ALUMNO` bigint(20) NOT NULL,
  `NOMBRE` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `APELLIDO_P` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `APELLIDO_M` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `TOKEN` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `CURSO_ID_CURSO` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`ID_ALUMNO`, `NOMBRE`, `APELLIDO_P`, `APELLIDO_M`, `TOKEN`, `CURSO_ID_CURSO`) VALUES
(2, 'eugenio', 'sdfsfds', 'fssdffsd', 'f4e4a9d8-ec27-1dba-d9e0-bff93a0e5d67', 17),
(3, 'alan', 'parrish', 'segovia', '7ee59bf2-7edf-6e19-f6d9-8c3669c13d2f', 14),
(4, 'ricardo', 'hidalgo', 'diaz', '0273f123-e4b2-d24e-d05d-c7bbd31d6603', 15),
(5, 'cualquiera', 'salas', 'mario', '0ac6c092-a7bc-fa59-d97d-c26fff353f0c', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `ID_CURSO` bigint(20) NOT NULL,
  `NUMERO_CURSO` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `TOKEN` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`ID_CURSO`, `NUMERO_CURSO`, `TOKEN`) VALUES
(1, '1A', 'dc89af0c-6681-3478-6c58-8221a57a7901'),
(2, '1B', 'c365ca78-b9bd-4e91-482c-8c40ee8f0204'),
(4, '2A', '8610c8a8-baed-fe75-0aec-1eedc655936e'),
(5, '2B', '44706ff2-c867-4015-d9ea-055e5a9b65b2'),
(7, '3A', '04777261-8bc0-3e39-0703-9a3ec82e69ac'),
(8, '3B', '183830da-6192-a508-0a14-4e2794fe80dc'),
(10, '4A', '7e0c2282-ea2f-0dbd-38f5-27425425ac08'),
(11, '4B', '207823ce-4635-a902-7152-f796d2d24475'),
(13, '5A', '3b97b4ed-fd04-5c1d-46e1-51e21ba548c3'),
(14, '5B', '77023933-16cf-fd95-557e-0fcb614438cb'),
(16, '6A', '6858dd6e-e29e-e31e-c8bf-d779b0555492'),
(17, '6B', '6b567b10-8842-0a22-dbf6-3c231fd1fd7e'),
(19, '7A', '6b4625cd-62df-6886-da2a-09833f6d12aa'),
(20, '7B', '743318fe-f237-0adb-0f57-a6dd232ff9e4'),
(22, '8A', 'fd957811-5ebd-3906-6016-ba136167920b'),
(23, '8B', '87b9224a-c7b3-5672-facb-aec4af97b205'),
(25, 'IA', 'ae78fbf5-72b2-7958-1a79-e9e2c42f25a9'),
(26, 'IB', '1f08e49a-cb44-d6ba-72de-6e3f05c9704e'),
(27, 'IC', '11b5f44f-55c7-8941-8520-fdd5eb5eb9d6'),
(28, 'ID', '39bf6db9-53d3-de4e-6ab6-cefe9df506d8'),
(29, 'IIA', '09fcaf08-020d-811c-db9a-8332dd2ba45b'),
(30, 'IIB', '67f19440-f90c-a865-f608-b802fd07d67b'),
(31, 'IIC', 'cf1a3fea-80e0-c895-f445-64890599dc03'),
(32, 'IID', '3bd9f5c1-4a70-fafe-b559-414c76d0c763'),
(33, 'IIIA', '119dc78d-cbc4-9f7f-e725-43e669ddf75f'),
(34, 'IIIB', '41381a3e-abc4-6c93-e693-465a641ffe3c'),
(35, 'IIIC', '4b882477-9862-40eb-8d07-52ef53f30716'),
(36, 'IIID', 'c8a7ec39-aa62-3dd2-ac32-ae711042f139'),
(37, 'IVA', '64c07385-6eb9-67ef-7f48-0b108da22618'),
(38, 'IVB', '8fe13dc6-76e4-f659-d954-970c30e1c619'),
(39, 'IVC', 'd1634a20-4b13-2152-0680-6414ecf039e3'),
(40, 'IVD', 'be931414-396c-d022-6c88-269219f7c4b6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_ramo`
--

CREATE TABLE `curso_ramo` (
  `CURSO_ID_CURSO` bigint(20) NOT NULL,
  `RAMO_ID_RAMO` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `ID_PROFESOR` bigint(20) NOT NULL,
  `NOMBRE` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `APELLIDO` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ESPECIALIDAD` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `USUARIO` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `PASSWORD` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `TOKEN` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `CURSO_ID_CURSO` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`ID_PROFESOR`, `NOMBRE`, `APELLIDO`, `ESPECIALIDAD`, `USUARIO`, `PASSWORD`, `TOKEN`, `CURSO_ID_CURSO`) VALUES
(2, 'marco', 'sepulveda', 'MATEMATICAS', 'msepulveda@colegio.cl', 'colegio123', '64002c09-88ce-16b9-5fa1-1e82c8790f94', 0),
(3, 'sdfsfsfd', 'sdfsdfsd', 'ED. FISICA', 'eugeniohidalgo1@gmail.com', 'colegio123', '09432545-0bbb-1749-0539-b303abfe5249', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_rol`
--

CREATE TABLE `profesor_rol` (
  `PROFESOR_ID_PROFESOR` bigint(20) NOT NULL,
  `ROL_ID_ROL` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ramo`
--

CREATE TABLE `ramo` (
  `ID_RAMO` bigint(20) NOT NULL,
  `NOMBRE` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `NOTA_1` double NOT NULL,
  `NOTA_2` double NOT NULL,
  `NOTA_3` double NOT NULL,
  `NOTA_4` double NOT NULL,
  `NOTA_5` double NOT NULL,
  `NOTA_6` double NOT NULL,
  `NOTA_7` double NOT NULL,
  `NOTA_8` double NOT NULL,
  `TOKEN` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ramo`
--

INSERT INTO `ramo` (`ID_RAMO`, `NOMBRE`, `NOTA_1`, `NOTA_2`, `NOTA_3`, `NOTA_4`, `NOTA_5`, `NOTA_6`, `NOTA_7`, `NOTA_8`, `TOKEN`) VALUES
(1, 'MATEMATICAS', 0, 0, 0, 0, 0, 0, 0, 0, '53483cff-9bd0-8920-3c87-383ea2851322'),
(2, 'LENGUAJE', 0, 0, 0, 0, 0, 0, 0, 0, '870cb91d-8860-5369-d5fe-2c5b9be93897'),
(3, 'HISTORIA', 0, 0, 0, 0, 0, 0, 0, 0, '2113d67a-bece-8518-a4d8-3177cb4de04e'),
(4, 'INGLES', 0, 0, 0, 0, 0, 0, 0, 0, '18e4a209-a09a-3e93-6c90-6c2a861c9468'),
(5, 'CIENCIAS SOCIALES', 0, 0, 0, 0, 0, 0, 0, 0, '6e216c8a-5f68-9bb0-690a-fd1ce7e55c01'),
(6, 'MUSICA', 0, 0, 0, 0, 0, 0, 0, 0, '99e56f6f-b161-9a75-4f77-a5638c584b35'),
(7, 'ED. FISICA', 0, 0, 0, 0, 0, 0, 0, 0, '9569e316-6791-f81a-827d-0d499edff59e'),
(8, 'RELIGION', 0, 0, 0, 0, 0, 0, 0, 0, 'd8183eef-0bf2-30c3-8e5f-292d5ea24488'),
(9, 'CIENCIAS NATURALES', 0, 0, 0, 0, 0, 0, 0, 0, '6838c962-81ee-2a2d-be90-a4f9c480a48a'),
(10, 'ARTES VISUALES', 0, 0, 0, 0, 0, 0, 0, 0, '596d6864-fc97-b79f-ba95-dc76a3441910'),
(11, 'TECNOLOGIA', 0, 0, 0, 0, 0, 0, 0, 0, '5ebc503d-d808-98b7-60e4-0d78923480bd'),
(12, 'COMPUTACION', 0, 0, 0, 0, 0, 0, 0, 0, 'd562103f-8a7d-8b51-88eb-40b5b086da29'),
(13, 'FISICA', 0, 0, 0, 0, 0, 0, 0, 0, '7a5b717e-77f8-f484-7ad4-3a5903efd5a5'),
(14, 'QUIMICA', 0, 0, 0, 0, 0, 0, 0, 0, '36d9d9f1-107f-09c5-c919-8e72605fd0b0'),
(15, 'BIOLOGIA', 0, 0, 0, 0, 0, 0, 0, 0, '60a3f96d-271c-7f13-8da3-b97910d38992');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID_ROL` bigint(20) NOT NULL,
  `NOMBRE_ROL` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `TOKEN` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`ID_ALUMNO`),
  ADD KEY `CURSO_ID_CURSO` (`CURSO_ID_CURSO`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`ID_CURSO`);

--
-- Indices de la tabla `curso_ramo`
--
ALTER TABLE `curso_ramo`
  ADD KEY `CURSO_ID_CURSO` (`CURSO_ID_CURSO`),
  ADD KEY `RAMO_ID_RAMO` (`RAMO_ID_RAMO`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`ID_PROFESOR`),
  ADD KEY `CURSO_ID_CURSO` (`CURSO_ID_CURSO`);

--
-- Indices de la tabla `profesor_rol`
--
ALTER TABLE `profesor_rol`
  ADD KEY `PROFESOR_ID_PROFESOR` (`PROFESOR_ID_PROFESOR`),
  ADD KEY `ROL_ID_ROL` (`ROL_ID_ROL`);

--
-- Indices de la tabla `ramo`
--
ALTER TABLE `ramo`
  ADD PRIMARY KEY (`ID_RAMO`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID_ROL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `ID_ALUMNO` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `ID_CURSO` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
  MODIFY `ID_PROFESOR` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ramo`
--
ALTER TABLE `ramo`
  MODIFY `ID_RAMO` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID_ROL` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso_ramo`
--
ALTER TABLE `curso_ramo`
  ADD CONSTRAINT `curso_ramo_ibfk_1` FOREIGN KEY (`CURSO_ID_CURSO`) REFERENCES `curso` (`ID_CURSO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `curso_ramo_ibfk_2` FOREIGN KEY (`RAMO_ID_RAMO`) REFERENCES `ramo` (`ID_RAMO`);

--
-- Filtros para la tabla `profesor_rol`
--
ALTER TABLE `profesor_rol`
  ADD CONSTRAINT `profesor_rol_ibfk_1` FOREIGN KEY (`PROFESOR_ID_PROFESOR`) REFERENCES `profesor` (`ID_PROFESOR`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesor_rol_ibfk_2` FOREIGN KEY (`ROL_ID_ROL`) REFERENCES `rol` (`ID_ROL`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
