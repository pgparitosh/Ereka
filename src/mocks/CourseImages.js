const CourseImages = [
  {
    id: 1,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/maths-icon.png"),
    name: "Maths",
    count: 43
  },
  {
    id: 2,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/science-icon.png"),
    name: "Science",
    count: 22
  },
  {
    id: 3,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/ss-icon.png"),
    name: "Social Science",
    count: 14
  },
  {
    id: 4,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/english-icon.png"),
    name: "English",
    count: 25
  },
  {
    id: 5,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/maths-icon.png"),
    name: "Gujarati",
    count: 56
  },
  {
    id: 6,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/maths-icon.png"),
    name: "Grammar",
    count: 88
  },
  {
    id: 7,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/maths-icon.png"),
    name: "Hindi",
    count: 43
  },
  {
    id: 8,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/maths-icon.png"),
    name: "Sanskrit",
    count: 43
  },
  {
    id: 9,
    imageUrl: require("../../assets/images/home/subject-bg.png"),
    iconUrl: require("../../assets/images/home/maths-icon.png"),
    name: "Computer Education",
    count: 43
  }
];

const Standards = [
  {
    id: 1,
    standard: "1"
  },
  {
    id: 2,
    standard: "2"
  },
  {
    id: 3,
    standard: "3"
  },
  {
    id: 4,
    standard: "4"
  },
  {
    id: 5,
    standard: "5"
  },
  {
    id: 6,
    standard: "6"
  },
  {
    id: 7,
    standard: "7"
  },
  {
    id: 8,
    standard: "8"
  },
  {
    id: 9,
    standard: "9"
  },
  {
    id: 10,
    standard: "10"
  },
  {
    id: 11,
    standard: "11"
  },
  {
    id: 12,
    standard: "12"
  }
];

const SubscriptionsMock = [
  {
    id: "1",
    title: "8th and 9th Science",
    subtitle: "JEE - Section 1",
    subscriptionType: "Yearly",
    price: "Rs 500.00",
    discount: "Save 30% - Rs 150.00"
  },
  {
    id: "2",
    title: "8th and 9th Science",
    subtitle: "JEE - Section 2",
    subscriptionType: "Yearly",
    price: "Rs 500.00",
    discount: "Save 30% - Rs 150.00"
  },
  {
    id: "3",
    title: "8th and 9th Science",
    subtitle: "JEE - Section 3",
    subscriptionType: "Yearly",
    price: "Rs 500.00",
    discount: "Save 30% - Rs 150.00"
  },
  {
    id: "4",
    title: "8th and 9th Science",
    subtitle: "JEE - Section 4",
    subscriptionType: "Yearly",
    price: "Rs 500.00",
    discount: "Save 30% - Rs 150.00"
  },
  {
    id: "5",
    title: "8th and 9th Science",
    subtitle: "JEE - Section 5",
    subscriptionType: "Yearly",
    price: "Rs 500.00",
    discount: "Save 30% - Rs 150.00"
  }
];

const ChaptersMock = [
  {
    id: "1",
    title: "Profit and Loss",
    //desc:
      //"Contains the basics of Profit and loss. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
    desc:
    "સ્નેહી શ્રી, જય અર્બુદા, મધુવન ફાર્મ ગાંધીનગર આયોજીત શરદ પૂનમ નિમિત્તે ગાંધીનગર શહેર આંજણા ચૌધરી સમાજ પરિવાર માટે રાસ - ગરબાનું આયોજન કરવામાં આવેલ છે. જેમાં સહ પરિવાર પધારવા હાર્દિક આમંત્રણ છે.તારીખ : 05/10/2017, ગુરુવાર સમય : રાત્રે 08.00 કલાકે સ્થળ- મધુવન ફાર્મ હોટલ ઘુંઘટ પાસે, 'ક' રોડ, ગાંધીનગર"
  },
  {
    id: "2",
    title: "Simple Interest",
    desc:
      "Contains the basics of Simple Interest. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
  },
  {
    id: "3",
    title: "Compound Interest",
    desc:
      "Contains the basics of Compound Interest. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
  },
  {
    id: "4",
    title: "Algebra",
    desc:
      "Contains the basics of Algebra. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
  },
  {
    id: "5",
    title: "Trigonometry",
    desc:
      "Contains the basics of trigonometry. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
  },
  {
    id: "6",
    title: "Geometry",
    desc:
      "Contains the basics of geometry. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
  },
  {
    id: "7",
    title: "Theorems & Posulates",
    desc:
      "Contains the basics of theorems and posulates. A practical approach for understanding the fundamentals of one of the most important basic course which would lead to the clear foundation of logic and thinking."
  },
];

const VideosMock = [
  {
    id: "1",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "10000",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "2",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://github.com/intel-iot-devkit/sample-videos/raw/master/bolt-detection.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "2000",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "30000",
  },
  {
    id: "3",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "0",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "4",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "0",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "5",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "10000",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "6",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "2000",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "7",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "5000",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "8",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "54000",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "9",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "0",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
  {
    id: "10",
    title: "Introduction - Algebric Expressions and Identities",
    chapter: "Chapter - 9",
    standard: "NCERT Class 8th Maths",
    videoUrl: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
    thumbnailUrl: "https://cdn2.vectorstock.com/i/1000x1000/57/96/math-colorful-horizontal-banner-vector-18715796.jpg",
    startTimeInMillis: "0",
    isDownloaded: false,
    downloadedUrl: "",
    videoLengthInMillis: "99000",
  },
];



export { CourseImages, Standards, SubscriptionsMock, ChaptersMock, VideosMock };
