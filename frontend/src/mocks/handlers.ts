import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("/api/templates", () => {
    return HttpResponse.json({
      templates: [
        {
          id: 1,
          name: "Template 1",
          description: "This is an example template"
        },
        {
          id: 2,
          name: "Template 2",
          description: "This is another example template"
        }
      ]
    });
  })
];
