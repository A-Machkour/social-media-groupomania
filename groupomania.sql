-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 09 mai 2022 à 21:52
-- Version du serveur : 8.0.28
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `content`, `comment_date`) VALUES
(1, 83, 29, 'Tres belle image', '2022-05-08 22:27:21'),
(2, 77, 29, 'bravo', '2022-05-09 14:44:59'),
(3, 41, 29, 'WOAAA', '2022-05-09 14:45:08'),
(4, 83, 31, 'WOAAAAAAA', '2022-05-09 14:45:25'),
(7, 84, 29, 'alllooo', '2022-05-09 15:19:51'),
(8, 77, 31, 'Wow franchement bravo', '2022-05-09 16:15:49'),
(9, 84, 31, 'incroyable', '2022-05-09 16:44:59'),
(10, 41, 31, 'SALUT ', '2022-05-09 17:11:03'),
(11, 1, 31, 'wsh gros bien ou quoi ', '2022-05-09 17:11:24'),
(18, 84, 55, 'Wow jolie', '2022-05-09 21:32:20');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `image_url`, `post_id`, `user_id`) VALUES
(1, '1651880306290.png', 8, NULL),
(2, '1651925702430.png', 9, NULL),
(3, '1651925790009.png', 10, NULL),
(21, 'a8dc6fcf0e04b38aebe85b8398311e7d.jpg', 26, NULL),
(22, './images/uploads/posts/a8dc6fcf0e04b38aebe85b8398311e7d.jpg', 27, NULL),
(23, './images/uploads/posts/-2264-7407.jpg', 28, NULL),
(24, './images/uploads/posts/-0798-4723.jpg', 29, NULL),
(25, './images/uploads/posts/-8437-6339.jpg', 30, NULL),
(26, './images/uploads/posts/-6134-3755.jpg', 33, NULL),
(27, './images/uploads/posts/-4123-8486.jpg', 34, NULL),
(28, './images/uploads/posts/-2279-0410.jpg', 39, NULL),
(29, './images/uploads/posts/-4024-3701.gif', 41, NULL),
(30, './images/uploads/posts/-7960-4469.gif', 56, NULL),
(31, './images/uploads/posts/-0593-1651.gif', 57, NULL),
(32, './images/uploads/posts/-4404-2744.gif', 69, NULL),
(33, './images/uploads/posts/-5904-0134.gif', 73, NULL),
(34, './images/uploads/posts/-4475-2069.jpg', 74, NULL),
(35, './images/uploads/posts/-5731-0547.PNG', 75, NULL),
(36, './images/uploads/posts/-8398-7267.png', 76, NULL),
(37, './images/uploads/posts/-6262-9795.jpg', 77, NULL),
(38, './images/uploads/posts/-3726-8049.jpg', 78, NULL),
(39, './images/uploads/posts/-6529-4680.gif', 79, NULL),
(40, './images/uploads/posts/-3736-4658.gif', 80, NULL),
(41, './images/uploads/posts/-1700-3570.jpg', 81, NULL),
(42, './images/uploads/posts/-3526-0574.gif', 82, NULL),
(43, './images/uploads/posts/-3101-5923.jfif', 83, NULL),
(44, './images/uploads/posts/-9403-1422.gif', 84, NULL),
(45, './images/uploads/posts/-3216-9136.gif', 85, NULL),
(46, './images/uploads/posts/-5505-2996.png', 87, NULL),
(47, './images/uploads/posts/-3755-6312.png', 88, NULL),
(48, './images/uploads/posts/-5205-3174.gif', 89, NULL),
(49, './images/uploads/posts/-8333-4396.jpeg', 90, NULL),
(50, './images/uploads/posts/-8744-0616.PNG', 91, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `post_id`) VALUES
(1, 31, 1),
(6, 29, 41),
(7, 29, 83),
(10, 31, 32),
(11, 31, 37),
(16, 31, 83),
(20, 31, 77),
(21, 31, 41),
(22, 29, 84),
(23, 55, 84),
(24, 55, 83),
(25, 55, 39);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `likes` int DEFAULT NULL,
  `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `content`, `likes`, `post_date`, `post_image`) VALUES
(1, 31, 'megashojo', 3, '2022-04-29 16:06:04', NULL),
(2, 31, 'salut', NULL, '2022-04-30 00:18:48', NULL),
(33, 31, 'GROSSE TETEEE', NULL, '2022-05-08 16:39:05', NULL),
(34, 31, 'ASDASDASD', NULL, '2022-05-08 16:39:24', NULL),
(37, 31, 'initial d', NULL, '2022-05-08 16:40:59', NULL),
(39, 31, 'TEST6', NULL, '2022-05-08 16:50:01', NULL),
(41, 31, 'Test avec if', NULL, '2022-05-08 17:06:35', NULL),
(77, 31, 'TEST', NULL, '2022-05-08 20:10:55', NULL),
(82, 31, 'Bonsoir j\'en peux plus de ce projet ^^', NULL, '2022-05-08 20:22:41', NULL),
(83, 29, 'Bonsoir j\'ai froid', NULL, '2022-05-08 21:04:46', NULL),
(84, 31, 'Test du post', NULL, '2022-05-09 00:51:11', NULL),
(91, 55, 'asdasd', NULL, '2022-05-09 21:49:46', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastname` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `followers` int DEFAULT NULL,
  `followings` int DEFAULT NULL,
  `images` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bio` varchar(248) DEFAULT NULL,
  `admin` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `firstname`, `lastname`, `followers`, `followings`, `images`, `created_at`, `updated_at`, `bio`, `admin`) VALUES
(29, 'test1@test.fr', 'Megaya', '$2b$10$GnoI8ca5DhG7YJLhCJEJrOnVkZTMCZlp/V2kckQtERRErXVy4TFVS', 'Lip', 'Tonne', NULL, NULL, './images/uploads/profils/-6664-2166.jpeg', '2022-04-26 16:22:27', '2022-05-09 22:04:05', 'Salut moi c\'est Lip, je suis le nouveau stagiaire du groupe !', NULL),
(31, 'mega@test.fr', 'Cristaline', '$2b$10$Iy2mk3Ar24PNt1I14bGHv.QjtfCXPv95vD.Gc06eEd0ObsA50F0Eu', 'Crista', 'Line', 5, NULL, './images/uploads/profils/-8970-4246.jpg', '2022-04-27 16:13:44', '2022-05-09 19:39:55', 'BonjourAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 1),
(32, 'sylvie@megaya.shojo', 'asdasd', '$2b$10$Z3lvRjH9CHk9Hbz6N/T5VOtiOJYhkN/eCTuIwZSz9eIATojxCXclO', NULL, NULL, NULL, NULL, NULL, '2022-05-01 15:41:46', '2022-05-01 17:41:46', NULL, NULL),
(33, 'mega@mega2.fr', 'Megashoja', '$2b$10$4F1DwzxSj6vAntsLWDU3W.jMlreDdWUzRmpcNBlTrll2tN/.kLzaa', NULL, NULL, NULL, NULL, NULL, '2022-05-03 21:29:20', '2022-05-03 23:29:20', NULL, NULL),
(49, 'machkour.abdoul@hotmail.coaaam', 'acscasd', '$2b$10$MKy2E4e74BXpwJtoFml1sOv3AcbtzAravij5tMDeNVNomjo.2Bk5G', NULL, NULL, NULL, NULL, NULL, '2022-05-04 14:47:09', '2022-05-04 16:47:09', NULL, NULL),
(54, 'machkour.abdou@hotmail.com', 'mcgas', '$2b$10$egzEQZ5E6jFiOaTfK/J8feE45epJ18I0G...alHgkyMnzdAV0N1RW', NULL, NULL, NULL, NULL, NULL, '2022-05-09 09:06:29', '2022-05-09 11:06:29', NULL, NULL),
(55, 'test10@test.fr', 'Niva', '$2b$10$pnlroMNhXS/IIz6PwLmTsubFxupBJBaRl4j/ZkDzRECZUB1W6IMjO', NULL, NULL, NULL, NULL, './images/uploads/profils/-8140-4543.jpg', '2022-05-09 20:05:27', '2022-05-09 23:13:49', NULL, NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
