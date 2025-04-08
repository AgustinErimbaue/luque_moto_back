"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Casco Integral",
        description: "Casco de moto con diseño aerodinámico y visor anti-rayaduras.",
        price: 75.99,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Guantes de Cuero",
        description: "Guantes reforzados con protección para nudillos y ajuste en muñeca.",
        price: 29.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Llantas Michelin",
        description: "Llantas de alta durabilidad para motos deportivas y de turismo.",
        price: 120.0,
        stock: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aceite para Motor 10W-40",
        description: "Aceite sintético premium para motores de alto rendimiento.",
        price: 19.99,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Batería de Gel",
        description: "Batería de gel libre de mantenimiento, ideal para climas extremos.",
        price: 89.99,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pastillas de Freno",
        description: "Juego de pastillas de freno de alto rendimiento y durabilidad.",
        price: 45.0,
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cadena de Transmisión",
        description: "Cadena reforzada para transmisión de motos de alto cilindraje.",
        price: 65.0,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Espejos Laterales",
        description: "Par de espejos laterales ajustables con acabado cromado.",
        price: 35.99,
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Escape Deportivo",
        description: "Escape con sistema de reducción de ruido y mejora de rendimiento.",
        price: 150.0,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kit de Herramientas",
        description: "Set de herramientas básicas para mantenimiento de motocicletas.",
        price: 49.99,
        stock: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
