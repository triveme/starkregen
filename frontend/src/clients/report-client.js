import { useQuery } from "react-query";

import { client } from "../clients/client";

export async function getReports(token) {
  return client
    .get("/reports", {
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

export function useReports(token, queryTrigger) {
  const queryResult = useQuery({
    queryKey: ["reports", token, queryTrigger],
    queryFn: () => getReports(token ? token : null),
  });

  return { ...queryResult, reports: queryResult.data };
}

export function createReport(reportData) {
  return client.post("/reports", reportData);
}

export function updateReport(token, reportId, reportData) {
  if (!token || !reportId || !reportData) {
    console.log("Can't update report, missing parameter(s).");
    return;
  }

  return client.put("/reports/" + reportId, reportData, {
    headers: {
      "x-access-token": token,
    },
  });
}

export function deleteReport(token, reportId) {
  if (!token || !reportId) {
    console.log("Can't delete report, missing parameter(s).");
    return;
  }

  return client.delete("/reports/" + reportId, {
    headers: {
      "x-access-token": token,
    },
  });
}
