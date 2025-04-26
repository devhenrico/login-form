import express from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export function router() {
  const router = express.Router();

  const userCreateSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const userQuerySchema = z
    .object({
      firstName: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional();

  router.post("/users", async (req, res) => {
    try {
      const validatedData = userCreateSchema.parse(req.body);
      const user = await prisma.user.create({
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          password: validatedData.password,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        return res.status(400).json({
          message: "Validation error",
          errors: errorMessages,
        });
      }
      res.status(500).json({ message: "Server error. Try again" });
    }
  });

  router.get("/users", async (req, res) => {
    try {
      const validatedQuery = userQuerySchema.parse(req.query);
      let users = [];
      if (
        validatedQuery &&
        (validatedQuery.firstName || validatedQuery.email)
      ) {
        users = await prisma.user.findMany({
          where: {
            firstName: validatedQuery.firstName,
            email: validatedQuery.email,
          },
        });
      } else {
        users = await prisma.user.findMany();
      }
      res.status(200).json({ message: "List users", users });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        return res.status(400).json({
          message: "Validation error",
          errors: errorMessages,
        });
      }
      res.status(500).json({ message: "Server error. Try again" });
    }
  });

  router.delete("/users/:id", async (req, res) => {
    try {
      await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        return res.status(400).json({
          message: "Validation error",
          errors: errorMessages,
        });
      }
      res.status(500).json({ message: "Server error. Try again" });
    }
  });

  return router;
}
