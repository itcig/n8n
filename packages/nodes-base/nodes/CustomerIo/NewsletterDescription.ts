import { INodeProperties } from 'n8n-workflow';

export const newsletterOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'newsletter',
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
			},
			{
				name: 'Get Content',
				value: 'getContent',
			},
			{
				name: 'Get Content Links',
				value: 'getContentLinks',
			},
			{
				name: 'Get Content Link Metrics',
				value: 'getContentLinkMetrics',
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

export const newsletterFields = [
	/* -------------------------------------------------------------------------- */
	/*                                 newsletter:get                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Newsletter ID',
		name: 'newsletterId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'newsletter',
				],
				operation: [
					'get',
				],
			},
		},
		description: 'The unique identifier for the newsletter',
	},
	/* -------------------------------------------------------------------------- */
	/*                              newsletter:getContent                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Newsletter ID',
		name: 'newsletterId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'newsletter',
				],
				operation: [
					'getContent',
				],
			},
		},
		description: 'The unique identifier for the newsletter',
	},
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'newsletter',
				],
				operation: [
					'getContent',
				],
			},
		},
		description: 'The unique identifier for the content variant',
	},
	/* -------------------------------------------------------------------------- */
	/*                      newsletter:getContentLinks/Metrics                    */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Newsletter ID',
		name: 'newsletterId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'newsletter',
				],
				operation: [
					'getContentLinks',
					'getContentLinkMetrics',
				],
			},
		},
		description: 'The unique identifier for the newsletter',
	},
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'newsletter',
				],
				operation: [
					'getContentLinks',
					'getContentLinkMetrics',
				],
			},
		},
		description: 'The unique identifier for the content variant',
	},
	/* -------------------------------------------------------------------------- */
	/*                                 newsletter:getMetrics                      */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Newsletter ID',
		name: 'newsletterId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: [
					'newsletter',
				],
				operation: [
					'getMetrics',
				],
			},
		},
		description: 'The unique identifier for the newsletter',
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'options',
		default: 'days',
		displayOptions: {
			show: {
				resource: [
					'newsletter',
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
					'newsletter',
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
					'newsletter',
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
