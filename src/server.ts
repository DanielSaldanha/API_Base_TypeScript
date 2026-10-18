import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
  console.log(`📡 Healthcheck disponível em http://localhost:${PORT}/api/health`);
  console.log(`👤 CRUD de usuários em http://localhost:${PORT}/api/users`);
});
