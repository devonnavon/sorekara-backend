import models, { sequelize } from '../models';
import { text } from 'express';

//**********************************************************************
//						LANDING PAGE CONTENT
//**********************************************************************

const createLandingPageContent = async () => {
	await models.LandingText.create({
		title: 'the space',
		question: 'The space? A unique environment to associate it to?',
		answer:
			'Curate your post event space just as you would the event itself. Choose fonts, colors, background images, layouts, and more!',
	});
	await models.LandingText.create({
		title: 'the artifacts',
		question:
			'Is it social? Seeing expected and unexpected people, making friends, and having side conversations.',
		answer:
			'A place to hold all “things” related to your event. Further readings, slides, songs, recordings, pictures, merch, it’s up to you.',
	});
	await models.LandingText.create({
		title: 'the social',
		question: 'Or is it simply the intimacy of gathering collectively.',
		answer:
			'Encourage connections within your audience. Facilitate further discussion, exchanging of contact info, and hopefully the creation of smaller, tighter knit communities.',
	});
	await models.LandingText.create({
		title: 'the host connection',
		question: 'Artifacts? Whether it be pictures, merch, wristbands, and etc.',
		answer:
			'Engagement with your audience doesn’t have to end when the event does. Share thoughts, have conversations, make friends!',
	});
	await models.LandingText.create({
		title: 'the collective intimacy',
		question: 'Connection to the artist or organizer?',
		answer:
			'Ultimately, sorekara aims to provide a space where you can revel in the post event glow with your community of like-minded folks.',
	});
};

//**********************************************************************
//				USER SEEDING WITH MESSAGES AND EVENTS
//**********************************************************************

const createUsersWithMessages = async (date) => {
	await models.User.create(
		{
			username: 'len',
			email: 'len@noshi.globe',
			password: 'qqqqqqq',
			role: 'ADMIN',
			messages: [
				{
					text: 'yo yo yo',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
			events: [
				{
					title: 'my super sick concert',
					description:
						'its gonna be cool, we wont touch, no germs etc. gOOd vIBes onLY',
					eventDate: date.setSeconds(date.getSeconds() + 1),
					published: false,
					password: 'password',
				},
				{
					title: 'super serious meditation',
					description:
						"we're gonna mediate and grow. Its suppppppper serious. We'll be manifesting.",
					eventDate: date.setSeconds(date.getSeconds() + 1),
					published: true,
					password: 'yes',
				},
				{
					title: 'xxxporn',
					description:
						'people might do this on our site also. that would be funny, and probably quite lucrative',
					eventDate: date.setSeconds(date.getSeconds() + 1),
					published: false,
					password: 'xxx',
				},
				{
					title: 'plant care and you',
					description:
						'have you gotten a new plant? okay here is something for you',
					eventDate: date.setSeconds(date.getSeconds() + 1),
					published: false,
					password: 'plant',
				},
			],
		},
		{
			include: [models.Message, models.Event],
		}
	);

	await models.User.create(
		{
			username: 'dev',
			email: 'dev@noshi.world',
			password: 'qqqqqqq',
			role: 'ADMIN',
			messages: [
				{
					text: 'sharks scare me',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'but imma still shred',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
			events: [
				{
					title: 'the first party in years',
					description:
						'its gonna be cool, we wont touch, no germs etc. gOOd vIBes onLY',
					eventDate: date.setSeconds(date.getSeconds() + 1),
					published: false,
					password: 'password',
				},
			],
		},
		{
			include: [models.Message, models.Event],
		}
	);

	await models.User.create(
		{
			username: 'loser',
			email: 'some@loser.whoihate',
			password: 'qqqqqqq',
			messages: [
				{
					text: 'delete me',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
				{
					text: 'I dont want to be here',
					createdAt: date.setSeconds(date.getSeconds() + 1),
				},
			],
			events: [
				{
					title: 'lets all just get rona',
					description:
						'why? for the a e s t h e t i c. its a culture, need to get involved.',
					eventDate: date.setSeconds(date.getSeconds() + 1),
					published: false,
					password: 'ronanation',
				},
			],
		},
		{
			include: [models.Message, models.Event],
		}
	);

	await models.Event.create(
		{
			title: 'yo yo yo yo ',
			description: 'i am annoyed',
			eventDate: date.setSeconds(date.getSeconds() + 1),
			published: false,
			password: 'ronanation',
			userId: 3,
			// eventCards: [{ size: 'full', sortOrder: 1 }],
		},
		{
			include: [models.EventCard],
		}
	);

	//**********************************************************************
	//						EVENT CARD SEEDING
	//**********************************************************************

	await models.EventCard.create(
		{
			// size: 'full',
			sortOrder: 1,
			eventId: 1,
			cardItems: [
				{ type: null }, //'text', text: 'foxwarren 3xxx' },
				{
					type: 'image',
					url: 'https://sorekara.s3-us-west-1.amazonaws.com/0015185617_10.jpg',
				},
				{
					type: 'image',
					url:
						'https://sorekara.s3-us-west-1.amazonaws.com/Are_You_Experienced_-_US_cover-edit.jpg',
				},
				{
					type: 'image',
					url: 'https://sorekara.s3-us-west-1.amazonaws.com/61Tioa2nMYL.jpg',
				},
			],
		},
		{
			include: [models.CardItem],
		}
	);

	// await models.EventCard.create(
	// 	{
	// 		// size: 'half',
	// 		sortOrder: 2,
	// 		eventId: 1,
	// 		cardItems: [
	// 			{ type: 'text', text: 'jimi 3x' },
	// 			{
	// 				type: 'image',
	// 				url:
	// 					'https://sorekara.s3-us-west-1.amazonaws.com/Are_You_Experienced_-_US_cover-edit.jpg',
	// 			},
	// 			{
	// 				type: 'image',
	// 				url:
	// 					'https://sorekara.s3-us-west-1.amazonaws.com/Are_You_Experienced_-_US_cover-edit.jpg',
	// 			},
	// 			{
	// 				type: 'image',
	// 				url:
	// 					'https://sorekara.s3-us-west-1.amazonaws.com/Are_You_Experienced_-_US_cover-edit.jpg',
	// 			},
	// 		],
	// 	},
	// 	{ include: [models.CardItem] }
	// );
	// await models.EventCard.create(
	// 	{
	// 		// size: 'half',
	// 		sortOrder: 3,
	// 		eventId: 1,
	// 		cardItems: [
	// 			{ type: 'text', text: 'of montreal only twice :(' },
	// 			{
	// 				type: 'image',
	// 				url: 'https://sorekara.s3-us-west-1.amazonaws.com/61Tioa2nMYL.jpg',
	// 			},
	// 			{
	// 				type: 'image',
	// 				url: 'https://sorekara.s3-us-west-1.amazonaws.com/61Tioa2nMYL.jpg',
	// 			},
	// 		],
	// 	},
	// 	{ include: [models.CardItem] }
	// );

	//**********************************************************************
	//						EVENT CARD SEEDING
	//**********************************************************************

	await models.CardItemLayout.bulkCreate([
		{
			screen: 'md',
			x: 0,
			y: 0,
			w: 12,
			h: 1,
			cardItemId: 1,
		},
		{
			screen: 'sm',
			x: 0,
			y: 0,
			w: 3,
			h: 1,
			cardItemId: 1,
		},
		{
			screen: 'md',
			x: 0,
			y: 1,
			w: 4,
			h: 4,
			cardItemId: 2,
		},
		{
			screen: 'sm',
			x: 0,
			y: 1,
			w: 3,
			h: 3,
			cardItemId: 2,
		},
		{
			screen: 'md',
			x: 4,
			y: 1,
			w: 4,
			h: 4,
			cardItemId: 3,
		},
		{
			screen: 'sm',
			x: 0,
			y: 5,
			w: 3,
			h: 3,
			cardItemId: 3,
		},
		{
			screen: 'md',
			x: 8,
			y: 1,
			w: 4,
			h: 4,
			cardItemId: 4,
		},
		{
			screen: 'sm',
			x: 0,
			y: 9,
			w: 3,
			h: 3,
			cardItemId: 4,
		},
	]);
};

export default { createUsersWithMessages, createLandingPageContent };
