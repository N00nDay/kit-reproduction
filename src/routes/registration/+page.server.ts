import type { Actions } from "./$types";
import { invalid } from "@sveltejs/kit";

interface Error {
  first_name?: string;
  last_name?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmpty(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}

export const actions: Actions = {
  default: async (event) => {
    try {
      const data = await event.request.formData();
      const first_name = data.get("first_name") as string;
      const last_name = data.get("last_name") as string;

      const errors: Error = {};

      if (!first_name || first_name.length === 0) {
        errors.first_name = "First Name is required";
      }

      if (!last_name || last_name.length === 0) {
        errors.last_name = "Last Name is required";
      }

      if (!isEmpty(errors)) {
        return invalid(420, {
          error: "",
          errors: {
            first_name: undefined,
            last_name: undefined,
            ...errors,
          },
        });
      }

      return {
        success: true,
        errors: {
          first_name: undefined,
          last_name: undefined,
        },
      };
    } catch (err) {
      console.log("registration err", err);
      return invalid(420, {
        error: "",
        errors: {
          first_name: undefined,
          last_name: undefined,
        },
      });
    }
  },
};
