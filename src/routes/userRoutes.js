import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../database/user";
import errorCodes from "../lib/errorCodes";
import validate from "./userRoutes.validation";

const ID_DOES_NOT_EXIST = "id does not exist";

export default app => {
  app.get("/users", async (req, res) => {
    const { query = {} } = req;

    const payloadValidation = validate.listUsers(query);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }
    const {
      limit = 10,
      sort = "createdAt",
      filter = false,
      offset = 0
    } = query;
    return res.send(await listUsers({ limit, sort, filter, offset }));
  });

  app.get("/user/:id", async (req, res) => {
    const params = req.params;
    const payloadValidation = validate.getUser(params);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = params;
    const user = await getUser(id);

    if (!user) {
      return res.send(errorCodes.notFound({ message: "User does not exist" }));
    }
    return res.send(user);
  });

  app.post("/user", async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.postUser(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const user = await createUser(body);
      if (!user.created) {
        return res.send(
          errorCodes.duplicateResource({
            message: "User email already exists."
          })
        );
      }
      return res.send(user.details);
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });

  app.put("/user", async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.putUser(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const user = await updateUser(body);
      if (user && !user[0]) {
        return res.send(
          errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
        );
      }

      return res.send("Update success");
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });

  app.delete("/user/:id", async (req, res) => {
    const { params = {} } = req;

    const payloadValidation = validate.deleteUser(params);
    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = params;

    const user = await deleteUser(id);

    if (!user) {
      return res.send(
        errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
      );
    }

    return res.send("User deleted");
  });
};
