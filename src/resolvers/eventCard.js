// import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
	Mutation: {
		createEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { eventId, sortOrder }, { models }) => {
				const eventCard = await models.EventCard.create({
					eventId,
					sortOrder,
				});
				const item = await models.CardItem.create(
					{
						eventCardId: eventCard.id,
						type: null,
						cardItemLayouts: [
							{
								screen: 'md',
								x: 0,
								y: 0,
								w: 12,
								h: 1,
							},
							{
								screen: 'sm',
								x: 0,
								y: 0,
								w: 3,
								h: 1,
							},
						],
					},
					{ include: [models.CardItemLayout] }
				);
				console.log(item);
				return eventCard;
			}
		),

		deleteEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { id }, { models, sequelize }) => {
				let card = await models.EventCard.findByPk(id);
				if (!card) return 0;
				await sequelize.query(
					`
					update "eventCards"
					set "sortOrder" = "sortOrder" - 1
					where "eventId"=${card.dataValues.eventId}
					and "sortOrder" > ${card.dataValues.sortOrder}
					`
				);
				return await models.EventCard.destroy({ where: { id } });
			}
		),

		updateEventCard: combineResolvers(
			isAuthenticated,
			// isEventCardOwner,
			async (parent, { id, sortOrder }, { models, sequelize }) => {
				let eventCard = await models.EventCard.findByPk(id);
				if (!sortOrder) {
					return await eventCard.update({ size });
				}
				if (sortOrder > eventCard.dataValues.sortOrder) {
					let q = await sequelize.query(
						`
						update "eventCards"
						set "sortOrder" = "sortOrder" - 1
						where "eventId"=${eventCard.dataValues.eventId}
						and "sortOrder" <= ${sortOrder}
						and "sortOrder" > ${eventCard.dataValues.sortOrder}
						`
					);
				} else if (sortOrder < eventCard.dataValues.sortOrder) {
					await sequelize.query(
						`
						update "eventCards"
						set "sortOrder" = "sortOrder" + 1
						where "eventId"=${eventCard.dataValues.eventId}
						and "sortOrder" >= ${sortOrder}
						and "sortOrder" < ${eventCard.dataValues.sortOrder}
						`
					);
				}
				return await eventCard.update({ sortOrder });
			}
		),
	},

	EventCard: {
		cardItems: async (eventCard, args, { models }) => {
			return await models.CardItem.findAll({
				where: {
					eventCardId: eventCard.id,
				},
			});
		},
	},
};
