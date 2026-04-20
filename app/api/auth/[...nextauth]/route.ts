// =========================================================
// PAGE/API: Auth Traffic Controller
// DESCRIPTION: The endpoints that Auth.js uses under the hood 
// to process login callbacks, session checks, and logouts.
// =========================================================

import { handlers } from "@/auth";
export const { GET, POST } = handlers;