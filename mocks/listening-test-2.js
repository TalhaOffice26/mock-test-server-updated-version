const questions = [
  {   
    "part": 1,
    "group": 11,
    "heading": "Local foodshops",
    "subheadings": ["Where to go", "Fist market", "Organic shop", "Supermarket"],
    "paragraphs": [["-- Kite place - near the [blank]"], 
                    ["-- cross the [blank] and turn right", "-- best to go before [blank] pm, earlier than closing time"], 
                    ["-- called [blank]", "-- below a restaurant in the large, grey building", "-- look for the large [blank] outside"], 
                    ["take a [blank] minibus, number 289"]],
    "id": [1, 2, 3, 4, 5, 6],
    "type": "note-completion",
    "answer": ["a", "b", "c", "d", "e", "f"]
  },
  {
    "part": 1,
    "group": 12,
    "type": "table-completion",
    "table-structure": [1, 3, 3, 3, 3],
    "id": [7, 8, 9, 10],
    "cells": [["<strong>shopping</strong>"],
              ["", "<strong>to buy</strong>", "<strong>other ideas</strong>"],
              ["<strong>Fish market</strong>", "a dozen prawns", "a handful of [blank] (type of seaweed)"],
              ["<strong>Organic shop</strong>", "beans and a [blank] for dessert", "spices and [blank]"],
              ["<strong>Bakery</strong>", "a brown loaf", "a [blank] tart"]
            ],
    "answers": [1, 3, 2, 5]
  },
  {
    "part": 2,
    "group": 21,
    "type": "feature-matching",
    "id": [11, 12, 13, 14, 15, 16],
    "options": ["involves painting and drawing", 
                "will be led by a prize winning author", 
                "is aimed at children with a disability",
                "involves a drama activity",
                "focuses on new relationships",
                "is aimed at a specific age group",
                "explores an unhappy feeling",
                "raises awareness of a particular culture"],
    "features": ["superheroes", "just do it", "count on me", "speak up", "jump for joy", "sticks and stones"],
    "answers": [1, 3, 2, 5]

  },
  {
    "part": 2,
    "group": 22,
    "type": "mcq-two-choice-updated",
    "id": [[17, 18], [19, 20]],
    "questions": [["Which TWO reasons does the speaker give for recommending Alive and Kicking"], ["Which TWO pieces of advice does the speaker give to parents about reading?"]],
    "options": [["It will appeal to both boys and girls.", "The author is well known.", "It has colourful illustrations", "it is funny.", "It deals with an important topic."], 
                ["Encourage children to write down new vocabulary", "Allow children to listen to audio books.", "Get recommendation from librarians", "Give children a choice about what they read", "Only read aloud to children untill they can read independently."]],
    "answers": [["A", "C"], ["D", "E"]]
  },
  {
    "part": 3,
    "group": 31,
    "type": "mcq-updated",
    "id": [21, 22, 23, 24, 25],
    "questions": ["How does Clare feel about the students in her year 12 science class?", "How does Jake react to Clare's suggestion about an experiment based on children's diet?", "What problem do they agree may be involved in an experiment involving animals?", "What question do they decide the experiment should adress?", "Clare might also consider doing another experiment involving"],
    "options": [["worried that they are not making progress", "challenged by their poor behaviour in class", "frustrated at their lack of interest in the subject"], 
                ["He is concerned that the results might not be meaningful.", "He feels some of the data might be difficult to obtain.", "He suspects that the conclusions might be upsetting."], 
                ["Any results may not apply to humans.", "It may be complicated to get permission.", "Students may not be happy about animal experiments."], 
                ["Are mice capable of controlling their food intake?", "Does an increase in sugar lead to health problems?", "How much do supplements of different kinds affect health?"], 
                ["other types of food supplement.", "different genetic strains of mice.", "varying amounts of exercise."]],
    "answers": ["A", "C", "C", "C", "C"]

  },
  {
    "part": 3,
    "group": 32,
    "type": "flowchart",
    "id": [26, 27, 28, 29, 30],
    "option-header": "Steps",
    "options": ["size", "escape", "age", "water", "cereal", "calculations", "changes", "colour"],
    "question-header": "",
    "questions": ["Choose mice which are all the same", "Divide the mice into two groups, each with a different", "Put each group in a seperate cage. <br>Feed group A commercial mouse food. <br>Feed group B the same, but also sugar contained in", "Take measurements using an electronic scale. <br>Place them in a weighing chamber to prevent", "Do all necessary"],
    "answers": ["a", "a", "a", "a", "a"]
  },

  {"part": 4,
   "group": 41,
   "heading": "Tree planting",
   "subheadings": ["Reforestation projects should", "large-scale reforestation projects", "Lampang Province, Northern Thailand", "involving local communities"],
   "paragraphs":  [["include a range of tree species", "not include invasive species because of possible [blank] with native species", 
                  "aim to capture carbon, protect the environment and provide sustainable sources of [blank] for local people",
                  "use tree seeds with high genetic diversity to increase resistance to [blank] and climate change",
                  "plant trees on previously forested land which is in a bad condition, not select land which is being used for [blank]"], 
                  ["Base planning decisions on information from accurate [blank]",
                   "Drones are useful for identifying areas in Brazil which are endangered by keeping [blank] and illegal logging."
                  ], 
                  ["a forest was restored in an area damaged by mining.",
                   "a variety of native fig trees were planted, which are important for",
                   "supporting many wildlife species",
                   "increasing the [blank] of recovery by attracting animals and birds, e.g., [blank] were soon attracted to the area."
                  ],
                  ["Destruction of mangrove forests in Madagascar made it difficult for people to make a living from [blank]",
                   "the mangrove reforestation project:",
                   "provided employment for local people",
                   "restored a healthy ecosystem",
                   "protects against the higher risk of [blank]"
                  ]],
    "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    "answer": [["move", "short", "disks", "oxygen"], ["tube", "temperatures"], ["protein", "space"], ["seaweed", "endangered"]]
  },
  
]


const instructions = [
  {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {"group" : 12,
    "instruction": "Complete the table below. <br><br> Write <strong>ONE WORD ONLY</strong> for each answer.",
  },
  {"group" : 21,
    "instruction": "What information is given about each of the following festival workshops? <br><br> Choose <strong>SIX</strong> answers. Drag and Drop the correct answer."
  },
  {"group" : 22,
    "instruction": "Choose <strong>TWO</strong> letters, <strong>A-E</strong>"
  },
  {"group" : 31,
    "instruction": "Choose FIVE answers from the box and write the correct letter, A-G."
  },
  {"group" : 32,
    "instruction": "Complete the flowchart below. \r\n Drag and Drop the correct steps."
  },
  {"group" : 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
  ]





  const answers = {
    1: ["harbour", "harbor"],
    2: ["bridge"],
    3: ["3.30", "3:30", "three thirty", "half 3", "tree"],
    4: ["Rose", "rose"],
    5: ["sign"],
    6: ["purple"],
    7: ["samphire"],
    8: ["melon"],
    9: ["coconut"],
    10:["strawberry"],
    11:["is aimed at children with a disability"],
    12:["involves a drama activity"],
    13:["is aimed at a specific age group"],
    14:["explores an unhappy feeling"],
    15:["will be led by a prize-winning author"],
    16:["raises awareness of a particular culture"],
    17:["4"],
    18:["5"],
    19:["2"],
    20:["3"],
    21:["3"],
    22:["2"],
    23:["1"],
    24:["1"],
    25:["3"],
    26:["age"],
    27:["colour"],
    28:["cereal"],
    29:["escape"],
    30:["calculations"],
    31:["clothing"],
    32:["mouths"],
    33:["salt"],
    34:["toothpaste"],
    35:["fertilizers", "fertilisers"],
    36:["nutrients"],
    37:["growth"],
    38:["weight"],
    39:["acid"],
    40:["society"]
}