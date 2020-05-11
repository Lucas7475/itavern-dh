CREATE DATABASE iTavern;
USE iTavern;

CREATE TABLE usuario(
id_usuario INT AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
nickname VARCHAR(30) NOT NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(256) NOT NULL,
CONSTRAINT PK_usuario PRIMARY KEY(id_usuario)
);

CREATE TABLE jogo(
id_jogo INT AUTO_INCREMENT,
nome VARCHAR(100),
CONSTRAINT PK_jogo PRIMARY KEY(id_jogo)
);

CREATE TABLE restricao(
id_restricao INT AUTO_INCREMENT,
dias_semana VARCHAR(100),
distancia CHAR(3),
horario CHAR(5),
tempo_jogo CHAR(5),
CONSTRAINT PK_restricao PRIMARY KEY(id_restricao)
);

CREATE TABLE endereco(
id_endereco INT AUTO_INCREMENT,
cep TINYINT NOT NULL,
numero CHAR(7) NOT NULL,
CONSTRAINT PK_endereco PRIMARY KEY(id_endereco)
);

CREATE TABLE lista_amigo(
id_usuario INT,
id_amigo INT,

CONSTRAINT FK_lista_amigo_id_usuario FOREIGN KEY (id_usuario)
REFERENCES usuario(id_usuario),

CONSTRAINT FK_lista_amigo_id_amigo FOREIGN KEY (id_amigo)
REFERENCES usuario(id_usuario),

CONSTRAINT PK_lista_amigo PRIMARY KEY CLUSTERED (id_usuario, id_amigo)
);

CREATE TABLE grupo(
id_grupo INT AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
num_jogadores TINYINT NOT NULL,
dias_reuniao VARCHAR(60) NOT NULL,
inicio_reuniao DATE NOT NULL,
img VARCHAR(100),
descricao VARCHAR(300),
id_endereco INT,
id_restricao INT,
id_jogo INT,

CONSTRAINT PK_grupo PRIMARY KEY(id_grupo),

CONSTRAINT FK_grupo_endereco FOREIGN KEY (id_endereco)
REFERENCES endereco(id_endereco),

CONSTRAINT FK_grupo_restricao FOREIGN KEY (id_restricao)
REFERENCES restricao(id_restricao),

CONSTRAINT FK_grupo_jogo FOREIGN KEY (id_jogo)
REFERENCES jogo(id_jogo)
);

CREATE TABLE usuario_grupo(
id_grupo INT,
id_usuario INT,

CONSTRAINT FK_usuario FOREIGN KEY (id_usuario)
REFERENCES usuario(id_usuario),

CONSTRAINT FK_grupo FOREIGN KEY (id_grupo)
REFERENCES grupo(id_grupo),

CONSTRAINT PK_usuario_grupo PRIMARY KEY CLUSTERED (id_usuario, id_grupo)
);