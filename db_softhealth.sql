-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para db_softhealth
CREATE DATABASE IF NOT EXISTS `db_softhealth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_softhealth`;

-- Volcando estructura para tabla db_softhealth.administrativo
CREATE TABLE IF NOT EXISTS `administrativo` (
  `documento` varchar(20) NOT NULL,
  `hv` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`documento`),
  CONSTRAINT `administrativo_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `persona` (`documento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.administrativo: ~5 rows (aproximadamente)
INSERT INTO `administrativo` (`documento`, `hv`) VALUES
	('111', NULL),
	('121212', NULL),
	('123', NULL),
	('54564', NULL),
	('666', NULL);

-- Volcando estructura para tabla db_softhealth.historialmedico
CREATE TABLE IF NOT EXISTS `historialmedico` (
  `id_hc` int NOT NULL AUTO_INCREMENT,
  `documento` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_hc`),
  KEY `documento` (`documento`),
  CONSTRAINT `historialmedico_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `paciente` (`documento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.historialmedico: ~2 rows (aproximadamente)
INSERT INTO `historialmedico` (`id_hc`, `documento`) VALUES
	(9, '101010'),
	(4, '333');

-- Volcando estructura para tabla db_softhealth.medico
CREATE TABLE IF NOT EXISTS `medico` (
  `documento` varchar(20) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`documento`),
  CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `persona` (`documento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.medico: ~2 rows (aproximadamente)
INSERT INTO `medico` (`documento`, `especialidad`, `cargo`) VALUES
	('222', 'Neurologo', 'Cirujano'),
	('777', 'Optometrista', 'Cirujano');

-- Volcando estructura para tabla db_softhealth.paciente
CREATE TABLE IF NOT EXISTS `paciente` (
  `documento` varchar(20) NOT NULL,
  `id_hc` int DEFAULT NULL,
  PRIMARY KEY (`documento`),
  UNIQUE KEY `id_hc` (`id_hc`),
  CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`documento`) REFERENCES `persona` (`documento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.paciente: ~3 rows (aproximadamente)
INSERT INTO `paciente` (`documento`, `id_hc`) VALUES
	('101010', NULL),
	('333', NULL),
	('444', NULL);

-- Volcando estructura para tabla db_softhealth.persona
CREATE TABLE IF NOT EXISTS `persona` (
  `documento` varchar(20) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `tipoDocumento` varchar(10) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `imagenPerfil` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.persona: ~11 rows (aproximadamente)
INSERT INTO `persona` (`documento`, `nombre`, `apellido`, `tipoDocumento`, `telefono`, `correo`, `direccion`, `imagenPerfil`) VALUES
	('101010', 'pac10', 'iente10', 'CC', '564984798', 'pac10@gmail.com', 'direccion', NULL),
	('111', 'aux1', 'admin1', 'CC', '11111', 'admin1@gmail.com', 'a28', '1749373921147-636084407.png'),
	('121212', 'aux12', 'aux12', 'CC', '484848', 'aux12@gmail.com', 'direccion', NULL),
	('123', 'Arlenys', 'Nieves', 'CC', '311', 'correo@gmail.com', 'Dirección', NULL),
	('1234567890', 'Juan', 'González', 'CC', '3124567890', 'juanchoazul1402@gmail.com', 'Calle Falsa 123', NULL),
	('222', 'med2', 'ico2', 'CC', '22222', 'med2@gmail.com', ' cr2', '1749372686042-623145640.png'),
	('333', 'pac3', 'iente', 'CC', '333', 'pac3@gmail.com', 'cr3', '1749372302357-510867551.png'),
	('444', 'pac4', 'iente4', 'TI', '400', 'pac4@gmail.com', 'CRA 50D #19', '/uploads/1749355303632-635301155.png'),
	('54564', 'auxjsd', 'askndkls', 'CC', '313', 'davi@gmail.com', 'p1', NULL),
	('666', 'admin6', 'admin6', 'CC', '849849', 'admin6@gmail.com', 'direccion', NULL),
	('777', 'med7', 'med7', 'CC', '51564', 'med7@gmail.com', 'direccion', NULL);

-- Volcando estructura para tabla db_softhealth.procesoclinico
CREATE TABLE IF NOT EXISTS `procesoclinico` (
  `idProcesoClinico` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `id_hc` int DEFAULT NULL,
  `tipoConsulta` varchar(50) DEFAULT NULL,
  `anamnesis` text,
  `examenFisico` text,
  `diagnostico` text,
  `tratamiento` text,
  `nota` text,
  PRIMARY KEY (`idProcesoClinico`),
  KEY `id_hc` (`id_hc`),
  CONSTRAINT `procesoclinico_ibfk_1` FOREIGN KEY (`id_hc`) REFERENCES `historialmedico` (`id_hc`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.procesoclinico: ~4 rows (aproximadamente)
INSERT INTO `procesoclinico` (`idProcesoClinico`, `fecha`, `id_hc`, `tipoConsulta`, `anamnesis`, `examenFisico`, `diagnostico`, `tratamiento`, `nota`) VALUES
	(3, '2025-06-08 05:57:00', 4, 'a,msnca', 'alkmaslkd', 'lksnalkdn', 'dlsndlad', 'laskdnals', 'ld smsdncfdsmlnc'),
	(4, '2025-06-08 06:04:00', 9, 'askndkasjbdka', 'afbjsabfkjs', 'skdfbsjdbf', 'dskjfjbksdfb', 'dskjfbskjdf', 'dkjfbksdfjs'),
	(5, '2025-06-08 06:06:00', 4, 'alksdmklanfalsk', 'sdkjgfndskjf', 'sdkjfnsknf', 'dskfnkdwnf', 'fkdndskfnsk', 'fdskfnkdsjnfk'),
	(6, '2025-06-08 06:09:00', 9, 'XAJKCNSKJNB', 'AKJSDFNAKJSNFK', 'ADKJFNDKAJN', 'NFDKJSAFNKAD', 'KAJFNSDKJND', 'SAKJDFNKSDJFN');

-- Volcando estructura para tabla db_softhealth.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `documento` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rol_id` varchar(1) NOT NULL DEFAULT 'P',
  PRIMARY KEY (`documento`) USING BTREE,
  CONSTRAINT `FK_rol_persona` FOREIGN KEY (`documento`) REFERENCES `persona` (`documento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_rol_valido` CHECK ((`rol_id` in (_utf8mb4'A',_utf8mb4'M',_utf8mb4'P')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.rol: ~10 rows (aproximadamente)
INSERT INTO `rol` (`documento`, `rol_id`) VALUES
	('101010', 'P'),
	('111', 'A'),
	('121212', 'A'),
	('123', 'A'),
	('222', 'M'),
	('333', 'P'),
	('444', 'P'),
	('54564', 'A'),
	('666', 'A'),
	('777', 'M');

-- Volcando estructura para tabla db_softhealth.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `documento` varchar(20) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol_id` varchar(1) DEFAULT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`documento`),
  KEY `idx_usuario_rol` (`rol_id`),
  CONSTRAINT `FK_usuario_persona` FOREIGN KEY (`documento`) REFERENCES `persona` (`documento`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla db_softhealth.usuario: ~10 rows (aproximadamente)
INSERT INTO `usuario` (`documento`, `contrasena`, `rol_id`, `reset_token`, `reset_expires`) VALUES
	('101010', '$2b$10$7tbTorNU5kzCAWcLbXSU7uZ/IeKA6bsdOogjQikWv.BYu0DaolEp6', 'P', NULL, NULL),
	('111', '$2b$10$22MAVuA57fKQrdiVUP3zjOUdGWqQUVn2TE7sdcUqP.iVV6CVUUrui', 'A', NULL, NULL),
	('121212', '$2b$10$5iux.vtF6rxuqoFV.wGy3en0MuVqS6jsWItaBDIMUCm8eezU/CVau', 'A', NULL, NULL),
	('123', '$2b$10$HAK6A.k50Vb5RfgQYtg/JuLjQZeTg/ETtYK8eJ4eMl9UQ95TMjEMe', 'A', '094ee601430c2e838c1cfa2dd59f42d8cfc552bc21423ab0b7325312bf0a821d', '2025-06-07 22:16:36'),
	('222', '$2b$10$mOEfgc7q4xToLjxjBm8qAe1Ec/fGRba6YuwcP0Fi7SoA4beAsxWmC', 'M', '1587126b03c5c8b78fc069a720a144f95ca6d57f97da0e299536c287380c3734', '2025-06-04 22:25:03'),
	('333', '$2b$10$EwUi8NcZsPjv/AqFkdZOeuYxBUEnH67O.CPggLYbooJ3pp1PpPNMq', 'P', NULL, NULL),
	('444', '$2b$10$ZgUvmyBhQYhPr36jASOB2uHtcGZwu1GmILn85g0LO5FH.DTP9TgA2', 'P', NULL, NULL),
	('54564', '$2b$10$xpqqeYZIxhWDBm98M4BHBedCHFtEHLJAud.pu.C3KVR2kwmYMg1gu', 'A', NULL, NULL),
	('666', '$2b$10$APlIuS9ADUhg/Sdz1Es.XOEIeLRM3ACbkW55ZeCl4AbyYJHucX9.u', 'A', NULL, NULL),
	('777', '$2b$10$8WNIrDPdyFEN3AKElK35QepOLu6aEjgkpELyoxqbUHrbZREAFS/du', 'M', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
