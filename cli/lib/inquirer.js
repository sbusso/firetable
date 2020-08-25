const inquirer = require("inquirer");
const chalk = require("chalk");

module.exports = {
  selectFirebaseProject: projects =>
    inquirer.prompt({
      name: "projectId",
      type: "list",
      message: "Select the Firebase project you want deploy to:",
      choices: projects,
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return `Please enter the Project ID of the Firebase project you would like to deploy to.\nOr you can create a new project here: ${chalk.underline(
            "https://console.firebase.google.com/project"
          )}`;
        }
      },
    }),

  installAlgolia: () => {
    const questions = [
      {
        type: "confirm",
        name: "installAlgolia",
        message:
          "Do you want integrate firetable with Algolia?\nYou can add Algolia later if you don’t have it set up yet",
      },
    ];
    return inquirer.prompt(questions);
  },

  askAlgoliaVariables: () => {
    const questions = [
      {
        name: "algoliaAppId",
        type: "input",
        message: "Enter your Algolia App ID:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return `Please enter your Algolia App ID\nOr you can create a new project here: ${console.underline(
              "https://algolia.com"
            )}`;
          }
        },
      },
      {
        name: "algoliaSearchKey",
        type: "input",
        message: "Enter your Algolia Search API Key (Not the admin key)",
        validate: function(value) {
          if (value.length > 5) {
            return true;
          } else {
            return "Please enter a valid Search API Key";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },

  deployToFirebaseHosting: () =>
    inquirer.prompt({
      type: "confirm",
      name: "deployToFirebase",
      message: "Do you want deploy firetable on Firebase Hosting?",
    }),

  askChangeFirebaseHostTarget: hostTarget =>
    inquirer.prompt({
      type: "confirm",
      name: "changeTarget",
      default: false,
      message: `Do you want to change your current host target (${console.bold(
        hostTarget
      )})?`,
    }),

  askFirebaseHostTarget: projectId =>
    inquirer.prompt({
      type: "input",
      name: "hostTarget",
      message: `Where do you want to deploy?\nYou can find your available sites or create a new one here: ${console.underline(
        `https://console.firebase.google.com/u/0/project/${projectId}/hosting`
      )}\nEnter your site name:`,
    }),
};
