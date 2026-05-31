// Danh sách các hành tinh cho features/planatery/planetry.tsx
export const planetryItems = [
	{
		id: 1,
		name: "Mercury",
		Image: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png",
		desc: "Mercury is the closest planet to the Sun.",
	},
	{
		id: 2,
		name: "Venus",
		Image: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png",
		desc: "Venus is the second planet from the Sun.",
	},
	{
		id: 3,
		name: "Earth",
		Image: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png",
		desc: "Earth is our home planet.",
	},
	{
		id: 4,
		name: "Mars",
		Image: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png",
		desc: "Mars is known as the Red Planet.",
	},
	// ...thêm các hành tinh khác nếu cần
];
import {
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	House,
	UsersRound,
	MessageSquareText,
	UserRoundPlus,
	SendToBack,
	PackageSearch,
	CassetteTape,
	Server,
	TimerResetIcon,
	BookCheck,
} from "lucide-react";

import {
	Aquarius,
	Aries,

	Cancer,
	Capricorn,
	cardAaurus,
	cardAries,
	cardBack,
	cardCancer,
	cardGemini,

	cardLeo,
	cardLibra,
	cardVirgo,
	Gemini,
	guide01,
	guide02,
	guide03,
	guide04,
	guide05,
	guide06,
	guide07,
	guide08,
	guide09,
	guide10,
	guide11,
	guide12,
	guide13,
	Leo,
	Libra,
	life01,
	life02,
	life03,
	life04,

	Pisces,
	Sagittarius,
	Scorpio,

	star01,
	star02,
	star03,
	star04,
	star05,
	star06,
	star07,
	star08,
	star09,
	star10,
	Taurus,
	Virgo,
} from "@/public";

export const sideBarItem = {
	user: {
		name: "The Mounting",
		email: "info@mounting.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: House,
		},
		{
			title: "Blogs",
			url: "/admin/blogs",
			icon: MessageSquareText,
		},
		{
			title: "Categories",
			url: "/admin/categories",
			icon: CassetteTape,
		},
		{
			title: "Products",
			url: "/admin/product",
			icon: PackageSearch,
		},
		{
			title: "Services",
			url: "/admin/services",
			icon: Server,
		},
		{
			title: "Time Slots",
			url: "/admin/timeslots",
			icon: TimerResetIcon,
		},
		{
			title: "User",
			url: "/admin/user",
			icon: UsersRound,
		},
		{
			title: "Orders",
			url: "/admin/orders",
			icon: SendToBack,
		},
		{
			title: "Bookings",
			url: "/admin/booking",
			icon: BookCheck,
		},
		{
			title: "Subscriber",
			url: "/admin/subscriber",
			icon: UserRoundPlus,
		},
	],
};

export const navbarItems = [
	{
		id: 1,
		title: "About Us",
		href: "/about-us",
	},
	{
		id: 2,
		title: "Services",
		href: "/services",
	},
	{
		id: 3,
		title: "Blogs",
		href: "#",
	},
	{
		id: 4,
		title: "Planetary Meditations",
		href: "/planetary-meditations",
	},
	{
		id: 5,
		title: "Products",
		href: "/products",
	},
	{
		id: 6,
		title: "Life & Balances",
		href: "/life-&-balances",
	},
	{
		id: 7,
		title: "Stars and Planets",
		href: "/stars",
	},
];


export const servicesItems = [
	   {
		   id: 1,
		   title: "Tarot Reading",
		   titleVi: "Bói bài Tarot",
		   desc: "Unlock hidden guidance with tarot divination. Explore multiple spreads and let the cards reveal insights for your journey.",
		   descVi: "Khám phá thông điệp ẩn qua bói bài Tarot. Nhiều kiểu trải bài giúp bạn nhận được lời khuyên cho hành trình của mình.",

		   btn: "Start Reading",
		   btnVi: "Bắt đầu bói bài",
		   href: "tarot",
	   },
	   {
		   id: 2,
		   title: "Stars And Planets",
		   titleVi: "Sao và Hành tinh",
		   desc: "Explore the cosmic influences of celestial bodies and learn how their positions impact your daily life and future path.",
		   descVi: "Khám phá ảnh hưởng của các vì sao và hành tinh tới cuộc sống và tương lai của bạn.",
		   btn: "Learn more",
		   btnVi: "Tìm hiểu thêm",
		   href: "stars/star-guidance",
	   },
];

export const horoScopeItems = [
	{
		id: 1,
		title: "Aries",
		desc: "March 21 - April 20",
		src: Aries,
	},
	{
		id: 2,
		title: "Taurus",
		desc: "April 21 - May 21",
		src: Taurus,
	},
	{
		id: 3,
		title: "Gemini",
		desc: "May 22 - Jun 21",
		src: Gemini,
	},
	{
		id: 4,
		title: "Cancer",
		desc: "Jun 22 - July 22",
		src: Cancer,
	},
	{
		id: 5,
		title: "Leo",
		desc: "July 23 - August 21",
		src: Leo,
	},
	{
		id: 6,
		title: "Virgo",
		desc: "August 22 - September 23",
		src: Virgo,
	},
	{
		id: 7,
		title: "Libra",
		desc: "September 24 - October 23",
		src: Libra,
	},
	{
		id: 8,
		title: "Scorpio",
		desc: "October 24 - November 22",
		src: Scorpio,
	},
	{
		id: 9,
		title: "Sagittarius",
		desc: "November 23 - December 22",
		src: Sagittarius,
	},
	{
		id: 10,
		title: "Capricorn",
		desc: "December 23 - January 20",
		src: Capricorn,
	},
	{
		id: 11,
		title: "Aquarius",
		desc: "January 21 - February  19",
		src: Aquarius,
	},
	{
		id: 12,
		title: "Pisces",
		desc: "February 20 - March 20",
		src: Pisces,
	},
];

export const cardsItems = [
	{
		id: 1,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardAries,
	},
	{
		id: 2,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardCancer,
	},
	{
		id: 3,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardGemini,
	},
	{
		id: 4,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardLeo,
	},
	{
		id: 5,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardLibra,
	},
	{
		id: 6,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardAaurus,
	},
	{
		id: 7,
		img: cardBack,
		link: "https://astrologyapi.com",
		src: cardVirgo,
	},
];

export const lifehealingItems = [
	{
		id: 1,
		title:
			"An Introduction to the Life Alignment Balances Method By Marguerite Hafeman.",
		desc: "We are each a piece of art, shaped and colored by experience as we grow up and journey through life.  Body, mind, heart and soul are tempered through trauma, family patterning, social and religious mandates and challenging encounters with others.",
		src: life01,
	},
	{
		id: 2,
		title: "An interview with the founder of Life Alignment.",
		desc: "The turbulence and change occurring on our planet forced a lot of “normal” life to go online. From work and fitness to personal well-being and self-care, many tools for transformation initially relied on online platforms. Now there are many more people who prefer the convenience of non-local treatments, being able to connect to offerings and practitioners all over the world.",
		src: life02,
	},
	{
		id: 3,
		title: "Discover the Miracle of Life Alignment.",
		desc: "Detailed examination of how current planetary movements and transits impact your natal chart. Discover the timing of important life events, understand current challenges, and learn how to best utilize upcoming opportunities for personal growth and success.",
		src: life03,
	},
	{
		id: 4,
		title: "Metatron Cube and the Life Alignment Method.",
		desc: "One example of the many patterns used in Life Alignment energy balances.  Alternatively, cards can be placed on the body or on an image of the body to perform a particular sequence dedicated to priorities identified by muscle testing or pendulum work.  Points located either on the body or in the subtle bodies and chakras associated with the body can be identified and “entered in” as part of the procedure of focusing in on the priority at hand.",
		src: life04,
	},
];

export const starItems = [
	{
		id: 1,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star01,
	},
	{
		id: 2,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star02,
	},
	{
		id: 3,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star03,
	},
	{
		id: 4,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star04,
	},
	{
		id: 5,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star05,
	},
	{
		id: 6,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star06,
	},
	{
		id: 7,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star07,
	},
	{
		id: 8,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star08,
	},
	{
		id: 9,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star09,
	},
	{
		id: 10,
		title: "Blog Name Here",
		para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para2:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		para3:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		src: star10,
	},
];

export const zodiacSigns = [
	{
		id: 1,
		sign: "SCORPIO",

		description:
			"Scorpio is a Water sign known for intensity, passion, and emotional depth. They are determined, resourceful, and often mysterious.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Pluto and Mars, Scorpios possess powerful intuition and the ability to see beneath the surface. They are natural investigators and healers.",
		longDescription:
			"Scorpios are the most intense and powerful sign of the zodiac. They have an innate ability to transform themselves and others. Their magnetic personality and deep emotional understanding make them excellent leaders and trusted confidants.",
		src: star08,
	},
	{
		id: 2,
		sign: "TAURUS",

		description:
			"Taurus is an Earth sign characterized by stability, reliability, and a strong connection to the material world. They are patient and determined.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Venus, Taureans have a deep appreciation for beauty, comfort, and luxury. They are known for their practical approach to life and strong work ethic.",
		longDescription:
			"Taurus individuals are the builders of the zodiac, creating solid foundations in all aspects of life. They value security and comfort, approaching life with steady determination and unwavering persistence.",
		src: star02,
	},
	{
		id: 3,
		sign: "GEMINI",

		description:
			"Gemini is an Air sign representing duality, communication, and intellectual curiosity. They are versatile, adaptable, and quick-witted.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Mercury, Geminis excel in communication and learning. They have a natural ability to gather and share information, making them excellent communicators.",
		longDescription:
			"Geminis are the intellectuals of the zodiac, constantly seeking new knowledge and experiences. Their dual nature allows them to see multiple perspectives and adapt to any situation with ease.",
		src: star03,
	},
	{
		id: 4,
		sign: "CANCER",

		description:
			"Cancer is a Water sign associated with emotions, nurturing, and home life. They are deeply intuitive and highly protective of loved ones.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by the Moon, Cancerians are deeply connected to their emotions and the feelings of others. They are natural caregivers with strong protective instincts.",
		longDescription:
			"Cancers are the nurturers of the zodiac, creating safe spaces for themselves and others. Their emotional intelligence and intuitive nature make them excellent friends and family members.",
		src: star04,
	},
	{
		id: 5,
		sign: "LEO",

		description:
			"Leo is a Fire sign known for confidence, creativity, and natural leadership. They are generous, warm-hearted, and love being in the spotlight.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by the Sun, Leos radiate warmth and charisma. They have a natural flair for drama and entertainment, often taking center stage in life.",
		longDescription:
			"Leos are the natural leaders of the zodiac, bringing light and warmth to those around them. Their creative energy and generous spirit make them magnetic personalities who inspire others.",
		src: star05,
	},
	{
		id: 6,
		sign: "SAGITTARIUS",

		description:
			"Sagittarius is a Fire sign representing adventure, philosophy, and optimism. They are truth-seekers with a love for exploration and learning.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Jupiter, Sagittarians are naturally lucky and optimistic. They have an insatiable curiosity about life and a desire for personal growth.",
		longDescription:
			"Sagittarians are the philosophers of the zodiac, always seeking higher knowledge and new horizons. Their optimistic nature and love for adventure make them inspiring teachers and travelers.",
		src: star09,
	},
	{
		id: 7,
		sign: "LIBRA",

		description:
			"Libra is an Air sign symbolizing balance, harmony, and justice. They are diplomatic, fair-minded, and naturally seek peace in all situations.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Venus, Librans have a strong sense of justice and beauty. They excel in creating harmony and maintaining relationships.",
		longDescription:
			"Libras are the peacekeepers of the zodiac, always striving for balance and fairness. Their diplomatic nature and charm make them excellent mediators and partners.",
		src: star07,
	},
	{
		id: 8,
		sign: "ARIES",

		description:
			"Aries is a Fire sign known for leadership, courage, and dynamic energy. They are natural pioneers who love taking initiative and starting new projects.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Mars, Arians are natural warriors with boundless energy and enthusiasm. They excel in leadership and taking bold action.",
		longDescription:
			"Aries individuals are the pioneers of the zodiac, leading the way with courage and determination. Their energetic nature and enthusiasm make them natural leaders and innovators.",
		src: star01,
	},
	{
		id: 9,
		sign: "VIRGO",

		description:
			"Virgo is an Earth sign characterized by analytical thinking, attention to detail, and practical approach to life. They are methodical and service-oriented.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Mercury, Virgos have a sharp analytical mind and eye for detail. They excel in organization and problem-solving.",
		longDescription:
			"Virgos are the perfectionists of the zodiac, always striving to improve themselves and their environment. Their practical nature and attention to detail make them excellent problem-solvers and healers.",
		src: star06,
	},
	{
		id: 10,
		sign: "CAPRICORN",

		description:
			"Capricorn is an Earth sign representing ambition, discipline, and practical wisdom. They are natural leaders with a strong drive for success.",
		specialEffects: "Special effects:",

		additionalInfo:
			"Ruled by Saturn, Capricorns are masters of discipline and structure. They excel in building lasting foundations and achieving long-term goals.",
		longDescription:
			"Capricorns are the achievers of the zodiac, climbing the mountain of success with patience and determination. Their practical wisdom and disciplined approach make them excellent managers and leaders.",
		src: star10,
	},
];

export const starGuidanceItems = [
	{
		id: 1,
		title: "The Birthday Horoscope",
		src: guide01,
	},
	{
		id: 2,
		title: "The Solar Return Chart",
		src: guide02,
	},
	{
		id: 3,
		title: "A Timely Tune-Up",
		src: guide03,
	},
	{
		id: 4,
		title: "Relating: Table for Two",
		src: guide04,
	},
	{
		id: 5,
		title: "Relating: It's Showtime!",
		src: guide05,
	},
	{
		id: 6,
		title: "Ask the Stars: What Will Happen or Where is It?",
		src: guide06,
	},
	{
		id: 7,
		title: "When Should I Do It?",
		src: guide07,
	},
	{
		id: 8,
		title: "Career and Money",
		src: guide08,
	},
	{
		id: 9,
		title: "Past Lives-Future Path",
		src: guide09,
	},
	{
		id: 10,
		title: "Exotic Nuts and Bolts",
		src: guide10,
	},
	{
		id: 11,
		title: "The Astrology of Asteroids",
		src: guide11,
	},
	{
		id: 12,
		title: "Four Faces of Lilith",
		src: guide12,
	},
	{
		id: 13,
		title: "Moon Faces",
		src: guide13,
	},
];

export const paymentMethods = [
	{
		id: 1,
		title: "card",

	},
	{
		id: 2,
		title: "paypal",

	},
	{
		id: 3,
		title: "venmo",
	},
	{
		id: 4,
		title: "square",

	},
];

export const simFengShuiItems = [
	{
		id: 1,
		phone: "0325.202.392",
		price: "1.800.000đ",
		element: "THỦY",
		badge: "Đại cát",
		title: "LỖI ĐỊA DỰ",
		meaning: "2392: An lạc từ đến tự nhiên cát tương",
		description: "Hỷ khí, vui mừng, có nhiều cơ hội tốt để thành công",
		harmony: "Âm Dương: Cần Băng",
		guarantee: "Chứng chỉ đảm bảo đối trả",
		benefit: "☆ GIẢNG SINH ÂN LẠNH, LỘC VỀ ĐẦY TAY",
	},
	{
		id: 2,
		phone: "0325.143.541",
		price: "1.900.000đ",
		element: "THỦY",
		badge: "Đại cát",
		title: "HÓA THIÊN ĐẠI HỘI",
		meaning: "3541: Chuyên tâm kinh doanh hay dùng trí",
		description: "Có lộn, giàu sang, quyền lực, tài sáng",
		harmony: "Âm Dương: Cần Băng",
		guarantee: "Chứng chỉ đảm bảo đối trả",
		benefit: "☆ GIẢNG SINH ÂN LẠNH, LỘC VỀ ĐẦY TAY",
	},
	{
		id: 3,
		phone: "0325.135.036",
		price: "1.800.000đ",
		element: "THỦY",
		badge: "Đại cát",
		title: "HÓA THIÊN ĐẠI HỘI",
		meaning: "5036: Khó trước sự sáng sau, không bị thất bại",
		description: "Có lộn, giàu sang, quyền lực, tài sáng",
		harmony: "Âm Dương: Cần Băng",
		guarantee: "Chứng chỉ đảm bảo đối trả",
		benefit: "☆ GIẢNG SINH ÂN LẠNH, LỘC VỀ ĐẦY TAY",
	},
];

