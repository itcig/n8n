import { INodeProperties } from 'n8n-workflow';

export const broadcastOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
			},
			{
				name: 'Get Action',
				value: 'getAction',
			},
			{
				name: 'Get Actions',
				value: 'getActions',
			},
			{
				name: 'Get All',
				value: 'getAll',
			},
			{
				name: 'Get Links',
				value: 'getLinks',
			},
			{
				name: 'Get Link Metrics',
				value: 'getLinkMetrics',
			},
			{
				name: 'Get Metrics',
				value: 'getMetrics',
			},
		],
		default: 'get',
		description: 'The operation to perform',
	},
] as INodeProperties[];

export const broadcastFields = [
	/* -------------------------------------------------------------------------- */
	/*                                  broadcast:get                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'get',
				],
			},
		},
		description: 'The unique identifier for the broadcast',
	},
	/* -------------------------------------------------------------------------- */
	/*                             broadcast:getActions                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getActions',
				],
			},
		},
		description: 'The unique identifier for the broadcast',
	},
	/* -------------------------------------------------------------------------- */
	/*                       broadcast:getCampaignActions                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getAction',
				],
			},
		},
		description: 'The unique identifier for the broadcast',
	},
	{
		displayName: 'Action ID',
		name: 'actionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getAction',
				],
			},
		},
		description: 'The unique identifier for the action',
	},
	/* -------------------------------------------------------------------------- */
	/*                            broadcast:geLink/Metrics                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getLinks',
					'getLinkMetrics',
				],
			},
		},
		description: 'The unique identifier for the broadcast',
	},
	{
		displayName: 'Action ID',
		name: 'actionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getLinks',
					'getLinkMetrics',
				],
			},
		},
		description: 'The unique identifier for the action',
	},
	/* -------------------------------------------------------------------------- */
	/*                                  broadcast:getMetrics                      */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getMetrics',
				],
			},
		},
		description: 'The unique identifier for the broadcast',
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'options',
		default: 'days',
		displayOptions: {
			show: {
				resource: [
					'broadcast',
				],
				operation: [
					'getMetrics',
				],
			},
		},
		description: 'Specify metric period',
		options: [
			{
				name: 'Hours',
				value: 'hours',
			},
			{
				name: 'Days',
				value: 'days',
			},
			{
				name: 'Weeks',
				value: 'weeks',
			},
			{
				name: 'Months',
				value: 'months',
			},
		],
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
					'broadcast',
				],
				operation: [
					'getMetrics',
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
					'broadcast',
				],
				operation: [
					'getMetrics',
				],
				jsonParameters: [
					false,
				],
			},
		},
		options: [
			{
				displayName: 'Steps',
				name: 'steps',
				type: 'number',
				default: 0,
				description: 'Integer specifying how many steps to return. Defaults to the maximum number of timeperiods available, or 12 when using the months period. Maximum timeperiods available are 24 hours, 45 days, 12 weeks and 120 months',
				typeOptions: {
					minValue: 0,
					maxValue: 120,
				},
			},
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
