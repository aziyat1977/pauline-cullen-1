import { SlideContent, QuizQuestion, VocabItem } from './types';

export const SLIDES: SlideContent[] = [
  // --- PAGE 1: LESSON OVERVIEW ---
  {
    id: 1,
    lines: ["LESSON 1", "Task achievement"],
    ru: "УРОК 1 Выполнение задания",
    uz: "1-DARS Vazifani bajarish",
    section: "Overview",
    visual: 'text'
  },
  {
    id: 2,
    lines: ["In this lesson, you will learn about:", "1.1 Common problems in Task 1"],
    ru: "В этом уроке вы узнаете о: / 1.1 Распространенные проблемы в Задании 1",
    uz: "Ushbu darsda siz quyidagilarni o'rganasiz: / 1.1 1-topshiriqdagi umumiy muammolar",
    section: "Overview",
    visual: 'text'
  },
  {
    id: 3,
    lines: ["1.2 How and why you may be", "practising Band 3-5", "1.3 Writing a conclusion in Task 1"],
    ru: "1.2 Как и почему вы можете практиковаться на уровне Band 3-5 / 1.3 Написание заключения в Задании 1",
    uz: "1.2 Qanday qilib va nima uchun siz 3-5 ball (Band) darajasida shug‘ullanayotgan bo‘lishingiz mumkin / 1.3 1-topshiriqda xulosa yozish",
    section: "Overview",
    visual: 'text'
  },
  // --- PAGE 2: COMMON PROBLEMS ---
  {
    id: 4,
    title: "WRITING TASK 1",
    lines: ["Academic Writing", "You should spend about", "20 minutes on this task."],
    ru: "ЗАДАНИЕ 1 / Академическое письмо / Вам следует потратить около 20 минут на это задание.",
    uz: "YOZMA TOPSHIRIQ 1 / Akademik Yozuv / Ushbu topshiriqqa taxminan 20 daqiqa vaqt ajratishingiz kerak.",
    section: "Problems",
    visual: 'graph'
  },
  {
    id: 5,
    lines: ["Write a report for a University lecturer", "describing the information shown below.", "You should write at least 150 words."],
    ru: "Напишите отчет для преподавателя университета, описывающий информацию, приведенную ниже. / Вам следует написать не менее 150 слов.",
    uz: "Quyida keltirilgan ma'lumotlarni tasvirlab, universitet o'qituvchisi uchun hisobot yozing. / Siz kamida 150 ta so'z yozishingiz kerak.",
    section: "Problems",
    visual: 'text'
  },
  {
    id: 6,
    lines: ["1.1 Common problems in writing Task 1", "In lessons 1 and 2 we will explore the most", "common problems in writing task 1."],
    ru: "1.1 Распространенные проблемы при написании Задания 1 / В уроках 1 и 2 мы рассмотрим наиболее частые проблемы...",
    uz: "1.1 1-topshiriqni yozishdagi umumiy muammolar / 1 va 2-darslarda biz eng ko'p uchraydigan muammolarni ko'rib chiqamiz...",
    section: "Problems",
    visual: 'text'
  },
  {
    id: 7,
    lines: ["These problems have been selected because", "each of them will keep your Task 1 score", "at band 6 or even lower:"],
    ru: "Эти проблемы были выбраны, потому что каждая из них удержит ваш балл за Задание 1 на уровне 6 или даже ниже:",
    uz: "Ushbu muammolar tanlab olingan, chunki ularning har biri 1-topshiriq balingizni 6 yoki undan past darajada ushlab turadi:",
    section: "Problems",
    visual: 'warning'
  },
  {
    id: 8,
    title: "Using the wrong materials",
    lines: ["Many of the misunderstandings about Task 1", "come from using the wrong materials", "for your practice."],
    ru: "Использование неправильных материалов / Многие недопонимания касательно Задания 1 возникают из-за использования неправильных материалов для практики.",
    uz: "Noto'g'ri materiallardan foydalanish / 1-topshiriq bo'yicha ko'plab tushunmovchiliklar amaliyot uchun noto'g'ri materiallardan foydalanishdan kelib chiqadi.",
    section: "Problems",
    visual: 'text'
  },
  {
    id: 9,
    lines: ["Some people try to justify this, telling me:", "Task 1 in IELTS is a graph of some kind", "so we can practice even using a random infographic"],
    ru: "Некоторые пытаются оправдать это, говоря мне: 'Задание 1 в IELTS — это какой-то график, так что мы можем тренироваться даже на случайной инфографике'",
    uz: "Ba'zilar buni oqlashga urinib, menga shunday deyishadi: 'IELTS 1-topshirig'i qandaydir grafikdan iborat, shuning uchun biz tasodifiy infografikadan foydalanib ham mashq qilishimiz mumkin'",
    section: "Problems",
    visual: 'quote'
  },
  {
    id: 10,
    lines: ["If you are using materials you find online,", "or that have been shared following a test,", "then you are not preparing for the real test."],
    ru: "Если вы используете материалы из интернета или те, которыми поделились после теста, то вы не готовитесь к реальному экзамену.",
    uz: "Agar siz internetdan topilgan yoki testdan keyin ulashilgan materiallardan foydalanayotgan bo'lsangiz, unda siz haqiqiy imtihonga tayyorgarlik ko'rmayapsiz.",
    section: "Problems",
    visual: 'warning'
  },
  {
    id: 11,
    lines: ["Materials used in the real test are", "carefully written and edited so that", "they are not confusing"],
    ru: "Материалы, используемые в реальном тесте, тщательно написаны и отредактированы так, чтобы они не сбивали с толку",
    uz: "Haqiqiy imtihonda ishlatiladigan materiallar chalg'ituvchi bo'lmasligi uchun ehtiyotkorlik bilan yozilgan va tahrirlangan",
    section: "Problems",
    visual: 'text'
  },
  {
    id: 12,
    lines: ["they don't require specialist knowledge", "they force you to use (and practise)", "the skills you need to show in the test"],
    ru: "они не требуют специальных знаний / они заставляют вас использовать (и практиковать) навыки, необходимые на тесте",
    uz: "ular maxsus bilimlarni talab qilmaydi / ular sizni imtihonda ko'rsatishingiz kerak bo'lgan ko'nikmalarni ishlatishga (va mashq qilishga) majbur qiladi",
    section: "Problems",
    visual: 'text'
  },
  {
    id: 13,
    lines: ["You will not find this in random", "infographics you find online."],
    ru: "Вы не найдете этого в случайных инфографиках из интернета.",
    uz: "Siz buni internetdan topilgan tasodifiy infografikalarda topa olmaysiz.",
    section: "Problems",
    visual: 'warning'
  },
  {
    id: 14,
    title: "Task Achievement vs Task Response",
    lines: ["In task 2, you are assessed on how you respond,", "while in task 1, extent to which", "you achieve the task."],
    ru: "Выполнение задания (Task Achievement) против Ответ на задание (Task Response) / В задании 2 оценивается ваш ответ, а в задании 1 — насколько вы выполнили задачу.",
    uz: "Vazifani bajarish va Vazifaga javob / 2-topshiriqda sizning javobingiz baholanadi, 1-topshiriqda esa vazifani qay darajada bajarganingiz o'lchanadi.",
    section: "Analysis",
    visual: 'split'
  },
  {
    id: 15,
    lines: ["This means that it is very important", "to follow the instructions you are given.", "These tell us that you need to:"],
    ru: "Это означает, что очень важно следовать данным инструкциям. Они говорят нам, что нужно:",
    uz: "Bu shuni anglatadiki, berilgan ko'rsatmalarga rioya qilish juda muhimdir. Ular bizga quyidagilarni bajarish kerakligini aytadi:",
    section: "Analysis",
    visual: 'text'
  },
  {
    id: 16,
    lines: ["Summarise the information by selecting", "and reporting the main features,", "and make comparisons where relevant."],
    ru: "Обобщите информацию, выбирая и сообщая об основных чертах, и делайте сравнения, где это уместно.",
    uz: "Asosiy xususiyatlarni tanlash va xabar qilish orqali ma'lumotni umumlashtiring va kerak bo'lganda taqqoslang.",
    section: "Analysis",
    visual: 'check'
  },
  {
    id: 17,
    lines: ["In spite of this, most of the band 6 answers", "I see are written as though instructions say:", "List all of the information you can see."],
    ru: "Несмотря на это, большинство ответов Band 6 написаны так, будто инструкции говорят: 'Перечислите всю информацию, которую видите'.",
    uz: "Shunga qaramay, men ko'rgan Band 6 javoblari ko'rsatmalarda shunday deyilgandek yozilgan: 'Siz ko'rgan barcha ma'lumotlarni sanab o'ting.'",
    section: "Analysis",
    visual: 'warning'
  },
  {
    id: 18,
    lines: ["This problem may stem from using practice materials", "that don't reflect the real test.", "Writing task 1 was changed in 2007."],
    ru: "Эта проблема может возникнуть из-за использования практических материалов, не отражающих реальный тест. Задание 1 было изменено в 2007 году.",
    uz: "Bu muammo haqiqiy testni aks ettirmaydigan amaliy materiallardan foydalanishdan kelib chiqishi mumkin. Yozma topshiriq 1 2007 yilda o'zgartirilgan.",
    section: "History",
    visual: 'text'
  },
  {
    id: 19,
    lines: ["Sample test from 2003 - notice the instructions", "before 2007 you were asked to", "Write a report describing the Information shown."],
    ru: "Образец теста 2003 года — обратите внимание на инструкции / Инструкции отличаются: до 2007 года просили 'Написать отчет, описывающий показанную информацию'.",
    uz: "2003 yildagi namuna test - ko'rsatmalarga e'tibor bering / Ko'rsatmalar boshqacha: 2007 yildan oldin sizdan 'Ko'rsatilgan ma'lumotni tavsiflovchi hisobot yozish' so'ralgan.",
    section: "History",
    visual: 'text'
  },
  {
    id: 20,
    lines: ["If you use outdated materials, you are likely to", "practise describing, or listing,", "everything you see."],
    ru: "Если вы используете устаревшие материалы, вы, вероятно, будете практиковаться в описании или перечислении всего, что видите.",
    uz: "Agar siz eskirgan materiallardan foydalansangiz, siz hamma ko'rgan narsangizni tasvirlash yoki ro'yxatga olishni mashq qilishingiz mumkin.",
    section: "History",
    visual: 'warning'
  },
  {
    id: 21,
    lines: ["This means you are not 'selecting'", "or 'summarising' which are two of", "the main requirements of this task."],
    ru: "Это означает, что вы не 'выбираете' и не 'обобщаете', что является двумя главными требованиями этого задания.",
    uz: "Bu shuni anglatadiki, siz ushbu vazifaning ikkita asosiy talabi bo'lgan 'tanlash' yoki 'umumlashtirish'ni bajarmayapsiz.",
    section: "Analysis",
    visual: 'text'
  },
  {
    id: 22,
    title: "Selecting information",
    lines: ["'Selecting the main features' is clearly important", "if you want to 'achieve'", "this task."],
    ru: "Выбор информации / 'Выбор основных черт' явно важен, если вы хотите 'выполнить' это задание.",
    uz: "Ma'lumotni tanlash / Agar siz ushbu vazifani 'bajarishni' istasangiz, 'asosiy xususiyatlarni tanlash' aniq muhimdir.",
    section: "Analysis",
    visual: 'check'
  },
  // --- PAGE 3: STUDENT PERSPECTIVE ---
  {
    id: 23,
    lines: ["A follower of my Facebook page commented:", "'Let me explain this from (my country's) perspective,", "here logical, analytical aspects are ignored.'"],
    ru: "Подписчик моей страницы написал: 'Позвольте объяснить с точки зрения (моей страны), здесь логические, аналитические аспекты часто игнорируются.'",
    uz: "Facebook sahifamning bir kuzatuvchisi shunday izoh qoldirdi: 'Buni (mening mamlakatim) nuqtai nazaridan tushuntirishga ijozat bering, bu yerda mantiqiy, tahliliy jihatlar e'tiborga olinmaydi.'",
    section: "Student Voice",
    visual: 'quote'
  },
  {
    id: 24,
    lines: ["'We never learned to look at a graph", "and write reports about it in our native language.", "I think we... lack the ability to analyse!'"],
    ru: "'Мы никогда не учились смотреть на график и писать отчеты о нем даже на родном языке. Я думаю, нам... не хватает способности анализировать!'",
    uz: "'Biz hech qachon grafikga qarab, u haqida hatto o'z ona tilimizda ham hisobot yozishni o'rganmaganmiz. Menimcha bizda... tahlil qilish qobiliyati yetishmaydi!'",
    section: "Student Voice",
    visual: 'quote'
  },
  {
    id: 25,
    lines: ["'I wrote like a robot when I was in high school", "and such a mindset follows us well into IELTS", "when template-learning is the norm.'"],
    ru: "'В старшей школе я писал как робот, и такое мышление преследует нас в IELTS, где заучивание шаблонов — норма.'",
    uz: "'Men o'rta maktabda o'qiganimda robot kabi yozardim va shablonni o'rganish norma bo'lgan IELTSda ham bunday fikrlash bizni tark etmaydi.'",
    section: "Student Voice",
    visual: 'quote'
  },
  // --- BAND DESCRIPTORS ---
  {
    id: 26,
    lines: ["If this applies to you, you are making mistakes", "that will lower your Task achievement score.", "Looking at band descriptors helps see the impact:"],
    ru: "Если это относится к вам, вы, вероятно, делаете ошибки, снижающие балл. Взгляд на критерии оценки помогает увидеть влияние:",
    uz: "Agar bu sizga ham tegishli bo'lsa, ehtimol siz balingizni pasaytiradigan xatolarga yo'l qo'yyapsiz. Baholash mezonlariga qarash buning ta'sirini ko'rishga yordam beradi:",
    section: "Bands",
    visual: 'text'
  },
  {
    id: 27,
    title: "Band 9",
    lines: ["Fully satisfies all the requirements of the task", "Clearly presents a fully developed response"],
    ru: "Band 9: Полностью удовлетворяет всем требованиям задания. Четко представляет полностью развернутый ответ",
    uz: "Band 9: Topshiriqning barcha talablarini to'liq qondiradi. To'liq ishlab chiqilgan javobni aniq taqdim etadi",
    section: "Bands",
    visual: 'table'
  },
  {
    id: 28,
    title: "Band 8",
    lines: ["Covers all requirements of the task sufficiently", "Presents, highlights, and illustrates key features", "clearly and appropriately"],
    ru: "Band 8: Достаточно охватывает все требования. Представляет, выделяет и иллюстрирует ключевые особенности четко и уместно",
    uz: "Band 8: Topshiriqning barcha talablarini yetarlicha qamrab oladi. Asosiy xususiyatlarni aniq va to'g'ri taqdim etadi, ajratib ko'rsatadi va tasvirlaydi",
    section: "Bands",
    visual: 'table'
  },
  {
    id: 29,
    title: "Band 7",
    lines: ["Covers the requirements of the task", "Presents a clear overview of main trends", "differences or stages"],
    ru: "Band 7: Охватывает требования задания. Представляет четкий обзор (overview) основных тенденций, различий или этапов",
    uz: "Band 7: Topshiriq talablarini qamrab oladi. Asosiy tendentsiyalar, farqlar yoki bosqichlarning aniq umumiy ko'rinishini taqdim etadi",
    section: "Bands",
    visual: 'table'
  },
  {
    id: 30,
    title: "Band 6",
    lines: ["Addresses the requirements of the task", "Presents and adequately highlights key features but", "details may be irrelevant or inaccurate"],
    ru: "Band 6: Касается требований задания. Представляет и адекватно выделяет ключевые особенности, но детали могут быть нерелевантными или неточными",
    uz: "Band 6: Topshiriq talablariga to'xtalib o'tadi. Asosiy xususiyatlarni taqdim etadi va yetarlicha yoritadi, ammo tafsilotlar ahamiyatsiz yoki noaniq bo'lishi mumkin",
    section: "Bands",
    visual: 'table'
  },
  {
    id: 31,
    lines: ["You will only reach band 7 in Task achievement", "if you cover the requirements of the task,", "namely summarising by selecting main features."],
    ru: "Вы достигнете Band 7 только если охватите требования, а именно: обобщение путем выбора основных черт.",
    uz: "Siz Task Achievement bo'yicha Band 7 ga faqat talablarni qamrab olsangiz, ya'ni asosiy xususiyatlarni tanlab umumlashtirsangiz erishasiz.",
    section: "Bands",
    visual: 'text'
  },
  // --- DO'S AND DON'TS ---
  {
    id: 32,
    lines: ["Do:", "Select the main features", "Present and highlight the key features (Band 7)"],
    ru: "Делать: выбирать основные черты / представлять и выделять ключевые особенности",
    uz: "Bajarish kerak: asosiy xususiyatlarni tanlash / asosiy xususiyatlarni taqdim etish va ajratib ko'rsatish",
    section: "Guidelines",
    visual: 'check'
  },
  {
    id: 33,
    lines: ["Do:", "Make comparisons (where relevant)", "Present a clear overview of main trends", "differences, or stages"],
    ru: "делать сравнения (где уместно) / представлять четкий обзор (overview) основных трендов, различий или этапов",
    uz: "taqqoslashlar qilish (o'rinli bo'lganda) / asosiy tendentsiyalar, farqlar yoki bosqichlarning aniq umumiy ko'rinishini taqdim etish",
    section: "Guidelines",
    visual: 'check'
  },
  {
    id: 34,
    lines: ["Don't:", "Give details that are irrelevant,", "inappropriate, or inaccurate (Band 6)"],
    ru: "Не делать: давать детали, которые нерелевантны, неуместны или неточны",
    uz: "Bajarmaslik kerak: ahamiyatsiz, noo'rin yoki noaniq tafsilotlarni berish",
    section: "Guidelines",
    visual: 'warning'
  },
  {
    id: 35,
    lines: ["In a professional setting, Task 1 is:", "writing about a new manufacturing process;", "the results section of an annual report."],
    ru: "В профессиональной среде Задание 1 можно сравнить с описанием нового производственного процесса; разделом результатов в годовом отчете.",
    uz: "Professional muhitda 1-topshiriqni yangi ishlab chiqarish jarayoni haqida yozish; kompaniyaning yillik hisobotining natijalar bo'limi bilan taqqoslash mumkin.",
    section: "Conclusion",
    visual: 'text'
  }
];

export const VOCABULARY: VocabItem[] = [
  { term: "Task Achievement", definition: "The extent to which a student completes the specific requirements of the task.", example: "Scoring high in Task Achievement requires covering all bullet points." },
  { term: "Task Response", definition: "How well a student formulates an argument in response to an essay question (Task 2).", example: "Task Response is the counterpart to Task Achievement in Task 2." },
  { term: "Overview", definition: "A summary of the main trends, differences, or stages shown in the data.", example: "A clear overview is essential for Band 7." },
  { term: "Select", definition: "To choose specific key features to describe rather than listing everything.", example: "You must select the main features, not list all data points." },
  { term: "Relevant", definition: "Closely connected or appropriate to the matter at hand.", example: "Only include relevant details in your summary." },
  { term: "Summarise", definition: "To give a brief statement of the main points.", example: "Summarise the information by selecting main features." },
  { term: "Band Descriptor", definition: "Criteria used to assess and score IELTS writing tasks.", example: "Study the band descriptors to understand how to get a 7." }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the key difference between Task 1 and Task 2 assessment?",
    options: ["Length of essay", "Task Achievement vs Task Response", "Grammar vs Vocabulary", "Spelling requirements"],
    correctIndex: 1,
    explanation: "Task 1 assesses 'Task Achievement' (did you do what was asked?), while Task 2 assesses 'Task Response' (how you argue)."
  },
  {
    id: 2,
    question: "Why should you avoid using random infographics found online for practice?",
    options: ["They are too colorful", "They are often not edited to test specific skills", "They are too hard", "They are copyrighted"],
    correctIndex: 1,
    explanation: "Real IELTS materials are carefully edited to force you to use specific skills like summarizing and selecting."
  },
  {
    id: 3,
    question: "What is a common mistake that keeps students at Band 6?",
    options: ["Writing too much", "Listing all details instead of selecting main features", "Using pen instead of pencil", "Writing an introduction"],
    correctIndex: 1,
    explanation: "Listing everything ('mechanical description') is a Band 6 trait. Band 7 requires selecting main features."
  },
  {
    id: 4,
    question: "Which year was Writing Task 1 changed significantly?",
    options: ["2000", "2007", "2015", "2020"],
    correctIndex: 1,
    explanation: "In 2007, instructions changed from 'describe the information' to 'summarise the information'."
  }
];