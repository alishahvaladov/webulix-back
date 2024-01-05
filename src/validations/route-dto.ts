import { Router } from "express";
import { z } from "zod";

export const RouterSchema =  z.object({
  api: z.string(),
  router: z.custom<Router>()
});

export type RouterType = z.infer<typeof RouterSchema>;

export const RoutesSchema = z.object({
  api: z.string(),
  routes: z.custom<RouterType[]>()
});

export type RoutesType = z.infer<typeof RoutesSchema>;