import { gql } from "../../deps.ts";
import { queryOrMutation } from "./graph_service.ts";
import type { User } from "./types/user.ts";

export async function getUsers(): Promise<User[]> {
  const query = gql`
    query MyQuery {
        queryUser(offset: 0) {
            id
            discordId
            name
        }
    }`;

  const data = await queryOrMutation<{ queryUser: User[] }>(query);
  return data?.queryUser as User[];
}

export async function getUserByDiscordId(
  discordUserId: bigint,
): Promise<User | undefined> {
  const query = gql`
    query getUserByDiscordId($eq: String) {
        queryUser(filter: {discordId: {eq: $eq}}, first: 1) {
            counter
            discordId
            id
            name
            username
        }
    }`;

  const data = await queryOrMutation<{ queryUser: User }>(query, {
    eq: discordUserId.toString(),
  });
  return data?.queryUser as User;
}

export async function addUser(user: User): Promise<void> {
  const mutation = gql`
    mutation addUser($discordId: Int64!, $name: String) {
        addUser(input: { discordId: $discordId, name: $name }) {
            user {
                id,
                discordId,
                name
            }
        }
    }`;

  await queryOrMutation<void>(mutation, { ...user });
}

export async function deleteUser(user: User): Promise<void> {
  const mutation = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(filter: {id: $id}) {
            msg
            numUids
        }
    }`;

  await queryOrMutation<void>(mutation, { id: user.id });
}
