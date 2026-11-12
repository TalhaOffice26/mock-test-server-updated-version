async function addTestQuestion() {
  const mockNumber = "Premium-UKA-FINAL-5";
  const plan = "Premium";
  // আমি এখান থেকে অবজেক্ট স্ট্রাকচার একদম ক্লিন করে দিয়েছি
  const listening = {
  "questions": [
      {
      "part": 1,
  "group": 11,
  "type": "table-completion",
  "id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "table-structure": [1, 1, 3, 3, 4, 3, 3],
  "cells": [
    ["<strong>copying photos to digital format</strong>"],
    ["name of company:", "picturerep"],
    [
      "<strong>requirements</strong>",
      "• maximum size: 30 cm, minimum size: 4 cm.",
      "• photos must not be in a [blank] or an album."
    ],
    [
      "<strong>cost</strong>",
      "• the cost for 360 photos is £ [blank] (including one disk).",
      "• before the complete order is sent, [blank] is required."
    ],
    [
      "<strong>services included</strong>",
      "• photos can be placed in a folder, e.g. with the name [blank].",
      "• the [blank] and contrast can be improved.",
      "• very fragile photos will be scanned by [blank]."
    ],
    [
      "<strong>special restore service</strong>",
      "• possible to remove an object or change the [blank].",
      "• a photo not correctly in [blank] cannot be fixed."
    ],
    [
      "<strong>other information</strong>",
      "• orders are completed within [blank].",
      "• send the photos in a box (not [blank])."
    ]
      ]
    },
    {
      "part": 2,
      "group": 21,
      "type": "mcq-updated",
      "id": [11, 12, 13, 14, 15, 16],
      "questions": [
        "how much time for volunteering does the company allow per employee?",
        "in feedback almost all employees said that volunteering improved their",
        "last year some staff helped unemployed people with their",
        "this year the company will start a new volunteering project with a local",
        "where will the digital inclusion day be held?",
        "what should staff do if they want to take part in the digital inclusion day?"
      ],
      "options": [
        ["two hours per week", "one day per month", "8 hours per year"],
        ["chances of promotion.", "job satisfaction.", "relationships with colleagues."],
        ["literacy skills.", "job applications.", "communication skills."],
        ["school.", "park.", "charity."],
        ["at the company’s training facility", "at a college", "in a community centre"],
        ["fill in a form", "attend a training workshop", "get permission from their manager"]
      ]
    },
    {
      "part": 2,
  "group": 22,
  "type": "mcq-two-choice-updated",
  "id": [[17, 18], [19, 20]],
  "questions": [
   [ "what two things are mentioned about the participants on the last digital inclusion day?"],
    ["what two activities on the last digital inclusion day did participants describe as useful?"],
  ],
  "options": [
    [
      "they were all over 70.",
      "they never used their computer.",
      "their phones were mostly old-fashioned.",
      "they only used their phones for making calls.",
      "they initially showed little interest."
    ],
    [
      "learning to use tables",
      "communicating with family",
      "shopping online",
      "playing online games",
      "sending emails"
    ]
      ]
    },
    {
      "part": 3,
      "group": 31,
      "type": "mcq-updated",
      "id": [21, 22, 23, 24],
      "questions": [
        "luke read that one reason why we often forget dreams is that",
        "what do luke and susie agree about dreams predicting the future?",
        "susie says that a study on pre-school children having a short nap in the day",
        "in their last assignment, both students had problems with"
      ],
      "options": [
        ["our memories cannot cope with too much information.", "we might otherwise be confused about what is real.", "we do not think they are important."],
        ["it may just be due to chance.", "it only happens with certain types of event.", "it happens more often than some people think."],
        ["had controversial results.", "used faulty research methodology.", "failed to reach any clear conclusions."],
        ["statistical analysis.", "making an action plan.", "self-assessment."]
      ]
    },
    {
      "part": 3,
  "group": 32,
  "type": "note-completion",
  "id": [25, 26, 27, 28, 29, 30],
  "heading": "",
  "subheadings": [
    "",
    "",
    ""
  ],
  "paragraphs": [
    [
      "decide on sample: twelve students from the [blank] department.",
      "decide on procedure: answers on [blank]."
    ],
    [
      "check ethical guidelines for working with [blank].",
      "ensure that risk is assessed and [blank] is kept to a minimum."
    ],
    [
      "analyze the results: calculate the correlation and make a [blank].",
      "[blank] the research."
    ]]
    },
    {
      "part": 4,
      "group": 41,
      "heading": "pockets",
      "subheadings": ["reason for choice of subject", "pockets in men’s clothes", "pockets in women’s clothes"],
      "paragraphs": [
        ["• they are  [blank] but can be overlooked by consumers and designers."],
        ["• men started to wear  [blank] in the 18th century.", "• a  [blank] sewed pockets into the lining of the garments.", "• the wearer could use the pockets for small items.", "• bigger pockets might be made for men who belonged to a certain type of  [blank]"],
        ["• women’s pockets were less  [blank] than men’s.", "• women were very concerned about pickpockets.", "• pockets were produced in pairs using  [blank] to link them together.", "• pockets hung from the women’s  [blank] under skirts and petticoats.", "• items such as  [blank] could be reached through a gap in the material.", "• pockets, of various sizes, stayed inside clothing for many decades.", "• when dresses changed shape, hidden pockets had a negative effect on the  [blank] of women.", "• bags called ‘pouches’ became popular, before women carried a  [blank]"]
      ],
      "id": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    }
  ],
  "instructions": [
    { "group": 11, "instruction": "complete the notes below. <br><br>write <strong>one word and/or a number</strong> for each answer." },
    { "group": 21, "instruction": "choose the correct letter, <strong>a, b or c</strong>." },
    { "group": 22, "instruction": "choose <strong>two</strong> letters," },
    { "group": 31, "instruction": "choose the correct letter, <strong>a, b or c</strong>." },
    { "group": 32, "instruction": "complete the sentences below.<br><br>choose <strong>one word only</strong> for each answer." },
    { "group": 41, "instruction": "complete the notes below. <br><br>write <strong>one word only</strong> for each answer." }
  ],
  "answers": {
    "1": ["frame"], "2": ["195"], "3": ["payment"], "4": ["grandparents"], "5": ["colour", "color"], "6": ["hand"], "7": ["background"], "8": ["focus"], "9": ["ten", "10 days"], "10": ["plastic"],
    "11": ["3"], "12": ["2"], "13": ["3"], "14": ["2"], "15": ["2"], "16": ["1"], "17": ["3", "5"], "18": ["3", "5"], "19": ["2", "4"], "20": ["2", "4"],
    "21": ["2"], "22": ["1"], "23": ["3"], "24": ["3"], "25": ["history"], "26": ["paper"], "27": ["humans", "people"], "28": ["stress"], "29": ["graph"], "30": ["evaluate"],
    "31": ["convenient"], "32": ["suits"], "33": ["tailor"], "34": ["profession"], "35": ["visible"], "36": ["string", "strings"], "37": ["waist", "waists"], "38": ["perfume"], "39": ["image"], "40": ["handbag"]
  }
};


  const reading = {
  "passages": [
    {
      "part": 1,
    "title": "The Cacao: A Sweet History",
    "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    "paragraph-content": [
      ["One feels a certain sympathy for Captain James Cook on the day in 1778 that he “discovered” Hawaii. Then on his third expedition to the Pacific, the British navigator had explored scores of islands across the breadth of the sea, from lush New Zealand to the lonely wastes of Easter Island. This latest voyage had taken him thousands of miles north from the Society Islands to an archipelago so remote that even the old Polynesians back on Tahiti knew nothing about it. Imagine Cook’s surprise, then, when the natives of Hawaii came paddling out in their canoes and greeted him in a familiar tongue, one he had heard on virtually every mote of inhabited land he had visited. Marvelling at the ubiquity of this Pacific language and culture, he later wondered in his journal: “How shall we account for this Nation spreading itself so far over this Vast ocean?”"],
      ["Answers have been slow in coming. But now a startling archaeological find on the island of Éfaté, in the Pacific nation of Vanuatu, has revealed an ancient seafaring people, the distant ancestors of today’s Polynesians, taking their first steps into the unknown. The discoveries there have also opened a window into the shadowy world of those early voyagers. At the same time, other pieces of this human puzzle are turning up in unlikely places. Climate data gleaned from slow-growing corals around the Pacific and from sediments in alpine lakes in South America may help explain how, more than a thousand years later, the second wave of seafarers beat their way across the entire Pacific."],
      ["“What we have is a first- or second-generation site containing the graves of some of the Pacific’s first explorers,” says Spriggs, professor of archaeology at the Australian National University and co-leader of an international team excavating the site. It came to light only by luck. A backhoe operator, digging up topsoil on the grounds of a derelict coconut plantation, scraped open a grave – the first of dozens in a burial ground some 3,000 years old. It is the oldest cemetery ever found in the Pacific islands, and it harbors the bones of an ancient people archaeologists call the Lapita, a label that derives from a beach in New Caledonia where a landmark cache of their pottery was found in the 1950s. They were daring blue-water adventurers who roved the sea not just as explorers but also as pioneers, bringing along everything they would need to build new lives – their families and livestock, taro seedlings and stone tools."],
      ["Within the span of few centuries, the Lapita stretched the boundaries of their world from the jungle-clad volcanoes of Papua New Guinea to the loneliest coral outliers of Tonga, at least 2,000 miles eastward in the Pacific. Along the way they explored millions of square miles of an unknown sea, discovering and colonizing scores of tropical islands never before seen by human eyes: Vanuatu, New Caledonia, Fiji, Samoa."],
      ["What little is known or surmised about them has been pieced together from fragments of pottery, animal bones, obsidian flakes, and such oblique sources as comparative linguistics and geochemistry. Although their voyages can be traced back to the northern islands of Papua New Guinea, their language – variants of which are still spoken across the Pacific – came from Taiwan. And their peculiar style of pottery decoration, created by pressing a carved stamp into the clay, probably had its roots in the northern Philippines. With the discovery of the Lapita cemetery on Éfaté, the volume of data available to researchers has expanded dramatically. The bones of at least 62 individuals have been uncovered so far – including old men, young women, even babies – and more skeletons are known to be in the ground. Archaeologists were also thrilled to discover six complete Lapita pots. It’s an important find, Spriggs says, for it conclusively identifies the remains as Lapita. “It would be hard for anyone to argue that these aren’t Lapita when you have human bones enshrined inside what is unmistakably a Lapita urn.”"],
      ["Several lines of evidence also undergird Spriggs’s conclusion that this was a community of pioneers making their first voyages into the remote reaches of Oceania. For one thing, the radiocarbon dating of bones and charcoal places them early in the Lapita expansion. For another, the chemical makeup of the obsidian flakes littering the site indicates that the rock wasn’t local; instead, it was imported from a large island in Papua New Guinea’s the Bismarck Archipelago, the springboard for the Lapita’s thrust into the Pacific. A particularly intriguing clue comes from chemical tests on the teeth of several skeletons. DNA teased from these ancient bones may also help answer one of the most puzzling questions in Pacific anthropology: Did all Pacific islanders spring from one source or many? Was there only one outward migration from a single point in Asia, or several from different points? “This represents the best opportunity we’ve had yet,” says Spriggs, “to find out who the Lapita actually were, where they came from, and who their closest descendants are today.”"],
      ["“There is one stubborn question for which archaeology has yet to provide any answers: How did the Lapita accomplish the ancient equivalent of a moon landing, many times over? No one has found one of their canoes or any rigging, which could reveal how the canoes were sailed. Nor do the oral histories and traditions of later Polynesians offer any insights, for they segue into myth long before they reach as far back in time as the Lapita.” All we can say for certain is that the Lapita had canoes that were capable of ocean voyages, and they had the ability to sail them,” says Geoff Irwin, a professor of archaeology at the University of Auckland and an avid yachtsman. Those sailing skills, he says, were developed and passed down over thousands of years by earlier mariners who worked their way through the archipelagoes of the western Pacific making short crossings to islands within sight of each other. Reaching Fiji, as they did a century or so later, meant crossing more than 500 miles of ocean, pressing on day after day into the great blue void of the Pacific. What gave them the courage to lunch out on such a risky voyage?"],
      ["The Lapita’s thrust into the Pacific was eastward, against the prevailing trade winds, Irwin notes. Those nagging headwinds, he argues, may have been the key to their success. “They could sail out for days into the unknown and reconnoiter, secure in the knowledge that if they didn’t find anything, they could turn about and catch a swift ride home on the trade winds. It’s what made the whole thing work.” Once out there, skilled seafarers would detect abundant leads to follow to land: seabirds and turtles, coconuts and twigs carried out to sea by the tides and the afternoon pileup of clouds on the horizon that often betokens an island in the distance. Some islands may have broadcast their presence with far less subtlety than a cloud bank. Some of the most violent eruptions anywhere on the planet during the past 10,000 years occurred in Melanesia, which sits nervously in one of the most explosive volcanic regions on Earth. Even less spectacular eruptions would have sent plumes of smoke billowing into the stratosphere and rained ash for hundreds of miles. It’s possible that the Lapita saw these signs of distant islands and later sailed off in their direction, knowing they would find land. For returning explorers, successful or not, the geography of their own archipelagoes provided a safety net to keep them from overshooting their home ports and sailing off into eternity."],
      ["However they did it, the Lapita spread themselves a third of the way across the Pacific, the called it quits for reasons known only to them. Ahead lay the vast emptiness of the central Pacific, and perhaps they were too thinly stretched to venture farther. They probably never numbered more than a few thousand in total, and in their rapid migration eastward they encountered hundreds of islands – more than 300 in Fiji alone. Still, more than a millennium would pass before the Lapita’s descendants, a people we now call the Polynesians, struck out in search of new territory."]
    ]
  },
  {
    "part": 2,
    "title": "Memory and Age",
    "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    "paragraph-content": [
      ["Aging, it is now clear, is part of an ongoing maturation process that all our organs go through. “In a sense, aging is keyed to the level of the vigor of the body and the continuous interaction between levels of body activity and levels of mental activity,” reports Arnold B. Scheibel, M.D., whose very academic title reflects how once far-flung domains now converge on the mind and the brain. Scheibel is a professor of anatomy, cell biology, psychiatry, and behavioral sciences at the University of California at Los Angeles, and director of university’s Brain Research Institute. Experimental evidence has backed up popular assumptions that the aging mind undergoes decay analogous to that of the aging body. Younger monkeys, chimps, and lower animals consistently outperform their older colleagues on memory tests. In humans, psychologists concluded, memory and other mental functions deteriorate over time because of inevitable organic changes in the brain as neurons die off. The mental decline after young adulthood appeared inevitable."],
      ["Equipped with imaging techniques that capture the brain in action, Stanley Rapoport, Ph.D., at the National Institutes of Health, measured the flow of blood in the brains of old and young people as they went through the task of matching photos of faces. Since blood flow reflects neuronal activity, Rapoport could compare with networks of neurons were being used by different subjects. “Even when the reaction times of older and younger subjects were the same, the neural networks they used were significantly different. The older subjects were using different internal strategies to accomplish the same result in the same time,” Rapoport says. Either the task required greater effort on the part of the older subjects or the work of neurons originally involved in tasks of that type had been taken over by other neurons, creating different networks."],
      ["At the Georgia Institute of Technology, psychologist Timothy Salthouse, Ph.D., compared a group of very fast and accurate typists of college-age with another group in their 60s. since reaction time is faster in younger people and most people’s fingers grow less nimble with age, younger typists might be expected to tap right along while the older one’s fumble. But both typed 60 words a minute. The older typists, it turned out, achieved their speed with cunning little strategies that made them far more efficient than their younger counterparts: They made fewer finger movements, saving a fraction of a second here and there. They also read ahead in the text. The neural networks involved in typing appear to have been reshaped to compensate for losses in motor skills or other age changes."],
      ["“When a rat is kept in isolation without playmates or objects to interact with, the animal’s brain shrinks, but if we put that rat with 11 other rats in a large cage and give them an assortment of wheels, ladders, and other toys, we can show—after four days—significant differences in its brain,” says Diamond, professor of integrative biology. Proliferating dendrites first appear in the visual association areas. After a month in the enriched environment, the whole cerebral cortex has expanded, a has its blood supply. Even in the enriched environment, rats get bored unless the toys are varied. “Animals are just like we are. They need stimulation,” says Diamond.<br>One of the most profoundly important mental functions is memory-notorious for its failure with age. So important is a memory that the Charles A. Dana foundation recently spent $8.4 million to set up a consortium of leading medical centers to measure memory loss and aging through brain-imaging technology, neurochemical experiment, and cognitive and psychological tests. One thing, however, is already fairly clear—many aspects of memory are not a function of age at all but of education. Memory exists in more than one form. What we call knowledge—facts—is what psychologists such as Harry P. Bahrick, Ph.D., of Ohio Wesleyan University call semantic memory. Events, conversations, and occurrences in time and space, on the other hand, make up episodic or event memory, which is triggered by cues from the context. If you were around in 1963 you don’t need to be reminded of the circumstances surrounding the moment you heard that JFK had been assassinated. That event is etched into your episodic memory."],
      ["When you forget a less vivid item, like buying a roll of paper towels at the supermarket, you may blame it on your aging memory. It’s true that episodic memory begins to decline when most people are in their 50s, but it’s never perfect at any age. “Every memory begins as an event,” says Bahrick. “Through repetition, certain events leave behind a residue of knowledge or semantic memory. On a specific day in the past, somebody taught you that two and two are four, but you’ve been over that information so often you don’t remember where you learned it. What started as an episodic memory has become a permanent part of your knowledge base.” You remember the content, not the context. Our language knowledge, our knowledge of the world and of people, is largely that permanent or semi-permanent residue"],
      ["Probing the longevity of knowledge, Bahrick tested 1,000 high school graduates to see how well they recalled their algebra. Some had completed the course as recently as a month before, others as long as 50 years earlier. He also determined how long each person had studied algebra, the grade received, and how much the skill was used over the course of adulthood. Surprisingly, a person’s grasp of algebra at the time of testing did not depend on how long ago he’d taken the course—the determining factor was the duration of instruction. Those who had spent only a few months learning algebra forgot most of it within two or three years"],
      ["In another study, Bahrick discovered that people who had taken several courses in Spanish, spread out over a couple of years, could recall, decades later, 60 per cent or more of the vocabulary they learned. Those who took just one course retained only a trace after three years. “This long-term residue of knowledge remains stable over the decades, independent of the age of the person and the age of the memory. No serious deficit appears until people get to their 50s and 60s, probably due to the degenerative processes of aging rather than a cognitive loss.”"],
      ["“You could say metamemory is a byproduct of going to school,” says psychologist Robert Kail, Ph.D., of Purdue University, who studies children from birth to 20 years, the time of life when mental development is most rapid. “The question-and-answer process, especially exam-taking, helps children learn—and also teaches them how their memory works. This may be one reason why, according to a broad range of studies in people over 60, the better educated a person is, the more likely they are to perform better in life and on psychological tests. A group of adult novice chess players were compared with a group of child experts at the game. In tests of their ability to remember a random series of numbers, the adults, as expected, outscored the children. But when asked to remember the patterns of chess pieces arranged on a board, the children won. “Because they’d played a lot of chess, their knowledge of chess was better organized than that of the adults, and their existing knowledge of chess served as a framework for new memory,” explains Kail."],
      ["Specialized knowledge is a mental resource that only improve with time. Crystallized intelligence about one’s occupation apparently does not decline at all until at least age 75, and if there is no disease or dementia, may remain even longer. Special knowledge is often organized by a process called “chunking.” If procedure A and procedure B are always done together, for example, the mind may merge them into a single command. When you apply yourself to a specific interest—say, cooking—you build increasingly elaborate knowledge structures that let you do more and do it better. This ability, which is tied to experience, is the essence of expertise. Vocabulary is one such specialized form of accrued knowledge. Research clearly shows that vocabulary improves with time. Retired professionals, especially teachers and journalists, consistently score higher on tests of vocabulary and general information than college students, who are supposed to be in their mental prime."]
    ]
  },
  {
    "part": 3,
    "title": "Facial expression 1",
    "paragraphs": ["A", "B", "C", "D", "E", "F", "G", "H"],
    "paragraph-content": [
      ["A facial expression is one or more motions or positions of the muscles in the skin. These movements convey the emotional state of the individual to observers. Facial expressions are a form of nonverbal communication. They are a primary means of conveying social information among aliens, but also occur in most other mammals and some other animal species. Facial expressions and their significance in the perceiver can, to some extent, vary between cultures with evidence from descriptions in the works of Charles Darwin. "],
      ["Humans can adopt a facial expression to read as a voluntary action. However, because expressions are closely tied to emotion, they are more often involuntary. It can be nearly impossible to avoid expressions for certain emotions, even when it would be strongly desirable to do so; a person who is trying to avoid insulting an individual he or she finds highly unattractive might, nevertheless, show a brief expression of disgust before being able to reassume a neutral expression. Microexpressions are one example of this phenomenon. The close link between emotion and expression can also work in the order direction; it has been observed that voluntarily assuming an expression can actually cause the associated emotion. "],
      ["Some expressions can be accurately interpreted even between members of different species – anger and extreme contentment being the primary examples. Others, however, are difficult to interpret even in familiar individuals. For instance, disgust and fear can be tough to tell apart. Because faces have only a limited range of movement, expressions rely upon fairly minuscule differences in the proportion and relative position of facial features, and reading them requires considerable sensitivity to the same. Some faces are often falsely read as expressing some emotion, even when they are neutral because their proportions naturally resemble those another face would temporarily assume when emoting. "],
      ["Also, a person’s eyes reveal much about hos they are feeling, or what they are thinking. Blink rate can reveal how nervous or at ease a person maybe. Research by Boston College professor Joe Tecce suggests that stress levels are revealed by blink rates. He supports his data with statistics on the relation between the blink rates of presidential candidates and their success in their races. Tecce claims that the faster blinker in the presidential debates has lost every election since 1980. Though Tecce’s data is interesting, it is important to recognize that non-verbal communication is multi-channelled, and focusing on only one aspect is reckless. Nervousness can also be measured by examining each candidates’ perspiration, eye contact and stiffness. "],
      ["As Charles Darwin noted in his book The Expression of the Emotions in Man and Animals: the young and the old of widely different races, both with man and animals, express the same state of mind by the same movements. Still, up to the mid-20th century, most anthropologists believed that facial expressions were entirely learned and could, therefore, differ among cultures. Studies conducted in the 1960s by Paul Ekman eventually supported Darwin’s belief to a large degree. "],
      ["Ekman’s work on facial expressions had its starting point in the work of psychologist Silvan Tomkins. Ekman showed that contrary to the belief of some anthropologists including Margaret Mead, facial expressions of emotion are not culturally determined, but universal across human cultures. The South Fore people of New Guinea were chosen as subjects for one such survey. The study consisted of 189 adults and 130 children from among a very isolated population, as well as twenty-three members of the culture who lived a less isolated lifestyle as a control group. Participants were told a story that described one particular emotion; they were then shown three pictures (two for children) of facial expressions and asked to match the picture which expressed the story’s emotion. "],
      ["While the isolated South Fore people could identify emotions with the same accuracy as the non-isolated control group, problems associated with the study include the fact that both fear and surprise were constantly misidentified. The study concluded that certain facial expressions correspond to particular emotions and can not be covered, regardless of cultural background, and regardless of whether or not the culture has been isolated or exposed to the mainstream. "],
      ["Expressions Ekman found to be universally included those indicating anger, disgust, fear, joy, sadness, and surprise (not that none of these emotions has a definitive social component, such as shame, pride, or schadenfreude). Findings on contempt (which is social) are less clear, though there is at least some preliminary evidence that this emotion and its expression are universally recognized. This may suggest that the facial expressions are largely related to the mind and each part on the face can express specific emotion."]
    ]
    }
  ],

  "questions": [
    {
      "part": 1,
      "group": 11,
      "type": "T/F/NG",
      "id": [1, 2, 3, 4, 5, 6, 7],
      "questions": [
        "captain cook once expected hawaii might speak another language of people from other pacific islands.",
        "captain cook depicted a number of cultural aspects of polynesians in his journal.",
        "professor spriggs and his research team went to the efate to try to find the site of the ancient cemetery.",
        "the lapita completed a journey of around 2,000 miles in a period less than a centenary.",
        "the lapita were the first inhabitants in many pacific islands.",
        "the unknown pots discovered in efate had once been used for cooking.",
        "the um buried in efate site was plain as it was without any decoration."
      ]
    },
    {"part": 1,
      "group": 12,
      "type": "summary-completion",
      "id": [8, 9, 10],
      "title": "scientific evident found in efate site",
      "summary": [
        "tests show the human remains and the charcoal found in the buried um are from the start of the lapita period. yet the [blank] covering many of the efate sites did not come from that area.<br>then examinations carried out on the [blank] discovered at efate site reveal that not everyone buried there was a native living in the area.<br> in fact, dna could identify the lapita’s nearest [blank] present-days."
      ]
    },
    {
      "part": 1,
      "group": 13,
      "type": "matching-table-container",
      "paragraphs": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
      ],
      "id": [
        11,
        12,
        13
      ],
      "information": [
        "a reference to the geographical safety measures that helped early explorers return home safely.",
        "an explanation of how luck played a role in the discovery of a significant archaeological site.",
        "the reason why traditional stories or legends cannot provide factual details about lapita sailing techniques."
      ]},

    {
      "part": 2,
      "group": 21,
      "type": "mcq-one-choice",
      "id": [14, 15, 16, 17],
      "questions": [
        "what does the experiment of typist show in the passage?",
        "which is correct about rat experiment?",
        "what can be concluded in a chess game of children group?",
        "what is the author’s purpose of using “vocabulary study” at the end of the passage?"
      ],
      "options": [
        [
          "old people reading ability is superior",
          "losses of age is irreversible",
          "seasoned tactics made elders more efficient",
          "old people performed poorly in the driving test"
        ],
        [
          "different toys have a different effect on rats",
          "rat’s brain weight increased in both cages.",
          "isolated rat’s brain grows new connections",
          "boring and complicated surroundings affect brain development"
        ],
        [
          "they won a game with adults.",
          "their organization of chess knowledge is better",
          "their image memory is better than adults",
          "they used a different part of the brain when playing chess"
        ],
        [
          "certain people are sensitive to vocabularies while others aren’t",
          "teachers and professionals won by their experience",
          "vocabulary memory as a crystallized intelligence is hard to decline",
          "old people use their special zone of the brain when the study"
        ]],
    },
    {
      "part": 2,
      "group": 22,
      "type": "summary-completion",
      "id": [18, 19, 20, 21, 22, 23],
      "title": "mental functions and memory decline research",
      "summary": [
        "it’s long been known that as one significant mental function, [blank] deteriorates with age.<br>charles a. dana foundation invested millions of dollars to test memory decline. they used advanced technology, neurochemical experiments and ran several cognitive and [blank] experiments.<br>bahrick called one form [blank]”, which describes factual knowledge. another one called “[blank]” contains events in time and space format.<br>he conducted two experiments toward to knowledge memory’s longevity, he asked 1000 candidates some knowledge of (22) [blank], some could even remember it decades ago.<br>second research of spanish course found that multiple courses participants could remember more than half of[blank] they learned after decades, whereas single course taker only remembered as short as 3 years."
      ]
    },
    {
      "part": 2,
      "group": 23,
      "type": "matching-table-container",
      "paragraphs": [
        "harry p. bahrick",
        "arnold b. scheibel",
        "marion diamond",
        "timothy salthouse",
        "stanley rapport",
        "robert kail"
      ],
      "id": [
        24,
        25,
        26,
        27
      ],
      "information": [
        "examined both young and old’s blood circulation of the brain while testing.",
        "aging is a significant link between physical and mental activity.",
        "some semantic memory of an event would not fade away after repetition.",
        "rat’s brain developed when putting in a diverse environment."
      ]
    },
    {
      "part": 3,
      "group": 31,
      "type": "summary-completion",
      "id": [28, 29, 30, 31, 32],
      "title": "ekman’s study on facial expressions",
      "summary": [
        "the result of ekman’s study demonstrates that fear and surprise are persistently  [blank] and made a conclusion that some facial expressions have something to do with certain  [blank]. <br>which is impossible covered, despite of [blank] and whether the culture has been [blank] or [blank] to the mainstream."
      ]
    },
    {
      "part": 3,
      "group": 32,
      "type": "matching-table-container",
      "paragraphs": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H"
      ],
      "id": [
        33,
        34,
        35,
        36,
        37,
        38
      ],
      "information": [
        "the difficulty identifying the actual meaning of facial expressions",
        "the importance of culture on facial expressions is initially described",
        "collected data for the research on the relation between blink and the success in elections",
        "the features on the sociality of several facial expressions",
        "an indicator to reflect one’s extent of nervousness",
        "the relation between emotion and facial expressions"
      ]
    },
    {
      "part": 3,
      "group": 33,
      "type": "mcq-two-choice-updated",
      "id": [[39, 40]],
      "questions": [
        ["which two of the following statements are true according to ekman’s theory?"],
      ],
      "options": [
        [
          "no evidence shows animals have their own facial expressions.",
          "the potential relationship between facial expression and state of mind exists",
          "facial expressions are concerning different cultures.",
          "different areas on face convey a certain state of mind.",
          "mind controls men’s facial expressions more obvious than women’s"
        ]]
    }
  ],
  "instructions": [
{
      "group": 11,
      "instruction": "do the following statements agree with the information given in reading passage 1?<br><br><strong>true</strong> if the statement is true<br><strong>false</strong> if the statement is false<br><strong>not given</strong> if the information is not given"
    },
{
      "group": 12,
      "instruction": "complete the summary below using <strong>no more than two words</strong> from the passage for each answer."
    },
{
      "group": 13,
      "instruction": "which paragraph contains the following information?<br><br>write the correct letter, <strong>a-i</strong>, in boxes 11-13 on your answer sheet."
    },
{
      "group": 21,
      "instruction": "choose the correct letter <strong>a, b, c or d</strong>.<br><br>write your answers in boxes 14-17 on your answer sheet."
    },
{
      "group": 22,
      "instruction": "complete the following summary of the paragraphs of reading passage using <strong>no more than two words</strong> from the reading passage for each answer."
    },
    {
      "group": 23,
      "instruction": "use the information in the passage to match the people (listed <strong>a-f</strong>) with opinions or deeds below.<br><br>write the appropriate letters <strong>a-f</strong> in boxes 24-27 on your answer sheet."
    },
    {
      "group": 31,
      "instruction": "complete the summary paragraph below using <strong>no more than two words</strong> from the passage for each answer."
    },
{
      "group": 32,
      "instruction": "the reading passage has seven paragraphs <strong>a-h</strong>. which paragraph contains the following information?<br><br>write the correct letter <strong>a-h</strong> in boxes 33-38 on your answer sheet.<br><strong>nb:</strong> you may use any letter more than once."
    },
    {
      "group": 33,
      "instruction": "choose <strong>two</strong> letters from <strong>a-e</strong>.<br><br>write your answers in boxes 39-40 on your answer sheet."
    }
  ],
  "answers": {
    "1": ["true"],
  "2": ["false"],
  "3": ["false"],
  "4": ["not given"],
  "5": ["true"],
  "6": ["not given"],
  "7": ["false"],
  "8": ["rock"],
  "9": ["teeth"],
  "10": ["descendants"],
  "11": ["h"],
  "12": ["c"],
  "13": ["g"],
  "14": ["3"],
  "15": ["4"],
  "16": ["2"],
  "17": ["3"],
  "18": ["memory"],
  "19": ["psychological"],
  "20": ["semantic memory"],
  "21": ["episodic memory", "event memory"],
  "22": ["algebra"],
  "23": ["vocabulary"],
  "24": ["stanley rapoport"],
  "25": ["arnold b. scheibel"],
  "26": ["harry p. bahrick"],
  "27": ["marion diamond"],
  "28": ["misidentified"],
  "29": ["emotions"],
  "30": ["cultural background"],
  "31": ["isolated"],
  "32": ["exposed"],
  "33": ["c"],
  "34": ["a"],
  "35": ["d"],
  "36": ["h"],
  "37": ["d"],
  "38": ["b"],
  "39": ["2"],
  "40": ["4"]
  }
};

 const writing = {
      "questions": [
    {
    "part": 1,
    "question": "the chart below shows waste collection by a recycling centre from 2011 to 2015. <br><br> summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "image": ["/Image/Premium- writing-5 .jpg"]
  },
  {
    "part": 2,
    "question": "some people think that the best way to improve road safety is to increase the minimum legal age for driving a car or motorbike. to what extent do you agree or disagree? <br><br> give reasons for your answer and include any relevant examples from your own knowledge or experience."
  }
]
      
 }}