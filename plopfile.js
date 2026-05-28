module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "Component type:",
        choices: ["atoms", "molecules", "organisms", "templates"],
      },
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/components/{{type}}/{{pascalCase name}}",
        templateFiles: "plop-templates/component/*.hbs",
        base: "plop-templates/component",
      },
    ],
  });
};
