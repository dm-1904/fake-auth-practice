import { MovieType } from "./types";

export type RequestType = {
  fetchAllMovies: () => Promise<MovieType[]>;
  postData: (note: Omit<MovieType, "id">) => Promise<MovieType>;
  deleteMovie: (id: number) => Promise<void>;
  patchItem: (
    id: number,
    updatedItem: Partial<MovieType>
  ) => Promise<MovieType | null>;
};

const API_URL = "http://localhost:3000";

export const Requests = {
  fetchAllMovies: () => {
    return fetch(`${API_URL}/movies`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Request faild with status ${res.status}`);
        }
        return res.json();
      })
      .catch((error: Error) => {
        throw new Error(
          `Fetching all movies failed with the error: ${error.message}`
        );
      });
  },
  // postData Usage examples:
  // const postItem = (note: MovieType) => postData<MovieType, Type>("movies", note);
  // const registerUser = (user: { username: string; password: string }) =>
  //   postData<{ username: string; password: string }, Type>("app-users", user);
  postData: <T, R>(endpoint: string, data: T): Promise<R> => {
    return fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`HTTP POST failed with status ${res.status}`);
      })
      .catch((error: Error) => {
        console.error(`Error posting to ${endpoint}`, error);
        throw new Error(`Posting to ${endpoint} failed: ${error.message}`);
      });
  },
  deleteMovie: (id: number): Promise<void> => {
    return fetch(`${API_URL}/movie/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete item with status ${res.status}`);
        }
      })
      .catch((error: Error) => {
        throw new Error(`Deleting item failed with error: ${error.message}`);
      });
  },
  patchItem: (
    id: number,
    updatedItem: Partial<MovieType>
  ): Promise<MovieType | null> => {
    return fetch(`${API_URL}/item/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to PATCH item with status ${res.status}`);
        }
        return res.json();
      })
      .catch((error) => {
        throw new Error(`Failed to PATCH item with error: ${error.message}`);
      });
  },
  getUserFromServer: ({ username }: { username: string }) => {
    fetch(`${API_URL}/app-users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Could not get user ${res.status}`);
        }
        return res.json();
      })
      .then((users: { username: string }[]) =>
        users.find((user) => user.username === username)
      )
      .then((user) => {
        if (!user) {
          throw new Error(`User not found`);
        }
        return user;
      });
  },
};
