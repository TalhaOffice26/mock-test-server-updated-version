const questions = [
    {
        "part": 1,
        "group": 11,
        "type": "note-completion",
        "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "heading": "Hinchingbrooke Country Park",
        "subheadings": ["The park", "Subjects studied in educational visits include", "Benefits of outdoor educational visits", "Practical issues"],
        "paragraphs": [
                ["--Area: [blank] hectares", "Habitats: wetland, grassland and woodland", "Wetland: lakes, ponds and a [blank]", "Wildlife includes birds, insects and animals"],
                ["Science: Children look at [blank] about plants, etc.", 
                 "Geography: includes learning to use a [blank] and compass History: changes in land use",
                 "Leisure and tourism: mostly concentrates on the park's [blank]",
                 "Music: Children make [blank] with natural materials, and experiment with rhythm and speed."
                ],
                ["They give children a feeling of [blank] that they may not have elsewhere.",
                 "Children learn new [blank] and gain self-confidence."
                ],
                ["Cost per child: $ [blank]",
                 "Adults, such as [blank], free"
                ]
        ]
    },
    {
        "part": 2,
        "group": 21,
        "type": "mcq-updated",
        "id": [11, 12, 13, 14, 15],
        "questions": ["During the visit to Malatte, in France, members especially enjoyed", "What will happen in Stanthorpe to mark the 25th anniversary of the Twinning Association?", "Which event raised most funds this year?", "For the first evening with the French visitors host families are advised to", "On Saturday evening there will be the chance to"],
        "options": [["going to a theme park.", "experiencing a river trip.", "visiting a cheese factory."],
                    ["A tree will be planted.", "A garden seat will be bought.", "A footbridge will be built."],
                    ["the film show", "the pancake evening", "the cookery demonstration"],
                    ["take them for a walk round the town.", "go to a local restaurant.", "have a meal at home."],
                    ["listen to a concert.", "watch a match.", "take part in a competition."]]
    },
    {
        "part": 2,
        "group": 22,
        "type": "diagram-labelling",
        "image": "https://pub-35f6e385af654edaa1c5aded83150048.r2.dev/external-images/cambridge-ielts-19-academic-listening-test-1-16-20.png",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H"],
        "id": [16, 17, 18, 19, 20],
        "labels": ["Farm shop",
                   "Disabled entry",
                   "Adventure playground",
                   "Kitchen gardens",
                   "The Temple of the Four Winds"
        ]
    },
    {
        "part": 3,
        "group": 31,
        "type": "mcq-two-choice-updated",
        "id": [[21, 22], [23, 24]],
        "questions": [["Which TWO things did Colin find most satisfying about his bread reuse project?"], ["Which TWO ways do the students agree that touch-sensitive sensors for food labels could be developed in future?"]],
        "options": [["receiving support from local restaurants", "finding a good way to prevent waste", "overcoming problems in a basic process", "experimenting with designs and colours", "learning how to apply 3-D printing"],
                    ["for use on medical products", "to show that food is no longer fit to eat", "for use with drinks as well as foods", "to provide applications for blind people", "to indicate the weight of certain foods"]
                ]
    },
    {
        "part": 3,
        "group": 32,
        "type": "feature-matching",
        "id": [25, 26, 27, 28, 29, 30],
        "options": [
            "This is only relevant to young people.",
            "This may have disappointing results.",
            "This already seems to be widespread.",
            "Retailers should do more to encourage this.",
            "More financial support is needed for this.",
            "Most people know little about this.",
            "There should be stricter regulations about this.",
            "This could be dangerous."
        ],
        "features": ["Use of local products", "Reduction in unnecessary packaging", "Gluten-free and lactose-free food", "Use of branded products related to celebrity chefs", "Development of 'ghost kitchens’ for takeaway food", "Use of mushrooms for common health concerns"]
    },
    {
        "part": 4,
        "group": 41,
        "heading": "Céide Fields",
        "subheadings": ["Discovery", "Neolithic farmers", "Reasons for the decline in farming"],
        "paragraphs": [
            ["--In the 1930s, a local teacher realised that stones beneath the bog surface were once [blank]",
             "--His [blank] became an archaeologist and undertook an investigation of the site:",
             "--a traditional method used by local people to dig for [blank] was used to identify where stones were located",
             "--carbon dating later proved the site was Neolithic.",
             "--Items are well preserved in the bog because of a lack of [blank]"
            ],
            ["--Houses were [blank] in shape and had a hole in the roof.",
             "Neolithic innovations include:",
             "--cooking indoors",
             "--pots used for storage and to make [blank]",
             "--Each field at Céide was large enough to support a big [blank]",
             "The fields were probably used to restrict the grazing of animals – no evidence of structures to house them during [blank]"
            ],
            ["a decline in [blank] quality",
             "an increase in [blank]"
            ]
        ]
    }
]

const instructions = [
 {
    "group" : 11,
    "instruction" : "Complete the notes below. <br><br>Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.",
  },
  {"group" : 21,
    "instruction": "Choose the correct option",
  },
  {"group" : 22,
    "instruction": "Label the MAP below. <br><br> Drag the label to its appropriate section."
  },
  {"group" : 31,
    "instruction": "Choose <strong>TWO</strong> letters, <strong>A-E</strong>"
  },
  {"group" : 32,
    "instruction": "What information is given about each of the following festival workshops? <br><br> Choose <strong>SIX</strong> answers. Drag and Drop the correct answer."
  },
  {"group" : 41,
    "instruction": "Complete the notes below. \n Write ONE WORD ONLY for each answer."
  }
]


const answers = {

    1: ["69", "sixty-nine"],
    2: ["stream"],
    3: ["data"],
    4: ["map"],
    5: ["visitors"],
    6: ["sounds"],
    7: ["freedom"],
    8: ["skills"],
    9: ["4.95"],
    10: ["leaders"],
    11: ["2"],
    12: ["1"],
    13: ["2"],
    14: ["3"],
    15: ["1"],
    16: ["g"],
    17: ["c"],
    18: ["b"],
    19: ["d"],
    20: ["a"],
    21: ["2"],
    22: ["4"],
    23: ["1"],
    24: ["5"],
    25: ["retailers should do more to encourage this."],
    26: ["there should be stricter regulations about this."],
    27: ["this already seems to be widespread."],
    28: ["this may have disappointing results."],
    29: ["most people know little about this."],
    30: ["this could be dangerous."],
    31: ["walls"],
    32: ["son"],
    33: ["fuel"],
    34: ["oxygen"],
    35: ["rectangular"],
    36: ["lamps"],
    37: ["family"],
    38: ["winter"],
    39: ["soil"],
    40: ["rain"]
}