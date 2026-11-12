const questions = [
    {   
    "part": 1,
    "group": 11,
    "heading": "Advice on Family Visit",
    "subheadings": ["Accommodation", "Recommended Trips", "Science Museum", "Food", "Theatre Tickets", "Free Activities"],
    "paragraphs": [ 
                    ["-- [blank] Hotel on George Street",
                     "– Cost of family room per night: £ [blank] (approx)."
                    ], 
                    ["A [blank] tour of the city centre (starts in Carlton Square)",
                     "A trip by [blank] to the old fort"
                    ], 
                    ["Best day to visit: [blank]",
                     "See the exhibition about [blank] which opens soon"
                    ],
                    [
                        "Clacton market:",
                        "– Good for [blank] food",
                        "– Need to have lunch before [blank] p.m."
                    ],
                    [
                        "-- Save up to [blank] % on ticket prices at bargaintickets.com"
                    ],
                    [
                        "Blakewell Gardens:",
                        "– Roots Music Festival",
                        "– Climb Telegraph Hill to see a view of the [blank]"
                    ]
                ],
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "type": "note-completion",
  },
      {
        "part": 2,
        "group": 21,
        "type": "mcq-two-choice-updated",
        "id": [[11, 12], [13, 14]],
        "questions": [["Which TWO things does the speaker say about visiting the football stadium with children?"], 
                     ["Which TWO features of the stadium tour are new this year?"]],
        "options": [["Children can get their photo taken with a football player", 
                    "There is a competition for children today", 
                    "Parents must stay with their children at all times", 
                    "Children will need sunhats and drinks", 
                    "The café has a special offer on meals for children"],
                    ["VIP tour",
                     "360 cinema experience",
                     "audio guide",
                     "dressing room tour",
                     "tours in other languages"
                    ]
                ]
    },
{
    "part": 2,
    "group": 22,
    "type": "feature-matching",
    "id": [15, 16, 17, 18, 19, 20],
    "options": ["the introduction of pay for the players", 
                "a change to the design of the goal", 
                "the first use of lights for matches",
                "the introduction of goalkeepers",
                "the first international match",
                "two changes to the rules of the game",
                "the introduction of a fee for spectators",
                "an agreement on the length of a game"
            ],
    "features": ["1870", "1874", "1875", "1877", "1878", "1880"],
},
{
        "part": 3,
        "group": 31,
        "type": "mcq-two-choice-updated",
        "id": [[21, 22], [23, 24]],
        "questions": [["Which TWO benefits for children of learning to write did both students find surprising?"], 
                     ["For children with dyspraxia, which TWO problems with handwriting do the students think are easiest to correct?"]],
        "options": [["improved fine motor skills", 
                    "improved memory", 
                    "improved concentration", 
                    "improved imagination", 
                    "improved spatial awareness"],
                    ["not spacing letters correctly",
                     "not writing in a straight line",
                     "applying too much pressure when writing",
                     "confusing letter shapes",
                     "writing very slowly"
                    ]
                ]
    },
{
    "part": 3,
    "group": 32,
    "type": "mcq-updated",
    "id": [25, 26, 27, 28, 29, 30],
    "questions": ["What does the woman say about using laptops to teach writing to children with dyslexia?",
                  "When discussing whether to teach cursive or print writing, the woman thinks that",
                  "According to the students, what impact does poor handwriting have on exam performance?",
                  "What prediction does the man make about the future of handwriting?",
                  "The woman is concerned that relying on digital devices has made it difficult for her to",
                  "How do the students feel about their own handwriting?"
    ],
    "options": [
                ["Children often lack motivation to learn that way", 
                 "Children become fluent relatively quickly",
                 "Children react more positively if they make a mistake"], 
                ["cursive writing disadvantages a certain group of children",
                 "print writing is associated with lower academic performance", 
                 "most teachers in the UK prefer a traditional approach to handwriting"], 
                ["There is evidence to suggest grades are affected by poor handwriting", 
                 "Neat handwriting is less important now than it used to be", 
                 "Candidates write more slowly and produce shorter answers"],
                [
                "Touch typing will be taught before writing by hand",
                "Children will continue to learn to write by hand",
                "People will dislike handwriting on digital devices"
               ],
               [
                "take detailed notes",
                "spell and punctuate",
                "read old documents"
               ],
               [
                "concerned they are unable to write quickly",
                "embarrassed by comments made about it",
                "regretful that they have lost the habit"
               ]
                ], 
},
{
   "part": 4,
   "group": 41,
   "heading": "Research in the Area Around the Chem be Bird Sanctuary",
   "subheadings": ["The importance of birds of prey to local communities", "Falling numbers of birds of prey", "Ways of protecting chickens from birds of prey"],
   "paragraphs":  [["They destroy [blank] and other rodents.", 
                    "They help prevent farmers from being bitten by [blank].",
                    "They have been an important part of local culture for many years.",
                    "They now support the economy by encouraging [blank] in the area."
                  ], 
                  ["– The birds may be accidentally killed:",
                   "— By [blank] when hunting or sleeping.",
                   "-- By electrocution from power lines, especially during times of high [blank].",
                   "– Local farmers may illegally shoot them or [blank] them."
                  ], 
                  ["— Clearing away vegetation (unhelpful).",
                    "– Providing a [blank] for chickens (expensive).",
                    "– Frightening birds of prey by:",
                    "Keeping a [blank]",
                    "Making a [blank] (e.g., with metal objects).",
                    "– A [blank] of methods is usually most effective."
                  ]
                ],
    "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 
}

]


const instructions = [
  {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {
    "group" : 21,
    "instruction": "Choose TWO options for each.",
  },
  {
    "group" : 22,
    "instruction": "Which event in the history of football in the UK took place in each of the following years? <br><br> Drag and Drop the correct answer."
  },
  {
    "group" : 31,
    "instruction": "Choose TWO options for each."
  },
  {
    "group" : 32,
    "instruction": "Choose the correct option"
  },
  {
    "group" : 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
  ]

    const answers = {
    1: ["kings", "king's"],
    2: ["125"],
    3: ["walking"],
    4: ["boat"],
    5: ["tuesday"],
    6: ["space"],
    7: ["vegetarian"],
    8: ["2.30", "2:30"],
    9: ["75"],
    10:["port"],
    11:["2"],
    12:["3"],
    13:["1"],
    14:["3"],
    15:["the introduction of goalkeepers"],
    16:["two changes to the rules of the game"],
    17:["a change to the design of the goal"],
    18:["an agreement on the length of a game"],
    19:["the first use of lights for matches"],
    20:["the introduction of a fee for spectators"],
    21:["3"],
    22:["5"],
    23:["1"],
    24:["3"],
    25:["3"],
    26:["1"],
    27:["1"],
    28:["2"],
    29:["2"],
    30:["3"],
    31:["rats"],
    32:["snakes"],
    33:["tourism"],
    34:["traffic"],
    35:["rain"],
    36:["poison"],
    37:["building"],
    38:["dog"],
    39:["noise"],
    40:["combination"]
}