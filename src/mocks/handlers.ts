// import { http, HttpResponse } from "msw";
// import { mockDB } from "./db";

// export const handlers = [
//   http.post("/auth/register", async ({ request }) => {
//     const { email, name } = await request.json();

//     // имитация конфликта 409
//     if (email === mockDB.user.email) {
//       return HttpResponse.json(
//         { message: "User already exists" },
//         { status: 409 }
//       );
//     }

//     mockDB.user = { ...mockDB.user, name, email };
//     mockDB.isAuthorized = true;

//     return HttpResponse.json({
//       user: mockDB.user,
//       accessToken: mockDB.tokens.accessToken,
//       refreshToken: mockDB.tokens.refreshToken,
//     });
//   }),

//   http.post("/auth/login", async ({ request }) => {
//     const { email } = await request.json();

//     if (email !== mockDB.user.email) {
//       return HttpResponse.json(
//         { message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     mockDB.isAuthorized = true;

//     return HttpResponse.json({
//       user: mockDB.user,
//       accessToken: mockDB.tokens.accessToken,
//       refreshToken: mockDB.tokens.refreshToken,
//     });
//   }),

//   http.post("/auth/logout", async () => {
//     mockDB.isAuthorized = false;
//     return HttpResponse.json({ message: "Logged out" });
//   }),

//   http.get("/users/current", () => {
//     if (!mockDB.isAuthorized) {
//       return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     return HttpResponse.json({
//       user: mockDB.user,
//       accessToken: mockDB.tokens.accessToken,
//     });
//   }),

//   http.patch("/users/current", async ({ request }) => {
//     if (!mockDB.isAuthorized) {
//       return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { name } = await request.json();
//     mockDB.user.name = name;

//     return HttpResponse.json({
//       user: mockDB.user,
//       accessToken: mockDB.tokens.accessToken,
//     });
//   }),
// ];
