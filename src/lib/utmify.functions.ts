import { createServerFn } from "@tanstack/react-start";
import { parseUtmifyOrderInput, sendUtmifyOrderCore, type UtmifyOrderPayload } from "@/lib/utmify.server";

export type SendUtmifyOrderInput = UtmifyOrderPayload;

export const sendUtmifyOrder = createServerFn({ method: "POST" })
  .inputValidator(parseUtmifyOrderInput)
  .handler(async ({ data }) => {
    return sendUtmifyOrderCore(data);
  });
