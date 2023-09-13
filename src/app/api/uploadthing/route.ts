import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

export const dynamic = 'force-dynamic'

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
    router: ourFileRouter,
});