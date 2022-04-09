import { gql } from "../../deps.ts";
import { queryOrMutation } from "./graph_service.ts";
import type { User } from "./types/user.ts";

export async function getUsers(): Promise<User[]> {
  const query = gql`
    query MyQuery {
        queryUser(offset: 0) {
            id
            discordId
            username
            counter
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
            username
        }
    }`;

  const data = await queryOrMutation<{ queryUser: User[] }>(query, {
    eq: discordUserId.toString(),
  });

  return data?.queryUser?.[0] as User;
}

export async function getUserByUsername(
  username: string,
): Promise<User | undefined> {
  const query = gql`
    query getUserByUsername($eq: String) {
        queryUser(filter: {username: {eq: $eq}}, first: 1) {
            counter
            discordId
            id
            username
        }
    }`;

  const data = await queryOrMutation<{ queryUser: User[] }>(
    query,
    { eq: username },
  );

  return data?.queryUser?.[0] as User;
}

export async function addUser(user: User): Promise<void> {
  const mutation = gql`
    mutation addUser($discordId: String!, $username: String) {
        addUser(input: { discordId: $discordId, username: $username }) {
            user {
                id,
                discordId,
                username
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
