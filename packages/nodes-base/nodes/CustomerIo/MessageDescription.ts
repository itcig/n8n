import { INodeProperties } from 'n8n-workflow';

export const messageOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'message',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
			},
			{
				name: 'Get All',
				value: 'getAll',
			}
		],
		default: 'get',
		description: 'The operation to perform',
	},
] as INodeProperties[];

export const messageFields = [
	/* -------------------------------------------------------------------------- */
	/*                                   message:get                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'get',
				],
			},
		},
		description: 'The unique identifier for the message',
	},
	/* -------------------------------------------------------------------------- */
	/*                                   message:getAll                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Action ID',
		name: 'actionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'getAll',
				],
			},
		},
		description: 'The unique identifier for the action you want to filter for',
	},
	{
		displayName: 'Campaign ID',
		name: 'campaignId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'getAll',
				],
			},
		},
		description: 'The unique identifier for the campaign you want to filter for',
	},
	{
		displayName: 'Newsletter ID',
		name: 'newsletterId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'getAll',
				],
			},
		},
		description: 'The unique identifier for the newsletter you want to filter for',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'boolean',
		default: false,
		description: '',
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'getAll',
				],
				jsonParameters: [
					false,
				],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'empty',
				description: 'Specify metric type',
				options: [
					{
						name: 'Empty',
						value: 'empty',
					},
					{
						name: 'Email',
						value: 'email',
					},
					{
						name: 'Push',
						value: 'push',
					},
					{
						name: 'Slack',
						value: 'slack',
					},
					{
						name: 'twilio',
						value: 'twilio',
					},
					{
						name: 'Urban Airship',
						value: 'urbanAirship',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
			},
		],
	},
] as INodeProperties[];
