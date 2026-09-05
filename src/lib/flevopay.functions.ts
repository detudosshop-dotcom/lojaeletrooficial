import { createServerFn } from "@tanstack/react-start";
import {
  createPixTransactionCore,
  getPixStatusCore,
  parseCreatePixInput,
  parsePixStatusInput,
  type CreatePixInput,
  type CreatePixResult,
  type GetPixStatusResult,
  type PixStatus,
} from "@/lib/flevopay.server";

export type { CreatePixInput, CreatePixResult, GetPixStatusResult, PixStatus };

export const createPixTransaction = createServerFn({ method: "POST" })
  .inputValidator(parseCreatePixInput)
  .handler(async ({ data }) => createPixTransactionCore(data));

export const getPixStatus = createServerFn({ method: "POST" })
  .inputValidator(parsePixStatusInput)
  .handler(async ({ data }) => getPixStatusCore(data));
