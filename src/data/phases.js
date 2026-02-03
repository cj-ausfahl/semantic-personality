export const phases = [
  {
    id: "foundational",
    type: "independent", // can be shuffled with other independent phases
    sections: [
      {
        id: "spatial",
        order: "random",
        prompts: [
          // Anchors (pull towards containment)
            "Boundary",
            "Containment",
            "Limit",
            "Hold",

          // Contrast (loss of containment)
            "Exposure",
            "Leak",
            "Overflow",

          // Thresholds (at the edge of containment)
            "Edge",
            "Breach",
            "Threshold",

          // Protection (preserving containment)
            "Guard",
            "Shield"
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
