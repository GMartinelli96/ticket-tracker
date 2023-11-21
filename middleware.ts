export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/tickets/new",
        "/tickets/:id",
        "/tickets/:id/edit",
    ]
}