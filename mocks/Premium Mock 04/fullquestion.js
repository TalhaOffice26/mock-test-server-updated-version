async function addTestQuestion() {
  const mockNumber = "Premium-UKA-FINAL-4";
  const plan = "Premium";

  // আমি এখান থেকে অবজেক্ট স্ট্রাকচার একদম ক্লিন করে দিয়েছি
  const listening = {
  "questions": [
      {
      "part": 1,
      "group": 11,
      "type": "table-completion",
      "id": [1, 2, 3, 4],
      "table-structure": [3, 3, 3, 3, 3],
      "cells": [
        [
          "<strong>Date</strong>",
          "<strong>Type of event</strong>",
          "<strong>Details</strong>"
        ],
        [
          "17th",
          "a concert",
          "performers from Canada"
        ],
        [
          "18th",
          "a ballet",
          "company called [blank]"
        ],
        [
          "19th–20th (afternoon)",
          "a play",
          "type of play: a comedy called Jemima has had a good [blank]"
        ],
        [
          "20th (evening)",
          "a [blank] show",
          "show is called [blank]"
        ]
      ]
    },
    {
      "part": 1,
      "group": 12,
      "type": "note-completion",
      "heading": "Festival activities",
      "subheadings": [
        "Workshops",
        "Outdoor activities",
        "Further information"
      ],
      "paragraphs": [
        [
          "• Making [blank] food",
          "• (children only) Making [blank]",
          "• (adults only) Making toys from [blank] using various tools"
        ],
        [
          "• Swimming in the [blank]",
          "• Walking in the woods, led by an expert on [blank]"
        ],
        [
          "• See the festival organiser’s [blank] for more information"
        ]
      ],
      "id": [5, 6, 7, 8, 9, 10]
    },
    {
      "part": 2,
      "group": 21,
      "heading": "Theatre trip to Munich",
      "questions": [
        "When the group meet at the airport they will have",
        "The group will be met at Munich Airport by",
        "How much will they pay per night for a double room at the hotel?",
        "What type of restaurant will they go to on Tuesday evening?",
        "Who will they meet on Wednesday afternoon?"
      ],
      "options": [
        ["breakfast", "coffee", "lunch"],
        ["an employee at the National Theatre", "a theatre manager", "a tour operator"],
        ["110 euros", "120 euros", "150 euros"],
        ["an Italian restaurant", "a Lebanese restaurant", "a typical restaurant of the region"],
        ["an actor", "a playwright", "a theatre director"]
      ],
      "id": [11, 12, 13, 14, 15],
      "type": "mcq-updated"
    },
    {
      "part": 2,
  "group": 22,
  "type": "feature-matching",
  "id": [16, 17, 18, 19, 20],
  "options": [
    "The playwright will be present.",
    "The play was written to celebrate an anniversary.",
    "The play will be performed inside a historic building.",
    "The play will be accompanied by live music.",
    "The play will be performed outdoors.",
    "The play will be performed for the first time.",
    "The performance will be attended by officials from the town."
  ],
  "features": [
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Monday"
   ]
    },
    {
      "part": 3,
      "group": 31,
      "type": "mcq-two-choice-updated",
      "id": [
        [21, 22]
      ],
      "questions": [
        ["Which TWO things do the students agree they need to include in their review of Romeo and Juliet?"]
      ],
      "options": [
        [
          "analysis of the text",
          "summary of the plot",
          "description of the theatre",
          "personal reaction",
          "reference to particular scenes"
        ]
      ]
    },
    {
      "part": 3,
  "group": 32,
  "type": "feature-matching",
  "id": [23, 24, 25, 26, 27],
  "options": [
  "They both expected this to be more traditional.",
    "They both thought this was original.",
    "They agree this created the right atmosphere.",
    "They agree this was a major strength.",
    "They were both disappointed by this.",
    "They disagree about why this was an issue.",
    "They disagree about how this could be improved."
  ],
  "features": [
        "the set",
    "the lighting",
    "the costume design",
    "the music",
    "the actors’ delivery"
]
    },
    {
      "part": 3,
      "group": 33,
      "questions": [
        "The students think the story of Romeo and Juliet is still relevant for young people today because",
        "The students found watching Romeo and Juliet in another language",
        "Why do the students think Shakespeare’s plays have such international appeal?"
      ],
      "options": [
        ["it illustrates how easily conflict can start.", "it deals with problems that families experience.", "it teaches them about relationships."],
        ["frustrating.", "demanding.", "moving."],
        ["The stories are exciting.", "There are recognisable characters.", "They can be interpreted in many ways."]
      ],
      "id": [28, 29, 30],
      "type": "mcq-updated"
    },
    {
  "part": 4,
  "group": 41,
  "type": "note-completion",
  "heading": "Episodic memory",
  "subheadings": [
    "Forming episodic memories involves three steps:",
    "Encoding",
    "Consolidation",
    "Retrieval",
    "Episodic memory impairments"
  ],
  "paragraphs": [
    [
      "• the ability to recall details, e.g. the time and 31 [blank] of past events",
      "• different to semantic memory – the ability to remember general information about the [blank], which does not involve recalling [blank] information"
    ],
    [
      "• involves receiving and processing information",
      "• the more [blank] given to an event, the more successfully it can be encoded",
      "• to remember a [blank], it is useful to have a strategy for encoding such information"
    ],
    [
      "• how memories are strengthened and stored",
      "• most effective when memories can be added to a [blank] of related information",
      "• the [blank] of retrieval affects the strength of memories"
    ],
    [
      "• memory retrieval often depends on using a prompt, e.g. the [blank] of an object near to the place where you left your car"
    ],
    [
      "• these affect people with a wide range of medical conditions",
      "• games which stimulate the [blank] have been found to help people with schizophrenia",
      "• children with autism may have difficulty forming episodic memories – possibly because their concept of the [blank] may be absent",
      "• memory training may help autistic children develop social skills"
    ]
  ],
  "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
}
  ],
  "instructions": [
    {
      "group": 11,
      "instruction": "Complete the table below.<br><br>Choose <strong>ONE WORD ONLY</strong> from the passage for each answer."
    },
    {
      "group": 12,
      "instruction": "Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer."
    },
    {
      "group": 21,
      "instruction": "Choose the correct letter, <strong>A, B or C</strong>."
    },
    {
      "group": 22,
      "instruction": "What does the man say about the play on each of the following days? Choose <strong>FIVE</strong> answers from the box and write the correct letter, <strong>A-G</strong>."
    },
    {
      "group": 31,
      "instruction": "Choose <strong>TWO</strong> letters, <strong>A-E</strong>."
    },
    {
      "group": 32,
      "instruction": "Which opinion do the speakers give about each of the following aspects? Choose <strong>FIVE</strong> answers from the box."
    },
    {
      "group": 33,
      "instruction": "Choose the correct letter, <strong>A, B or C</strong>."
    },
    {
      "group": 41,
      "instruction": "Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer."
    }
  ],
  "answers": {
    "1": ["Eustatis"],
    "2": ["review"],
    "3": ["dance"],
    "4": ["Chat"],
    "5": ["healthy"],
    "6": ["posters"],
    "7": ["wood"],
    "8": ["lake"],
    "9": ["insects"],
    "10": ["blog"],
    "11": ["2"],
    "12": ["3"],
    "13": ["1"],
    "14": ["2"],
    "15": ["3"],
    "16": ["The play will be performed for the first time."],
    "17": ["The play was written to celebrate an anniversary."],
    "18": ["The play will be performed outdoors."],
    "19": ["The performance will be attended by officials from the town."],
    "20": ["The play will be performed inside a historic building."],
    "21": ["4"],
    "22": ["5"],
    "23": ["They agree this was a major strength."],
    "24": ["They agree this created the right atmosphere."],
    "25": ["They both expected this to be more traditional."],
    "26": ["They were both disappointed by this."],
    "27": ["They disagree about why this was an issue."],
    "28": ["2"],
    "29": ["3"],
    "30": ["3"],
    "31": ["location"],
    "32": ["world"],
    "33": ["personal"],
    "34": ["attention"],
    "35": ["name"],
    "36": ["network"],
    "37": ["frequency"],
    "38": ["colour", "color"],
    "39": ["brain"],
    "40": ["self"],
    }
};

    //   const reading = {
  //     passages: [
  //       //reading place here
  //       {
  //         part: 1,
  const reading = {
  "passages": [
      {
        "part": 1,
        "title": "Bondi Beach",
        "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        "paragraph-content": [
          ["Bondi Beach, Australia’s most famous beach, is located in the suburb of Bondi, in the Local Government Area of Waverley, seven kilometers from the centre of Sydney. “Bondi” or “Boondi” is an Aboriginal word meaning water breaking over rocks or the sound of breaking waves. The Australian Museum records that Bondi means a place where a flight of nullas took place. There are Aboriginal Rock carving on the northern end of the beach at Ben Buckler and south of Bondi Beach near McKenzies Beach on the coastal walk."], 
          ["The indigenous people of the area at the time of European settlement have generally been welcomed to as the Sydney people or the Eora (Eora means “the people”). One theory describes the Eora as a sub-group of the Darug language group which occupied the Cumberland Plain west to the Blue Mountains. However, another theory suggests that they were a distinct language group of their own. There is no clear evidence for the name or names of the particular band(s) of the Eora that roamed what is now the Waverley area. A number of place names within Waverley, most famously Bondi, have been based on words derived from Aboriginal languages of the Sydney region."], 
          ["From the mid-1800s Bondi Beach was a favourite location for family outings and picnics. The beginnings of the suburb go back to 1809, when the early road builder, William Roberts, received from Governor Bligh a grant of 81 hectares of what is now most of the business and residential area of Bondi Beach. In 1851, Edward Smith Hall and Francis O’Brien purchased 200 acres of the Bondi area that embraced almost the whole frontage of Bondi Beach, and it was named the “The Bondi Estate.” Between 1855 and 1877 O’Brien purchased Hall’s share of the land, renamed the land the “O’Brien Estate,” and made the beach and the surrounding land available to the public as a picnic ground and amusement resort. As the beach became increasingly popular, O’Brien threatened to stop public beach access. However, the Municipal Council believed that the Government needed to intervene to make the beach a public reserve."], 
          ["During the 1900s beach became associated with health, leisure and democracy – a playground everyone could enjoy equally. Bondi Beach was a working-class suburb throughout most of the twentieth century with migrant people from New Zealand comprising the majority of the local population. The first tramway reached the beach in 1884. Following this, tram became the first public transportation in Bondi. As an alternative, this action changed the rule that only rich people can enjoy the beach. By the 1930s Bondi was drawing not only local visitors but also people from elsewhere in Australia and overseas. Advertising at the time referred to Bondi Beach as the “Playground of the Pacific”."], 
          ["There is a growing trend that people prefer having to relax near seaside instead of living unhealthily in cities. The increasing popularity of sea bathing during the late 1800s and early 1900s raised concerns about public safety and how to prevent people from drowning. In response, the world’s first formally documented surf lifesaving club, the Bondi Surf Bathers’ Life Saving Club, was formed in 1907. This was powerfully reinforced by the dramatic events of “Black Sunday” at Bondi in 1938. Some 35,000 people were on the beach and a large group of lifesavers were about to start a surf race when three freak waves hit the beach, sweeping hundreds of people out to sea. Lifesavers rescued 300 people. The largest mass rescue in the history of surf bathing, it confirmed the place of the lifesaver in the national imagination."], 
          ["Bondi Beach is the endpoint of the City to Surf Fun Run which is held each year in August. Australian surf carnivals further instilled this image. A Royal Surf Carnival was held at Bondi Beach for Queen Elizabeth II during her first visited in Australia in 1954. Since 1867, there have been over fifty visits by a member of the British Royal Family to Australia. In addition to many activities, the Bondi Beach Markets is open every Sunday. Many wealthy people spend Christmas Day at the beach. However, the shortage of houses occurs when lots of people crushed to the seaside. Manly is the seashore town which solved this problem. However, people still choose Bondi as the satisfied destination rather than Manly."], 
          ["Bondi Beach has a commercial area along Campbell Parade and adjacent side streets, featuring many popular cafes, restaurants, and hotels, with views of the contemporary beach. It is depicted as wholly modern and European. In the last decade, Bondi Beaches’ unique position has seen a dramatic rise in svelte houses and apartments to take advantage of the views and scent of the sea. The valley running down to the beach is the famous world over for its view of distinctive red-tiled roofs. Those architectures are deeply influenced by British coastal town."], 
          ["Bondi Beach hosted the beach volleyball competition at the 2000 Summer Olympics. A temporary 10,000-seat stadium, a much smaller stadium, 2 warm-up courts, and 3 training courts were set up to host the tournament. The Bondi Beach Volleyball Stadium was constructed for it and stood for just six weeks. Campaigners oppose both the social and environmental consequences of the development. The stadium will divide the beach in two and seriously restrict public access for swimming, walking, and other forms of outdoor recreation. People protest for their human rights of having a pure seaside and argue for health life in Bondi."], 
          ["“They’re prepared to risk lives and risk the Bondi beach environment for the sake of eight days of volleyball”, said Stephen Uniacke, a construction lawyer involved in the campaign. Other environmental concerns include the possibility that soil dredged up from below the sand will acidify when brought to the surface."]
        ]
      },
      {
        "part": 2,
        "title": "Antarctica – in from the cold?",
        "paragraphs": ["A", "B", "C", "D", "E", "F"],
        "paragraph-content": [
          ["A little over a century ago, men of the ilk of Scott, Shackleton and Mawson battled against Antarctica’s blizzards, cold and deprivation. In the name of Empire and in an age of heroic deeds they created an image of Antarctica that was to last well into the 20th century – an image of remoteness, hardship, bleakness and isolation that was the province of only the most courageous of men. The image was one of a place removed from everyday reality, of a place with no apparent value to anyone."], 
          ["As we enter the 21st century, our perception of Antarctica has changed. Although physically Antarctica is no closer and probably no warmer, and to spend time there still demands a dedication not seen in ordinary life, the continent and its surrounding ocean are increasingly seen to an integral part of Planet Earth, and a key component in the Earth System. Is this because the world seems a little smaller these days, shrunk by TV and tourism, or is it because Antarctica really does occupy a central spot on Earth’s mantle? Scientific research during the past half-century has revealed – and continues to reveal – that Antarctica’s great mass and low temperature exert a major influence on climate and ocean circulation, factors which influence the lives of millions of people all over the globe."],
          ["Antarctica was not always cold. The slow break-up of the super-continent Gondwana with the northward movements of Africa, South America, India and Australia eventually created enough space around Antarctica for the development of an Antarctic Circumpolar Current (ACC), that flowed from west to east under the influence of the prevailing westerly winds. Antarctica cooled, its vegetation perished, glaciation began and the continent took on its present-day appearance. Today the ice that overlies the bedrock is up to 4km thick, and surface temperatures as low as – 89.2deg C have been recorded. The icy blast that howls over the ice cap and out to sea – the so-called katabatic wind – can reach 300 km/hr, creating fearsome wind-chill effects."], 
          ["Out of this extreme environment come some powerful forces that reverberate around the world. The Earth’s rotation, coupled to the generation of cells of low pressure off the Antarctic coast, would allow Astronauts a view of Antarctica that is as beautiful as it is awesome. Spinning away to the northeast, the cells grow and deepen, whipping up the Southern Ocean into the mountainous seas so respected by mariners. Recent work is showing that the temperature of the ocean may be a better predictor of rainfall in Australia than is the pressure difference between Darwin and Tahiti – the Southern Oscillation Index. By receiving more accurate predictions, graziers in northern Queensland are able to avoid overstocking in years when rainfall will be poor. Not only does this limit their losses but it prevents serious pasture degradation that may take decades to repair. CSIRO is developing this as a prototype forecasting system, but we can confidently predict that as we know more about the Antarctic and the Southern Ocean we will be able to enhance and extend our predictive ability"], 
          ["The ocean’s surface temperature results from the interplay between deep-water temperature, air temperature and ice. Each winter between 4 and 19 million square km of sea ice form, locking up huge quantities of heat close to the continent. Only now can we start to unravel the influence of sea ice on the weather that is experienced in southern Australia. But in another way, the extent of sea ice extends its influence far beyond Antarctica. Antarctic krill – the small shrimp-like crustaceans that are the staple diet for baleen whales, penguins, some seals, flighted sea birds and many fish – breed well in years when sea ice is extensive and poorly when it is not. Many species of baleen whales and flighted sea birds migrate between the hemispheres and when the krill are less abundant they do not thrive."], 
          ["The circulatory system of the world’s oceans is like a huge conveyor belt, moving water and dissolved minerals and nutrients from one hemisphere to the other, and from the ocean’s abyssal depths to the surface. The ACC is the longest current in the world and has the largest flow. Through it, the deep flows of the Atlantic, Indian and Pacific Oceans are joined to form part of single global thermohaline circulation. During winter, the howling katabatics sometimes scour the ice off patches of the sea’s surface leaving large ice-locked lagoons, or ‘polynyas’. Recent research has shown that as fresh sea ice forms, it is continuously stripped away by the wind and maybe blown up to 90km in a single day. Since only freshwater freezes into ice, the water that remains becomes increasingly salty and dense, sinking until it spills over the continental shelf. Coldwater carries more oxygen than warm water, so when it rises, well into the northern hemisphere, it reoxygenates and revitalises the ocean. The state of the northern oceans and their biological productivity owe much to what happens in the Antarctic."],
        ]
      },
      {
        "part": 3,
        "title": "Talc Powder",
        "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H"],
        "paragraph-content": [
          ["Peter Brigg discovers how talc from Luzenac’s Trimouns in France finds its way into food and agricultural products – from chewing gum to olive oil. High in the French Pyrenees, some 1,700m above sea level, lies Trimouns, a huge deposit of hydrated magnesium silicate – talc to you and me. Talc from Trimouns, and from ten other Luzenac mines across the globe, is used in the manufacture of a vast array of everyday products extending from paper, paint and plaster to cosmetics, plastics and car tyres. And of course, there is always talc’s best-known end use: talcum powder for babies’ bottoms. But the true versatility of this remarkable mineral is nowhere better displayed than in its sometimes surprising use in certain niche markets in the food and agriculture industries."],
          ["Take, for example, the chewing gum business. Every year, Talc de Luzenac France – which owns and operates the Trimouns mine and is a member of international Luzenac Group (the art of Rio Tinto minerals) – supplies about 6,000 tones of talc to chewing gum manufacturers in Europe. “We’ve been selling to this sector of the market since the 1960s,” says Laurent Fournier, a sales manager in Luzenac’s Specialties business unit in Toulouse. “Admittedly, in terms of our total annual sales of talc, the amount we supply to chewing gum manufacturers is relatively small, but we see is as a valuable niche market: one where customers place a premium on securing suppliers from a reliable, high-quality source. Because of this, long term allegiance to a proven supplier is very much a feature of this sector of the talc market.” Switching sources – in the way that you might choose to buy, say, paperclips from Supplier A rather than from Supplier B – is not an easy option for chewing gum manufacturers,” Fournier says. “The cost of reformulating is high, so when customers are using a talc grade that works, even if it’s expensive, they are understandably reluctant to switch.”"],
                ["But how is talc actually used in the manufacture of chewing gum? Patrick Delord, an engineer with a degree in agronomics, who has been with Luzenac for 22 years and is now senior market development manager, Agriculture and Food, in Europe, explains that chewing gums has four main components. “The most important of them is the gum base,” he says. “It’s the gum base that puts the chew into chewing gum. It binds all the ingredients together, creating a soft, smooth texture. To this the manufacturer the adds sweeteners, softeners and flavourings. Our talc is used as a filler in the gum base. The amount varies between, say, ten and 35 per cent, depending on the type of gum. Fruit flavoured chewing gum, for example, is slightly acidic and would react with the calcium carbonate that the manufacturer might otherwise use as a filler. Talc, on the other hand, makes an ideal filler because it’s non-reactive chemically. In the factory, talc is also used to dust the gum base pellets and to stop the chewing gum sticking during the lamination and packing process,” Delord adds."],
                ["The chewing gum business is, however, just one example of talc’s use in the food sector. For the past 20 years or so, olive oil processors in Spain have been taking advantage of talc’s unique characteristics to help them boost the amount of oil they extract from crushed olives. According to Patrick Delord, talc is especially useful for treating what he calls “difficult” olives. After the olives are harvested – preferably early in the morning because their taste is better if they are gathered in the cool of the day – they are taken to the processing plant. There they are crushed and then stirred for 30-45 minutes. In the old days, the resulting paste was passed through an olive press but nowadays it’s more common to add water and centrifuge the mixture to separate the water and oil from the solid matter. The oil and water are then allowed to settle so that the olive oil layer can be decanted off and bottle. “Difficult” olives are those that are more reluctant than the norm to yield up their full oil content. This may be attributable to the particular species of olive, or to its water content and the time of year the olives are collected – at the beginning and the end of the season their water content is often either too high or too low. These olives are easy to recognize because they produce a lot of extra foam during the stirring process, a consequence of an excess of a fine sold that acts as a natural emulsifier. The oil in this emulsion is lost when the water is disposed of. Not only that, if the wastewater is disposed of directly into local fields – often the case in many smaller processing operations – the emulsified oil may take some time to biodegrade and so be harmful to the environment."],
                ["“If you add between a half and two per cent of talc by weight during the stirring process, it absorbs the natural emulsifier in the olives and so boosts the amount of oil you can extract,” says Delord. “In addition, talc’s flat, ‘platey’ structure helps increase the size of the oil droplets liberated during stirring, which again improves the yield. However, because talc is chemically inert, it doesn’t affect the colour, taste, appearance or composition of the resulting olive oil.”"],
                ["If the use of talc in olive oil processing and in chewing gum is long-established, new applications in the food and agriculture industries are also constantly being sought by Luzenac. One such promising new market is fruit crop protection, being pioneered in the US. Just like people, fruit can get sunburned. In fact, in very sunny regions up to 45 per cent of a typical crop can be affected by heat stress and sunburn. However, in the case of fruit, it’s not so much the ultraviolet rays which harm the crop as the high surface temperature that the sun’s rays create."],
                ["To combat this, farmers normally use either chemicals or spray a continuous fine canopy of mist above the fruit trees or bushes. The trouble is, this uses a lot of water – normally a precious commodity in hot, sunny areas – and it is therefore expensive. What’s more, the ground can quickly become waterlogged. “So our idea was to coat the fruit with talc to protect it from the sun,” says Greg Hunter, a marketing specialist who has been with Luzenac for ten years. “But to do this, several technical challenges had first to be overcome. Talc is very hydrophobic: it doesn’t like water. So in order to have a viable product we needed a wettable powder – something that would go readily into suspension so that is could be sprayed onto the fruit. It also had to break the surface tension of the cutin (the natural waxy, waterproof layer on the fruit) and of course, it had to wash off easily when the fruit was harvested. No-one’s going to want an apple that’s covered in talc.”"],
                ["Initial trials in the state of Washington in 2003 showed that when the product was sprayed onto Granny Smith apples, it reduced their surface temperature and lowered the incidence of sunburn by up to 60 per cent. Today the new product, known as Envelop Maximum SPF, is in its second commercial year on the US market. Apple growers are the primary target although Hunter believes grape growers represent another sector with long term potential. He is also hopeful of extending sales to overseas markets such as Australia, South America and southern Europe."]
                    ]
      }
    ],
    "questions": [
      {
        "part": 1,
      "group": 11,
      "type": "T/F/NG",
      "id": [1, 2, 3, 4, 5],
      "questions": [
        "The name of the Bondi beach is first called by the British settlers.",
        "The aboriginal culture in Australia is different when compared with European culture.",
        "Bondi beach area holds many contemporary hotels",
        "The seaside town in Bondi is affected by British culture for its characteristic red color",
        "Living near Bondi seashore is not beneficial for health."
      ]
    },
    {
      "part": 1,
      "group": 12,
      "type": "note-completion",
      "id": [6, 7, 8, 9],
      "heading": "Bondi Beach: History and Development",
      "subheadings": [
        "Origins and Meaning",
        "Ownership and Early Use",
        "Social Impact"
      ],
      "paragraphs": [
        [
          "According to Aboriginal language, Bondi refers to the sound of breaking waves or water hitting [blank]",
          "Evidence of early inhabitants is visible through [blank] found on the beach's north and south ends."
        ],
        [
          "Francis O’Brien allowed the public to use his land as a [blank] and amusement resort."
        ],
        [
          "Access for the working class was significantly improved by the arrival of the [blank] in 1884."
        ]
      ]
    },
    {
      "part": 1,
      "group": 13,
      "type": "summary-completion",
      "id": [10, 11, 12, 13],
      "title": "Bondi Beach Activities",
      "summary": [
        "Bondi beach holds the feature sports activities every year, which attracts lo of [blank]. Choosing to live at this place during the holidays. But local accommodation cannot meet with the expanding population, a nearby town of [blank] is the first suburb site to support the solution, yet people prefer [blank] as their best choice. Its seaside buildings are well-known in the world for the special scenic colored [blank] on buildings and the joyful smell from the sea."
      ]
    },
    {
      "part": 2,
  "group": 21,
  "type": "matching-table-container",
  "id": [14, 15, 16, 17, 18],
  "paragraphs": ["A", "B", "C", "D", "E", "F"],
  "information": [
    "The example of research on weather prediction on agriculture",
    "Antarctic sea ice brings life back to the world oceans’ vitality.",
    "A food chain that influences the animals living pattern based on Antarctic fresh sea ice",
    "The explanation of how atmosphere pressure above Antarctica can impose an effect on global climate change",
    "Antarctica was once thought to be a forgotten and insignificant continent"
      ]
    },
    {
      "part": 2,
      "group": 22,
      "type": "summary-with-list-of-words",
      "id": [19, 20, 21],
      "word-list": [
        "Antarctic Circumpolar Current (ACC)",
        "katabatic winds",
        "rainfall",
        "temperature",
        "glaciers",
        "pressure"
      ],
      "title": "Antarctica's Impact on Global Climate",
      "summary": [
        "Globally, mass Antarctica’s size and [blank] influence climate change. Furthermore, [blank] are contributory to western wind. Finally, the Southern Oscillation Index based on air pressure can predict [blank] in Australia."
      ]
    },
    {
      "part": 2,
      "group": 23,
      "type": "mcq-one-choice",
      "id": [22, 23, 24, 25, 26],
      "questions": [
        "In paragraph B, the author wants to tell which of the following truth about the Antarctic?",
        "Why do Australian farmers keep an eye on the Antarctic ocean temperature?",
        "What is the final effect of katabatic winds?",
        "The break of the continental shelf is due to the",
        "The decrease in the number of Whales and seabirds is due to"
      ],
      "options": [
        ["To show Antarctica has been a central topic of global warming in Mass media", "To illustrate its huge sea ice brings food to million lives to places in the world", "To show it is the heart and its significance to the global climate and current", "To illustrate it locates in the central spot on Earth geographically"],
        ["Help farmers reduce their economic or ecological losses", "Retrieve grassland decreased in the overgrazing process", "Prevent animal from dying", "A cell provides fertilizer for the grassland"],
        ["Increase the moving speed of ocean current", "Increase salt level near the ocean surface", "Bring fresh ice into southern oceans", "Pile up the mountainous ice cap respected by mariners"],
        ["Salt and density increase", "Salt and density decrease", "global warming resulting in a rising temperature", "fresh ice melting into ocean water"],
        ["killers whales are more active around", "Sea birds are affected by high sea level salty", "less sea ice reduces the productivity of food source", "seals fail to reproduce babies"]
      ]
    },
    {
      "part": 3,
  "group": 31,
  "type": "T/F/NG",
  "id": [27, 28, 29, 30, 31, 32],
  "questions": [
    "Talc is the primary component used to give chewing gum its texture and binding quality.",
    "Chewing gum manufacturers find it difficult to switch their talc suppliers due to the high costs involved.",
    "All olive oil processors in Spain have officially adopted talc as part of their extraction process.",
    "Adding talc to the olive stirring process changes the natural flavor of the final oil product.",
    "The main cause of sunburn in fruit is the high surface temperature rather than ultraviolet rays.",
    "Apple growers in Australia have already started using the 'Envelop Maximum SPF' product commercially."
  ],
    },
    {
      "part": 3,
      "group": 32,
      "type": "summary-completion",
      "id": [33, 34, 35, 36, 37, 38],
      "title": "Spanish Olive Oil Industry",
      "summary": [
        "Spanish olive oil industry has been using talc in the oil extraction process for about [blank] years. It is useful in dealing with difficult olives which often produce a high amount of [blank] because of the high content of solid materials. When smaller factories release [blank], it could be [blank] to the environment because it is hard to [blank] and usually takes time as it contains emulsified. However, talc power added in the process is able to absorb the emulsifier oil. It improves the oil extraction production because with the aid of talc powder, size of oil [blank] increased."
      ]
    },
    {
      "part": 3,
      "group": 33,
      "type": "summary-completion",
      "id": [39, 40],
      "title": "Talc in Fruit Crop Protection",
      "summary": [
        "In sunny regions, fruit crops often suffer from heat stress and sunburn. To solve this, Luzenac developed a talc-based spray called Envelop Maximum SPF. One major challenge was that talc is naturally [blank], making it difficult to mix with water. However, trials on Granny Smith apples proved successful, showing a [blank] reduction in the incidence of sunburn."
      ]
    }
  ],
  "instructions": [
    {
      "group": 11,
      "instruction": "Do the following statements agree with the information given in Reading Passage 1?<br><br><strong>TRUE</strong> if the statement agrees with the information<br><strong>FALSE</strong> if the statement contradicts the information<br><strong>NOT GIVEN</strong> if there is no information on this"
    },
    {
      "group": 12,
      "instruction": "Complete the notes below. Choose <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> from the passage for each answer."
    },
    {
      "group": 13,
      "instruction": "Complete the following summary of the paragraphs of Reading Passage, using <strong>NO MORE THAN TWO WORDS</strong> from the Reading Passage for each answer."
    },
    {
      "group": 21,
      "instruction": "Which paragraph contains the following information?<br><br>Write the correct letter <strong>A-F</strong> in boxes on your answer sheet."
    },
    {
      "group": 22,
      "instruction": "Complete the summary using the list of phrases, below."
    },
    {
      "group": 23,
      "instruction": "Choose the correct letter <strong>A, B, C or D</strong>."
    },
    {
      "group": 11,
      "instruction": "Do the following statements agree with the information given in Reading Passage 1?<br><br><strong>TRUE</strong> if the statement agrees with the information<br><strong>FALSE</strong> if the statement contradicts the information<br><strong>NOT GIVEN</strong> if there is no information on this"
    },
    {
      "group": 32,
      "instruction": "Complete the following summary of the paragraphs of Reading Passage, using <strong>NO MORE THAN TWO WORDS</strong> from the Reading Passage for each answer."
    },
    {
      "group": 33,
      "instruction": "Complete the summary below. Choose <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> from the passage for each answer."
    }
  ],
  "answers": {
    "1": ["false"],
    "2": ["not given"],
    "3": ["not given"],
    "4": ["true"],
    "5": ["false"],
    "6": ["rocks"],
    "7": ["Rock carving"],
    "8": ["picnic ground"],
    "9": ["tramway"],
    "10": ["wealthy people"],
    "11": ["manly"],
    "12": ["bondi"],
    "13": ["tiled roofs"],
    "14": ["d"],
    "15": ["f"],
    "16": ["e"],
    "17": ["c"],
    "18": ["a"],
    "19": ["temperature"],
    "20": ["antarctic circumpolar current (acc)"],
    "21": ["rainfall"],
    "22": ["3"],
    "23": ["1"],
    "24": ["3"],
    "25": ["3"],
    "26": ["3"],
    "27": ["false"],
    "28": ["ture"],
    "29": ["not given"],
    "30": ["false"],
    "31": ["true"],
    "32": ["not given"],
    "33": ["20"],
    "34": ["foam"],
    "35": ["waste water"],
    "36": ["harmful"],
    "37": ["biodegrade"],
    "38": ["droplets"],
    "39": ["hydrophobic"],
    "40": ["60 per cent"]
  }
};

 const writing = {
      questions: [
    {
        "part": 1,
        "question": "The table below shows expenditures of four car companies on advertising in the UK in 2002. <br><br> Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "image": ["/Image/premium-writing-4.png"]
    },
    {
        "part": 2,
        "question": "The best way to ensure the growth of children is to make parents take parenting courses. <br><br> Do you agree or disagree? <br><br> Give reasons for your answer and include any relevant examples from your own knowledge or experience."
    }
]
      
    };}