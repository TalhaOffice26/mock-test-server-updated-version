const questions = [
  {
    "part": 1,
    "group": 11,
    "heading": "TOTAL HEALTH CLINIC",
    "subheading": "PATIENT DETAILS",
    "type": "note-completion",
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "paragraphs": [
      ["<strong>Personal information</strong>", "Example: Name Julie Anne Garcia", "Contact phone: [blank]", "Date of birth: [blank], 1992", "Occupation: works as a [blank]", "Insurance company: [blank] Life Insurance"],
      ["<strong>Details of the problem</strong>", "Type of problem: pain in her left [blank]", "When it began: [blank] ago", "Action already taken: has taken painkillers and applied ice"],
      ["<strong>Other information</strong>", "Sports played: belongs to a [blank] club", "goes [blank] Regularly", "Medical history: injured her [blank] last year", "no allergies", "no regular medication apart from [blank]"]
    ]
  },
  {
    "part": 2,
    "group": 21,
    "type": "mcq-updated",
    "id": [11, 12, 13, 14, 15, 16],
    "questions": [
      "What made David leave London and move to Northsea?",
      "The Lifeboat Institution in Northsea was built with money provided by",
      "In his health assessment, the doctor was concerned about the fact that David",
      "After arriving at the lifeboat station, they aim to launch the boat within",
      "As a ‘helmsman’, David has the responsibility of deciding",
      "As well as going out on the lifeboat, David"
    ],
    "options": [
      ["He was eager to develop a hobby.", "He wanted to work shorter hours.", "He found his job in website design unsatisfying"],
      ["a local organisation.", "a local resident.", "the local council."],
      ["might be colour blind.", "was rather short-sighted.", "had undergone eye surgery."],
      ["five minutes.", "six to eight minutes.", "eight and a half minutes."],
      ["who will be the members of his crew.", "what equipment it will be necessary to take.", "if the lifeboat should be launched."],
      ["gives talks on safety at sea.", "helps with fundraising.", "recruits new volunteers."]
    ]
  },
  {
    "part": 2,
    "group": 22,
    "type": "mcq-two-choice-updated",
    "id": [[17, 18], [19, 20]],
    "questions": [
      ["Which TWO things does David say about the lifeboat volunteer training?"],
      ["Which TWO things does David find most motivating about the work he does?"]
    ],
    "options": [
      ["The residential course developed his leadership skills.", "The training in use of ropes and knots was quite brief.", "The training exercises have built up his mental strength.", "The casualty care activities were particularly challenging for him.", "The wave tank activities provided practice in survival techniques."],
      ["working as part of a team", "experiences when working in winter", "being thanked by those he has helped", "the fact that it keeps him fit", "the chance to develop new equipment"]
    ]
  },
  {
    "part": 3,
    "group": 31,
    "type": "mcq-updated",
    "id": [21, 22, 23, 24],
    "questions": [
      "Why do the students think the Laki eruption of 1783 is so important?",
      "What surprised Adam about observations made at the time?",
      "According to Michelle, what did the contemporary sources say about the Laki haze?",
      "Adam corrects Michelle when she claims that Benjamin Franklin"
    ],
    "options": [
      ["It was the most severe eruption in modern times.", "It led to the formal study of volcanoes.", "It had a profound effect on society."],
      ["the number of places producing them", "the contradictions in them", "the lack of scientific data to support them"],
      ["People thought it was similar to ordinary fog.", "It was associated with health issues.", "It completely blocked out the sun for weeks."],
      ["came to the wrong conclusion about the cause of the haze.", "was the first to identify the reason for the haze.", "supported the opinions of other observers about the haze."]
    ]
  },
  {
    "part": 3,
    "group": 32,
    "type": "mcq-two-choice-updated",
    "id": [[25, 26]],
    "questions": [["Which TWO issues following the Laki eruption surprised the students?"]],
    "options": [
      ["how widespread the effects were", "how long-lasting the effects were", "the number of deaths it caused", "the speed at which the volcanic ash cloud spread", "how people ignored the warning signs"]
    ]
  },
  {
    "part": 3,
    "group": 33,
    "type": "feature-matching",
    "id": [27, 28, 29, 30],
    "options": [
      "This country suffered the most severe loss of life.",
      "The impact on agriculture was predictable.",
      "There was a significant increase in deaths of young people.",
      "Animals suffered from a sickness.",
      "This country saw the highest rise in food prices in the world.",
      "It caused a particularly harsh winter."
    ],
    "features": ["Iceland", "Egypt", "UK", "USA"]
  },
  {
    "part": 4,
    "group": 41,
    "heading": "Health benefits of dance",
    "type": "note-completion",
    "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    "paragraphs": [
      ["<strong>Recent findings:</strong>", "• All forms of dance produce various hormones associated with feelings of happiness.", "• Dancing with others has a more positive impact than dancing alone.", "• An experiment on university students suggested that dance increases [blank]", "• For those with mental illness, dance could be used as a form of [blank]"],
      ["<strong>Benefits of dance for older people:</strong>", "• accessible for people with low levels of [blank]", "• reduces the risk of heart disease", "• better [blank] reduces the risk of accidents", "• improves [blank] function by making it work faster", "• improves participants’ general well-being", "• gives people more [blank] to take exercise", "• can lessen the feeling of [blank], very common in older people"],
      ["<strong>Benefits of Zumba:</strong>", "• A study at The University of Wisconsin showed that doing Zumba for 40 minutes uses up as many [blank] as other quite intense forms of exercise.", "• The American Journal of Health Behavior study showed that:", "– women suffering from [blank] benefited from doing Zumba.", "– Zumba became a [blank] for the participants."]
    ]
  }
];

const instructions = [
  {
    "group": 11,
    "instruction": "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer."
  },
  {
    "group": 21,
    "instruction": "Choose the correct letter, <strong>A, B or C</strong>."
  },
  {
    "group": 22,
    "instruction": "Choose <strong>TWO</strong> letters, <strong>A–E</strong>."
  },
  {
    "group": 31,
    "instruction": "Choose the correct letter, <strong>A, B or C</strong>."
  },
  {
    "group": 32,
    "instruction": "Choose <strong>TWO</strong> letters, <strong>A-E</strong>."
  },
  {
    "group": 33,
    "instruction": "What comment do the students make about the impact of the Laki eruption on the following countries? <br><br> Choose <strong>FOUR</strong> answers from the box."
  },
  {
    "group": 41,
    "instruction": "Complete the notes below. <br><br>Write <strong>ONE WORD ONLY</strong> for each answer."
  }
];

const answers = {
  1: ["219 442 9785", "2194429785"],
  2: ["10 October", "10th October"],
  3: ["manager"],
  4: ["Cawley"],
  5: ["knee"],
  6: ["3 weeks"],
  7: ["tennis"],
  8: ["running"],
  9: ["shoulder"],
  10: ["vitamins"],
  11: ["3"],
  12: ["2"],
  13: ["1"],
  14: ["2"],
  15: ["3"],
  16: ["1"],
  17: ["3"],
  18: ["5"],
  19: ["1"],
  20: ["2"],
  21: ["3"],
  22: ["1"],
  23: ["2"],
  24: ["2"],
  25: ["1"],
  26: ["2"],
  27: ["Animals suffered from a sickness."],
  28: ["This country suffered the most severe loss of life."],
  29: ["There was a significant increase in deaths of young people."],
  30: ["It caused a particularly harsh winter."],
  31: ["creativity"],
  32: ["therapy"],
  33: ["fitness"],
  34: ["balance"],
  35: ["brain"],
  36: ["motivation"],
  37: ["isolation"],
  38: ["calories"],
  39: ["obesity"],
  40: ["habit"]
};