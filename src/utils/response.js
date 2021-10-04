const apiResponse = ({
  success = true,
  message = "",
  payload = {},
  errors = [],
}) => ({
  success,
  message,
  payload,
  errors,
});

export function ok(res, payload = {}) {
  return res.status(200).json(
    apiResponse({
      message: "Operação realizada com sucesso",
      payload,
    })
  );
}

export function badRequestWithErrors(res, message, errors) {
  return res.status(400).json(apiResponse({ message, errors }));
}

// export const created = (res, payload = {}) =>
//   res.status(201).json(
//     apiResponse({
//       message: 'created successfully',
//       payload,
//     }),
//   );

// export const updated = (res, message) => res.status(200).json(apiResponse({ message }));

// export function badRequest(res, message) {
//   return res.status(400).json(apiResponse({ message }));
// }

// export const badRequestWithYupErrors = async (res, error, message) => {
//   const errors = [];

//   await Promise.all(
//     error.inner.map(({ errors: innerError, path }) =>
//       errors.push({ message: innerError[0], field: path }),
//     ),
//   );

//   return res.status(400).json(apiResponse({ res, message, errors }));
// };

// export function notFound(res, message) {
//   return res.status(404).json(apiResponse({ message }));
// }

// export const internalServerError = (res, error) => {
//   loggerError(error);

//   return res.status(500).json(apiResponse(serverError()));
// };

// export const unauthorized = (res, message = 'Acesso não autorizado.') => {
//   return res.status(401).json(
//     apiResponse({
//       message,
//     }),
//   );
// };
