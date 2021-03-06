import { gql } from 'apollo-server-express';

export default gql`
	extend type Mutation {
		updateCardItemLayout(layouts: [CardItemLayoutInput!]!): [CardItemLayout!]!
	}

	input CardItemLayoutInput {
		id: ID! #might not need id
		cardItemId: ID
		screen: String
		x: Int!
		y: Int!
		w: Int!
		h: Int!
	}

	type CardItemLayout {
		id: ID
		cardItemId: ID
		screen: String!
		x: Int!
		y: Int!
		w: Int!
		h: Int!
	}
`;
