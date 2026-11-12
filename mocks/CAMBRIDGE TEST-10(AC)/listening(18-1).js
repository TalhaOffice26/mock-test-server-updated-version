const questions = [
        {   
    "part": 1,
    "group": 11,
    "heading": "Transport survey",
    "subheadings": ["Name:", "Year of birth:", "Postcode:", "Travelling by bus", "Travelling by car", "Travelling by bicycle"],
    "paragraphs": [ 
                    ["Sadie Jones"
                    ], 
                    ["1991"
                    ], 
                    ["[blank]"
                    ],
                    [
                        "Date of bus journey: [blank]",
                        "Reason for trip:   shopping and visit to the [blank]",
                        "Travelled by bus because cost of [blank] too high",
                        "Got on bus at [blank] Street",
                        "Complaints about bus service:",
                        "–   bus today was [blank]",
                        "–   frequency of buses in the [blank]",
                    ],
                    [
                        "Goes to the [blank] by car"
                    ],
                    [
                        "Dislikes travelling by bike in the city centre because of the [blank]",
                        "Doesn’t own a bike because of a lack of [blank]"
                    ]
                ],
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "type": "note-completion",
  },
  {
    "part": 2,
    "group": 21,
    "type": "mcq-updated",
    "id": [11, 12, 13],
    "questions": ["Why does the speaker apologise about the seats?",
                  "What does the speaker say about the age of volunteers?",
                  "What does the speaker say about training?",
    ],
    "options": [
                ["They are too small.", 
                 "There are not enough of them.",
                 "Some of them are very close together."], 
                ["The age of volunteers is less important than other factors.",
                 "Young volunteers are less reliable than older ones.", 
                 "Most volunteers are about 60 years old."], 
                ["It is continuous.", 
                 "It is conducted by a manager.", 
                 "It takes place online."],
                ], 
},
{
        "part": 2,
        "group": 22,
        "type": "mcq-two-choice-updated",
        "id": [[14, 15]],
        "questions": [["Which TWO issues does the speaker ask the audience to consider before they apply to be volunteers?"]],
        "options": [[
                    "their financial situation", 
                    "their level of commitment", 
                    "their work experience", 
                    "their ambition", 
                    "their availability"
                ]
                ]
    },
    {
    "part": 2,
    "group": 22,
    "type": "feature-matching",
    "id": [16, 17, 18, 19, 20],
    "options": ["experience on stage", 
                "original, new ideas", 
                "parenting skills",
                "an understanding of food and diet",
                "retail experience",
                "a good memory",
                "a good level of fitness"
            ],
    "features": ["Fundraising", "Litter collection", "‘Playmates’", "Story club", "First aid"],
},
  {
    "part": 3,
    "group": 31,
    "type": "mcq-updated",
    "id": [21, 22, 23, 24, 25, 26],
    "questions": ["What problem did Chantal have at the start of the talk?",
                  "What were Hugo and Chantal surprised to hear about the job market?",
                  "Hugo and Chantal agree that the speaker’s message was",
                  "What do Hugo and Chantal criticise about their school careers advice?",
                  "When discussing their future, Hugo and Chantal disagree on",
                  "How does Hugo feel about being an unpaid assistant?"
    ],
    "options": [
                ["Her view of the speaker was blocked.", 
                 "She was unable to find an empty seat.",
                 "The students next to her were talking."], 
                ["It has become more competitive than it used to be.",
                 "There is more variety in it than they had realised.", 
                 "Some areas of it are more exciting than others."], 
                ["unfair to them at times.", 
                 "hard for them to follow.", 
                 "critical of the industry."],
                 [
                    "when they received the advice",
                    "how much advice was given",
                    "who gave the advice"
                 ],
                 [
                    "which is the best career in fashion.",
                    "when to choose a career in fashion.",
                    "why they would like a career in fashion."
                 ],
                 [
                    "He is realistic about the practice.",
                    "He feels the practice is dishonest.",
                    "He thinks others want to change the practice."
                 ]
                ], 
},
{
        "part": 3,
        "group": 31,
        "type": "mcq-two-choice-updated",
        "id": [[27, 28], [29, 30]],
        "questions": [["Which TWO mistakes did the speaker admit she made in her first job?"], 
                     ["Which TWO pieces of retail information do Hugo and Chantal agree would be useful?"]],
        "options": [["being dishonest to her employer", 
                    "paying too much attention to how she looked", 
                    "expecting to become well known", 
                    "trying to earn a lot of money", 
                    "openly disliking her client"],
                    ["the reasons people return fashion items",
                     "how much time people have to shop for clothes",
                     "fashion designs people want but can’t find",
                     "the best time of year for fashion buying",
                     "the most popular fashion sizes"
                    ]
                ]
    },
   {
   "part": 4,
   "group": 41,
   "heading": "Elephant translocation",
   "subheadings": ["Reasons for overpopulation at Majete National Park", "Problems caused by elephant overpopulation", "The translocation process", "Advantages of translocation at Nkhotakota Wildlife Park"],
   "paragraphs":  [["• strict enforcement of anti-poaching laws", 
                    "• successful breeding"
                  ], 
                  ["• greater competition, causing hunger for elephants",
                   "• damage to [blank] in the park"
                  ], 
                  ["• a suitable group of elephants from the same [blank] was selected",
                   "• vets and park staff made use of [blank] to help guide the elephants into an open plain",
                   "• elephants were immobilised with tranquilisers",
                   " -- this process had to be completed quickly to reduce [blank]",
                   " -- elephants had to be turned on their [blank] to avoid damage to their lungs",
                   " -- elephants’ [blank] had to be monitored constantly",
                   " -- tracking devices were fitted to the matriarchs",
                   " -- data including the size of their tusks and [blank] was taken",
                   "• elephants were taken by truck to their new reserve"
                  ],
                  [
                    "• [blank] opportunities",
                    "• a reduction in the number of poachers and [blank]",
                    "• an example of conservation that other parks can follow",
                    "• an increase in [blank] as a contributor to GDP"
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
    "instruction": "Choose the correct option",
  },
  {
    "group" : 22,
    "instruction": "Choose TWO options for each"
  },
  {
    "group" : 23,
    "instruction": "What does the speaker suggest would be helpful for each of the following areas of voluntary work? <br><br> Drag and Drop the correct answer."
  },
  {
    "group" : 31,
    "instruction": "Choose the correct option"
  },
  {
    "group" : 32,
    "instruction": "Choose TWO options for each",
  },
  {
    "group": 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
]


const answers = {
    1: ["DW30 7YZ", "DW307YZ"],
    2: ["24 April", "April 24", "24th April", "April 24th", "24/04", "04/24"],
    3: ["dentist"],
    4: ["parking"],
    5: ["claxby"],
    6: ["late"],
    7: ["evening"],
    8: ["supermarket"],
    9: ["pollution"],
    10:["storage"],
    11:["3"],
    12:["1"],
    13:["1"],
    14:["2"],
    15:["5"],
    16:["original, new ideas"],
    17:["a good level of fitness"],
    18:["an understanding of food and diet"],
    19:["experience on stage"],
    20:["a good memory"],
    21:["1"],
    22:["2"],
    23:["1"],
    24:["3"],
    25:["2"],
    26:["1"],
    27:["2"],
    28:["5"],
    29:["1"],
    30:["3"],
    31:["fences"],
    32:["family"],
    33:["helicopters"],
    34:["stress"],
    35:["sides"],
    36:["breathing"],
    37:["feet"],
    38:["employment"],
    39:["weapons"],
    40:["tourism"]
}