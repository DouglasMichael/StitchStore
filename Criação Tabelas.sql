use dbstich;
CREATE TABLE usuario (
  ID_Usuario int primary key AUTO_INCREMENT,
  Nome varchar(200) NOT NULL collate utf8mb4_bin,
  Email varchar(100) NOT NULL unique,
  senha varchar(100) NOT NULL collate utf8mb4_bin,
  DataNasc date NOT NULL,
  Logradouro varchar(200) NOT NULL,
  Numero int,
  Complemento varchar(50) NOT NULL,
  Bairro varchar(50) NOT NULL,
  Cidade varchar(50) NOT NULL,
  CEP int NOT NULL,
  UF varchar(2) NOT NULL
);

CREATE TABLE produto (
  CodigoProduto int AUTO_INCREMENT primary key,
  nomeProduto varchar(100) not null,
  precoProduto decimal(5,2) not null
);

CREATE TABLE pedido (
  CodigoPedido int AUTO_INCREMENT primary key,
  usuario int not null,
  dataPedido date not null,
  statusPedido enum('Cancelado', 'Entregue', 'Confirmado', 'Caminho'),
  FOREIGN KEY (usuario) REFERENCES usuario (ID_Usuario)
);

CREATE TABLE produtospedidos (
  CodigoProdutoPedido int primary key AUTO_INCREMENT,
  CodigoProduto int not null,
  CodigoPedido int not null,
  TotalProdutosPedidos decimal(5,2) not null,
  QuantidadeProdutosPedidos int not null,
  FOREIGN KEY (CodigoPedido) REFERENCES pedido (CodigoPedido),
  FOREIGN KEY (CodigoProduto) REFERENCES produto (CodigoProduto)
)