import { TOKEN as auth } from "../utils/constants";
import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "Token não informado" });
  }
  //separa o prefixo do token
  const [Bearer, token] = authorization.split(" ");
  //verifica se o token está presente, se não retorna erro
  if (!token) return res.status(401).send({ error: "Token mal formatado" })
  try {
    // //verifica se o token é válido, se não cai no catch
    // const payload = jwt.verify(token, auth.secret);
    // const userId = jwt.verify(token, auth.SECRET);

    //coloca o id do aluno na requisição
    // req.userId = payload.userId.id;

    //envia a requisição para frente (controller)
    return next();

  } catch (error) {
    //retorna erro de token inválido
    res.status(401).send({ error: "Token inválido" });
  }
};
