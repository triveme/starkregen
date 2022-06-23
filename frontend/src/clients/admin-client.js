import { useQuery } from "react-query";

import { client } from "./client";

async function getAdmins(token) {
  if (token === null) return;

  return client
    .get("/admins", {
      headers: token
        ? {
            "x-access-token": token,
          }
        : null,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
}

export function useAdmins(token, queryTrigger) {
  const queryResult = useQuery({
    queryKey: ["admins", token, queryTrigger],
    queryFn: () => getAdmins(token ? token : null),
  });

  return { ...queryResult, admins: queryResult.data };
}

export function createAdmin(token, adminData) {
  return client.post("/admins", adminData, {
    headers: {
      "x-access-token": token,
    },
  });
}

export function updateAdmin(token, adminId, adminData) {
  if (!token || !adminId || !adminData) {
    console.log("Can't update admin, missing parameter(s).");
    return;
  }

  return client.put("/admins/" + adminId, adminData, {
    headers: {
      "x-access-token": token,
    },
  });
}

export function deleteAdmin(token, adminId) {
  if (!token || !adminId) {
    console.log("Can't delete admin, missing parameter(s).");
    return;
  }

  return client.delete("/admins/" + adminId, {
    headers: {
      "x-access-token": token,
    },
  });
}
