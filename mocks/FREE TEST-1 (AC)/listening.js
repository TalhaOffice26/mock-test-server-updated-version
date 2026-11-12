const questions = [
    {   
    "part": 1,
    "group": 11,
    "heading": "Transport Survey",
    "subheadings": ["Example", "Name:", "Address:", "Area:", "Postcode:", "Occupation:", "Reason for visit to town:", "Suggestions for improvement:", "Things that would encourage cycling to work:"],
    "paragraphs": [ ["Travelled to town today: by ……….bus………."], 
                    ["Luisa [blank]"],
                    ["[blank] White Stone Rd"],
                    ["Bradfield"],
                    ["[blank]"],
                    ["[blank]"],
                    ["to go to the [blank]"],
                    ["• better [blank]", "• have more footpaths", "• more frequent [blank]"],
                    ["• having [blank] parking places for bicycles.", "• being able to use a [blank] at work.", "• the opportunity to have cycling [blank] on busy roads."]],
    "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "type": "note-completion",

  },
    {
    "part": 2,
    "group": 21,
    "type": "mcq-updated",
    "id": [11, 12, 13, 14],
    "questions": ["The idea for the two new developments in the city came from", "What is unusual about Brackenside pool?", "Local newspapers have raised worries about", "What decision has not yet been made about the pool?"],
    "options": [
                ["local people.", "the City Council.", "the SWRDC."], 
                ["its architectural style", "its heating system", "its method of water treatment"], 
                ["the late opening date.", "the cost of the project.", "the size of the facilities."], 
                ["whose statue will be at the door", "the exact opening times", "who will open it"]
            ],
  },
  {
    "part": 2,
    "group": 22,
    "type": "feature-matching",
    "id": [15, 16, 17, 18, 19, 20],
    "options": ["ancient forts", 
                "waterways", 
                "ice and snow",
                "jewels",
                "local animals",
                "mountains",
                "music and film",
                "space travel",
                "volcanoes"],
    "features": ["Asia", "Antarctica", "South America", "North America", "Europe", "Africa"],
  },
  {
        "part": 3,
        "group": 31,
        "type": "mcq-two-choice-updated",
        "id": [[21, 22], [23, 24]],
        "questions": [["Which TWO hobbies was Thor Heyerdahl very interested in as a youth?"], 
                     ["Which do the speakers say are the TWO reasons why Heyerdahl went to live on an island?"]],
        "options": [["camping", 
                    "climbing", 
                    "collecting", 
                    "hunting", 
                    "reading"],
                    ["to examine ancient carvings",
                     "to experience an isolated place",
                     "to formulate a new theory",
                     "to learn survival skills",
                     "to study the impact of an extreme environment"
                    ]
                ]
    },
        {
        "part": 3,
        "group": 32,
        "type": "mcq-updated",
        "id": [25, 26, 27, 28, 29, 30],
        "questions": ["According to Victor and Olivia, academics thought that Polynesian migration from the east was impossible due to",
           "Which do the speakers agree was the main reason for Heyerdahl’s raft journey?", 
           "What was most important to Heyerdahl about his raft journey?", 
           "Why did Heyerdahl go to Easter Island?", 
           "In Olivia’s opinion, Heyerdahl’s greatest influence was on", 
           "Which criticism do the speakers make of William Oliver’s textbook?"
          ],
        "options": [["the fact that Eastern countries were far away.", 
                    "the lack of materials for boat building.", 
                    "the direction of the winds and currents."
                  ],
                    ["to overcome a research setback", 
                     "to demonstrate a personal quality", 
                     "to test a new theory"
                    ],
                    ["the fact that he was the first person to do it", 
                     "the speed of crossing the Pacific", 
                     "the use of authentic construction methods"
                    ],
                    ["to build a stone statue", 
                     "to sail a reed boat", 
                     "to learn the local language"
                    ],
                    ["theories about Polynesian origins.", 
                     "the development of archaeological methodology.", 
                     "establishing archaeology as an academic subject."
                    ],
                    ["Its style is out of date.", 
                     "Its content is over-simplified.", 
                     "Its methodology is flawed."
                    ]
                ]  
    },
        {
        "part": 4,
        "group": 41,
        "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        "heading": "THE FUTURE OF MANAGEMENT",
        "subheadings": ["Business markets", "External influences on businesses", "Business structures", "Management styles", "Changes in the economy"],
        "paragraphs": [
            [
              "greater [blank] among companies",
              "increase in power of large [blank] Companies",
              "rising [blank] in certain countries"
            ],
            [
              "more discussion with [blank] before making business decisions",
              "environmental concerns which may lead to more [blank]"
            ],
            [
              "more teams will be formed to work on a particular [blank]",
              "businesses may need to offer hours that are [blank], or the chance to work remotely"
            ],
            [
              "increasing need for managers to provide good [blank]",
              "changes influenced by [blank] taking senior roles"
            ],
            [
              "service sector continues to be important",
              "increasing value of intellectual property",
              "more and more [blank] workers"
            ]
        ] 
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
    "instruction": "Which feature is related to each of the following areas of the world represented in the playground? <br><br> Drag and drop to the correct section."
  },
  {
    "group" : 31,
    "instruction": "Choose <strong>TWO OPTIONS</strong> for each pair."
  },
  {
    "group" : 32,
    "instruction": "Choose the correct option. <br><br> <strong>The later life of Thor Heyerdahl</strong>"
  },
  {
    "group" : 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
]

const answers = {
    1: ["hardie"],
    2: ["19"],
    3: ["gt8 2lc", "gt82lc"],
    4: ["hairdresser"],
    5: ["dentist", "dentist's"],
    6: ["lighting"],
    7: ["trains"],
    8: ["safe"],
    9: ["shower"],
    10:["training"],
    11:["1"],
    12:["3"],
    13:["3"],
    14:["1"],
    15:["local animals"],
    16:["mountains"],
    17:["jewels"],
    18:["space travel"],
    19:["ancient forts"],
    20:["waterways"],
    21:["2"],
    22:["3"],
    23:["2"],
    24:["5"],
    25:["1"],
    26:["3"],
    27:["3"],
    28:["1"],
    29:["2"],
    30:["1"],
    31:["competition"],
    32:["global"],
    33:["demand"],
    34:["customers"],
    35:["regulation"],
    36:["project"],
    37:["flexible"],
    38:["leadership"],
    39:["women"],
    40:["self-employed"]
}