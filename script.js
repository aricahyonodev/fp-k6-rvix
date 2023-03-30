import http from "k6/http";
import { check, group } from "k6";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    contacts: {
      executor: "per-vu-iterations",
      vus: 1000,
      iterations: 3500,
      maxDuration: "2s",
    },
  },
};

export default function () {
  const url = "https://reqres.in/api/users";
  group("Create Users", (_) => {
    const data = {
      name: "morpheus",
      job: "leader",
    };
    let login_response = http.post(url, data);
    check(login_response, {
      "is status 201": (r) =>  r.status === 201,
    });
  });

  group("Update Users", (_) => {
    const data = {
      name: "morpheus",
      job: "zion resident",
    };
    let login_response = http.put(`${url}/2`, data);
    check(login_response, {
      "is status 200": (r) => r.status === 200,
    });
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}