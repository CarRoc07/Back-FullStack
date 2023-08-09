DOCUMENTACION DE LOS ENDPOINTS:

AUTH: 
 - POST /api/register --> Registra nuevo user, recibe credenciales
 - POST /api/login --> Loguea al user, recibe credenciales
 - GET /api/refresh --> Requiere Refresh Token para renovar ambos Tokens.
 - PUT /api/update --> Este requiere Token de acceso para actualizar los datos del user.

CATEGORY:
 - GET /api/category --> Trae todas las categories, no requiere Token de Acceso.
 - POST /api/category --> Crea nueva category, se necesita validar el mail enviado por el Token de Acceso, ya que puede ser realizado solo por el ADMIN.

ORDERS:
 - GET /api/orders --> Trae todas las orders del user guardado en el Token de Acceso.
 - POST /api/orders --> Crea nueva order con el user guardado en el Token de Acceso.
 - PUT /api/orders/:id --> Cambia el status de la order, aún no implementado en el Front.

PRODUCTS: 
 - GET /api/products --> Trae todos los productos disponibles de la BD, no requiere Token.
 - POST /api/products --> Crea nuevo producto, se necesita ser Admin para ello. Requiere token.
 - DELETE /api/products/:id --> Elimina porducto, se necesita admina para ello. Requiere token.