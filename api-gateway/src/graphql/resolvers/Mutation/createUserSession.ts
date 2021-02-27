import UsersService from "#root/adapters/UsersService";
import { ResolverContext } from "#root/graphql/types";

interface Args {
  password: string;
  username: string;
}

const createUserSessionResolver = async (
  _obj: any,
  { password, username }: Args,
  context: ResolverContext
) => {
  const userSession = await UsersService.createUserSession({
    password,
    username,
  });

  context.res.cookie("userSessionId", userSession?._id, { httpOnly: true });

  return userSession;
};

export default createUserSessionResolver;
