/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("bookmarks").truncate();
  await knex("bookmarks").insert([
    {
      activity: "Binge watch a trending series",
      type: "recreational",
      participants: 1,
      price: 0.2,
      link: "",
      key: "5881647",
      accessibility: 0.2,
    },
    {
      activity: "Start a daily journal",
      type: "relaxation",
      participants: 1,
      price: 0,
      link: "",
      key: "8779876",
      accessibility: 0,
    },
    {
      activity: "Go to a karaoke bar with some friends",
      type: "social",
      participants: 4,
      price: 0.5,
      link: "",
      key: "9072906",
      accessibility: 0.35,
    },
    {
      activity: "Draw something interesting",
      type: "recreational",
      participants: 1,
      price: 0,
      link: "",
      key: "8033599",
      accessibility: 0,
    },
    {
      activity: "Uninstall unused apps from your devices",
      type: "busywork",
      participants: 1,
      price: 0,
      link: "",
      key: "2850593",
      accessibility: 0,
    },
    {
      activity: "Invite some friends over for a game night",
      type: "social",
      participants: 4,
      price: 0,
      link: "",
      key: "6613428",
      accessibility: 0.2,
    },
    {
      activity: "Watch a classic movie",
      type: "recreational",
      participants: 1,
      price: 0.1,
      link: "",
      key: "8081693",
      accessibility: 0.1,
    },
    {
      activity: "Listen to music you haven't heard in a while",
      type: "music",
      participants: 1,
      price: 0.05,
      link: "",
      key: "4296813",
      accessibility: 0.9,
    },
    {
      activity: "Make your own LEGO creation",
      type: "recreational",
      participants: 1,
      price: 0,
      link: "",
      key: "1129748",
      accessibility: 0.1,
    },
    {
      activity: "Learn how to make an Alexa skill",
      type: "education",
      participants: 1,
      price: 0,
      link: "https://developer.amazon.com/en-US/docs/alexa/custom-skills/steps-to-build-a-custom-skill.html",
      key: "1592381",
      accessibility: 0.1,
    },
  ]);
};
