import express from "express";
import ventasController from "../controllers/ventas.controller.js";

const router = express.Router();

// GET /ventas - Obtener todas las ventas
router.get("/", ventasController.getAll);

// GET /ventas/:id_venta - Obtener una venta por ID
router.get("/:id_venta", ventasController.getById);

// POST /ventas - Crear una nueva venta
router.post("/", ventasController.create);

// PATCH /ventas/:id_venta - Actualizar una venta
router.patch("/:id_venta", ventasController.update);

// DELETE /ventas/:id_venta - Eliminar una venta
router.delete("/:id_venta", ventasController.delete);

export default router;