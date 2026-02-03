export const phases = [
  {
    id: "foundational",
    type: "independent", // can be shuffled with other independent phases
    sections: [
      {
        id: "spatial",
        order: "random",
        prompts: [
          "Weight",
          "Distance",
          "Edge",
          "Boundary",
          "Containment"
        ]
      },
      {
        id: "temporal",
        order: "random",
        prompts: [
          "Delay",
          "Waiting",
          "Ending",
          "Beginning",
          "Repetition"
        ]
      },
      {
        id: "order",
        order: "random",
        prompts: [
          "Order",
          "Rule",
          "Authority",
          "Error",
          "Control"
        ]
      }
    ]
  },

  {
    id: "relational",
    type: "independent",
    sections: [
      {
        id: "connection",
        order: "random",
        prompts: [
          "Trust",
          "Distance",
          "Closeness",
          "Loyalty",
          "Betrayal"
        ]
      }
    ]
  },

  {
    id: "dependent_deepening",
    type: "dependent", // must follow earlier phases
    sections: [
      {
        id: "moral_load",
        order: "fixed",
        prompts: [
          "Responsibility",
          "Guilt",
          "Innocence",
          "Failure"
        ]
      }
    ]
  }
];
